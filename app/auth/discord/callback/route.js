import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Kein Code von Discord erhalten.' }, { status: 400 });
  }

  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const CLIENT_SECRET = process.env.DISCORD_CLIENT_SECRET;
  const REDIRECT_URI = 'https://stadtwerke-neubruecken.vercel.app/auth/discord/callback';

  try {
    // Token bei Discord anfordern
    const tokenResponse = await axios.post('https://discord.com/api/oauth2/token', new URLSearchParams({
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: REDIRECT_URI,
    }), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    });

    const accessToken = tokenResponse.data.access_token;

    // User-Daten von Discord abrufen
    const userResponse = await axios.get('https://discord.com/api/users/@me', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    const discordUser = userResponse.data;


    console.log('Erfolgreich eingeloggt:', discordUser.username);


    return NextResponse.redirect(new URL('/dashboard', request.url));

  } catch (error) {
    console.error('Auth Fehler:', error.response?.data || error.message);
    return NextResponse.json({ error: 'Authentifizierung fehlgeschlagen.' }, { status: 500 });
  }
}
