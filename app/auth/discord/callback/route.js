
import { NextResponse } from 'next/server';
import {
  createUserSession,
  sessionCookieOptions
} from '../../../../lib/auth';

export const dynamic = 'force-dynamic';

const GUILD_ID = '1490307263909335102';

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const code = searchParams.get('code');
  const returnedState = searchParams.get('state');
  const savedState = request.cookies.get('discord_oauth_state')?.value;

  if (!code || !returnedState || !savedState || returnedState !== savedState) {
    return NextResponse.json(
      { error: 'Ungültige oder abgelaufene OAuth-Anmeldung.' },
      { status: 400 }
    );
  }

  const clientId = process.env.DISCORD_CLIENT_ID;
  const clientSecret = process.env.DISCORD_CLIENT_SECRET;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    return NextResponse.json(
      { error: 'Discord-Konfiguration unvollständig.' },
      { status: 500 }
    );
  }

  try {
    // Discord OAuth Token abrufen
    const tokenResponse = await fetch(
      'https://discord.com/api/oauth2/token',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: new URLSearchParams({
          client_id: clientId,
          client_secret: clientSecret,
          grant_type: 'authorization_code',
          code,
          redirect_uri: redirectUri
        }),
        cache: 'no-store'
      }
    );

    if (!tokenResponse.ok) {
      throw new Error('Discord-Token konnte nicht abgerufen werden.');
    }

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error('Discord hat kein Access Token geliefert.');
    }

    const headers = {
      Authorization: `Bearer ${tokenData.access_token}`
    };

    // Discord-Profil laden
    const userResponse = await fetch(
      'https://discord.com/api/users/@me',
      { headers, cache: 'no-store' }
    );

    if (!userResponse.ok) {
      throw new Error('Discord-Profil konnte nicht geladen werden.');
    }

    const discordUser = await userResponse.json();

    if (!discordUser.id) {
      throw new Error('Ungültige Discord-Benutzerdaten.');
    }

    // Mitgliedschaft und Rollen direkt beim richtigen Server prüfen
    const memberResponse = await fetch(
      `https://discord.com/api/users/@me/guilds/${GUILD_ID}/member`,
      { headers, cache: 'no-store' }
    );

    if (!memberResponse.ok) {
      return NextResponse.redirect(
        new URL('/unauthorized', request.url)
      );
    }

    const memberData = await memberResponse.json();

    if (!Array.isArray(memberData.roles)) {
      throw new Error('Discord-Rollen konnten nicht verifiziert werden.');
    }

    const userData = {
      id: discordUser.id,
      username: discordUser.username,
      global_name: discordUser.global_name || discordUser.username,
      avatar: discordUser.avatar,
      nickname: memberData.nick || null,
      roles: memberData.roles,
      joined_at: memberData.joined_at || null
    };

    // Neue serverseitige Sitzung erstellen
    const sessionToken = await createUserSession(userData);

    const response = NextResponse.redirect(
      new URL('/dashboard', request.url)
    );

    response.cookies.set('discord_oauth_state', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 0
    });

    response.cookies.set(
      'discord_user',
      sessionToken,
      sessionCookieOptions()
    );

    return response;

  } catch (error) {
    console.error('Discord-Anmeldung fehlgeschlagen:', error.message);

    return NextResponse.json(
      { error: 'Die Anmeldung ist fehlgeschlagen.' },
      { status: 500 }
    );
  }
}
