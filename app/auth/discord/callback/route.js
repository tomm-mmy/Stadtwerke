import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Kein Code von Discord erhalten.' }, { status: 400 });
  }

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = 'https://stadtwerke-neubruecken.vercel.app/auth/discord/callback';
  const TARGET_GUILD_ID = '1490307263909335102'; // Dein Server

  try {
    // 1. Token anfordern
    const tokenResponse = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenResponse.json();
    if (!tokenData.access_token) {
      throw new Error('Kein Access Token von Discord erhalten.');
    }

    const accessToken = tokenData.access_token;

    // 2. User-Basisdaten abrufen (inkl. E-Mail)
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const discordUser = await userResponse.json();

    // 3. Server-Mitgliedschaft & Ränge vom Zielserver prüfen
    let memberData = null;
    let isVerified = false;

    try {
      const memberResponse = await fetch(`https://discord.com/api/users/@me/guilds/${TARGET_GUILD_ID}/member`, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (memberResponse.ok) {
        memberData = await memberResponse.json();
        isVerified = true;
      } else {
        // Fallback über Guilds-Liste
        const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        const userGuilds = await guildsResponse.json();
        isVerified = userGuilds.some(g => g.id === TARGET_GUILD_ID);
      }
    } catch (err) {
      console.error('Fehler bei der Server-Prüfung:', err);
    }

    if (!isVerified) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    // 4. Echte Profildaten & Rollen im Cookie speichern
    const userData = JSON.stringify({
      id: discordUser.id,
      username: discordUser.username,
      global_name: discordUser.global_name || discordUser.username,
      avatar: discordUser.avatar,
      email: discordUser.email || 'Nicht öffentlich',
      locale: discordUser.locale || 'de',
      mfa_enabled: discordUser.mfa_enabled ? 'Aktiviert (Sicher)' : 'Deaktiviert',
      nickname: memberData?.nick || null,
      roles: memberData?.roles || [],
      joined_at: memberData?.joined_at || null,
    });

    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    response.cookies.set('discord_user', encodeURIComponent(userData), { 
      httpOnly: false, // Erlaubt reibungslosen Zugriff im Client
      secure: true, 
      path: '/' 
    });

    return response;

  } catch (error) {
    console.error('Auth & Verify Fehler:', error.message);
    return NextResponse.json({ error: 'Authentifizierung fehlgeschlagen: ' + error.message }, { status: 500 });
  }
}
