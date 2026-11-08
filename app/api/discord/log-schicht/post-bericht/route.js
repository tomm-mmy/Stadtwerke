import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { channelId, username, ort, details } = await request.json();
    const botToken = process.env.DISCORD_BOT_TOKEN;

    const response = await fetch(`https://discord.com/api/v10/channels/${channelId}/messages`, {
      method: 'POST',
      headers: {
        'Authorization': `Bot ${botToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        content: `🚨 **Neuer Einsatzbericht eingereicht**\n• **Erfasst von:** ${username}\n• **Einsatzort:** ${ort}\n• **Beschreibung:** ${details}\n• **Zeit:** <t:${Math.floor(Date.now() / 1000)}:F>`
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      return NextResponse.json({ success: false, error: errorData }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
