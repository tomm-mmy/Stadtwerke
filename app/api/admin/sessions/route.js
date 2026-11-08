import { NextResponse } from 'next/server';

// Globaler Speicher für aktive Sessions und blockierte User-IDs
global.activeSessions = global.activeSessions || [
  { id: '881206091009122406', username: 'Tommy', role: 'Führungsebene', status: 'Online', blocked: false }
];
global.blockedUsers = global.blockedUsers || [];

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    sessions: global.activeSessions,
    blocked: global.blockedUsers 
  });
}

export async function POST(request) {
  try {
    const { action, userId, currentUserId } = await request.json();

    // Schutz vor Selbstaussperrung
    if (userId === currentUserId && action === 'block') {
      return NextResponse.json({ success: false, error: 'Du kannst dich nicht selber sperren oder abmelden!' }, { status: 400 });
    }

    if (action === 'block') {
      if (!global.blockedUsers.includes(userId)) {
        global.blockedUsers.push(userId);
      }
      global.activeSessions = global.activeSessions.filter(s => s.id !== userId);
    } else if (action === 'unblock') {
      global.blockedUsers = global.blockedUsers.filter(id => id !== userId);
    } else if (action === 'kick') {
      global.activeSessions = global.activeSessions.filter(s => s.id !== userId);
    }

    return NextResponse.json({ success: true, sessions: global.activeSessions, blocked: global.blockedUsers });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
