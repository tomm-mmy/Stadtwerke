import { NextResponse } from 'next/server';

export function GET() {
  const CLIENT_ID = process.env.1551313329140793425;
  const REDIRECT_URI = 'https://stadtwerke-neubruecken.vercel.app/auth/discord/callback';
  
  const discordLoginUrl = `https://discord.com/api/oauth2/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&response_type=code&scope=identify%20guilds`;
  
  return NextResponse.redirect(discordLoginUrl);
}
