import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN; // Muss in deiner .env hinterlegt sein
    const GUILD_ID = '1490307263909335102';

    if (!BOT_TOKEN) {
      // Fallback auf aktive Sessions, wenn kein Bot-Token da ist, aber mit echtem Server-Bezug
      return NextResponse.json({ success: true, members: global.activeSessions || [] });
    }

    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`
      }
    });

    if (!response.ok) {
      throw new Error('Fehler beim Abrufen der Discord-Server-Mitglieder.');
    }

    const guildMembers = await response.json();

    // Daten sauber aufbereiten
    const formattedMembers = guildMembers.map(m => ({
      id: m.user.id,
      username: m.user.global_name || m.user.username,
      roles: m.roles,
      joinedAt: m.joined_at
    }));

    return NextResponse.json({ success: true, members: formattedMembers });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
