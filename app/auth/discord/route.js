import { NextResponse } from 'next/server';

export async function GET(request) {
  const CLIENT_ID = process.env.DISCORD_CLIENT_ID;
  const REDIRECT_URI = 'https://stadtwerke-neubruecken.vercel.app/auth/discord/callback';
  
  // Wichtig: 'guilds.members.read' erlaubt das Auslesen von Server-Rollen und Nicknames
  const scope = encodeURIComponent('identify email guilds guilds.members.read');
  
  const discordAuthUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=${scope}`;

  return NextResponse.redirect(discordAuthUrl);
}
