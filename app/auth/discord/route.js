
import { NextResponse } from 'next/server';
import { randomBytes } from 'node:crypto';

export const dynamic = 'force-dynamic';

export function GET() {
  const clientId = process.env.DISCORD_CLIENT_ID;
  const redirectUri = process.env.DISCORD_REDIRECT_URI;

  if (!clientId || !redirectUri) {
    return NextResponse.json(
      { error: 'Discord-Konfiguration fehlt.' },
      { status: 500 }
    );
  }

  const state = randomBytes(32).toString('hex');

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'identify guilds.members.read',
    state
  });

  const response = NextResponse.redirect(
    `https://discord.com/oauth2/authorize?${params.toString()}`
  );

  response.cookies.set('discord_oauth_state', state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 600
  });

  return response;
}
