import { NextResponse } from 'next/server';

export async function GET(request) {
  // Leite zur Startseite weiter und lösche dabei den discord_user Cookie
  const response = NextResponse.redirect(new URL('/', request.url));
  
  response.cookies.set('discord_user', '', {
    maxAge: 0,
    path: '/',
  });

  return response;
}
