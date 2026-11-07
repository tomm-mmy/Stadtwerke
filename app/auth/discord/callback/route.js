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
  const GUILD_ID = process.env.DISCORD_GUILD_ID;

  try {
    // 1. Token bei Discord anfordern
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
      throw new Error('Kein Access Token erhalten.');
    }

    const accessToken = tokenData.access_token;

    // 2. User-Daten von Discord abrufen (inkl. E-Mail)
    const userResponse = await fetch('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const discordUser = await userResponse.json();

    // 3. VERIFY-SYSTEM: Prüfen, ob der User auf dem Server ist
    let isVerified = false;
    if (GUILD_ID) {
      const guildsResponse = await fetch('https://discord.com/api/users/@me/guilds', {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const userGuilds = await guildsResponse.json();
      
      isVerified = userGuilds.some(guild => guild.id === GUILD_ID);
    } else {
      isVerified = true;
    }

    if (!isVerified) {
      return NextResponse.redirect(new URL('/unauthorized', request.url));
    }

    console.log(`[VERIFY] User ${discordUser.username} erfolgreich verifiziert & eingeloggt!`);

    // 4. Erweiterte Benutzerdaten (inkl. E-Mail, Global Name, Locale, MFA) codieren und als Cookie setzen
    const userData = JSON.stringify({
      id: discordUser.id,
      username: discordUser.username,
      global_name: discordUser.global_name || discordUser.username,
      avatar: discordUser.avatar,
      email: discordUser.email || 'Keine E-Mail von Discord freigegeben',
      locale: discordUser.locale || 'de',
      mfa_enabled: discordUser.mfa_enabled ? 'Aktiviert' : 'Deaktiviert'
    });

    const response = NextResponse.redirect(new URL('/dashboard', request.url));
    
    response.cookies.set('discord_user', encodeURIComponent(userData), { 
      httpOnly: true, 
      secure: true, 
      path: '/' 
    });

    return response;

  } catch (error) {
    console.error('Auth & Verify Fehler:', error.message);
    return NextResponse.json({ error: 'Authentifizierung fehlgeschlagen.' }, { status: 500 });
  }
}
