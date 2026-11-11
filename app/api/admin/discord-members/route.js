import { NextResponse } from 'next/server';

export async function GET() {
  const BOT_TOKEN = process.env.DISCORD_BOT_TOKEN;
  const GUILD_ID = '1490307263909335102';

  if (!BOT_TOKEN) {
    return NextResponse.json({ 
      success: false, 
      error: 'DISCORD_BOT_TOKEN ist nicht in den Vercel Environment Variables hinterlegt!' 
    }, { status: 400 });
  }

  try {
    const response = await fetch(`https://discord.com/api/v10/guilds/${GUILD_ID}/members?limit=1000`, {
      headers: {
        Authorization: `Bot ${BOT_TOKEN}`
      }
    });

    if (!response.ok) {
      const errText = await response.text();
      return NextResponse.json({ 
        success: false, 
        error: `Discord API Fehler (${response.status}): ${errText}. (Fehlt evtl. der Server Members Intent im Bot-Portal?)` 
      }, { status: response.status });
    }

    const guildMembers = await response.json();

    const formattedMembers = guildMembers.map(m => ({
      id: m.user.id,
      username: m.user.global_name || m.user.username,
      roles: m.roles,
      joinedAt: m.joined_at
    }));

    return NextResponse.json({ success: true, members: formattedMembers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
