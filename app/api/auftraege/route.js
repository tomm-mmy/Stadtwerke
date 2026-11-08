import { NextResponse } from 'next/server';

// Globaler Speicher für echte Live-Aufträge
global.globaleAuftraege = global.globaleAuftraege || [
  { id: 1, titel: 'Wartung Hauptwasserleitung Sektor B', details: 'Druckprüfung und Ventile kontrollieren.', erstelltVon: 'Tommy', zeit: 'Heute, 12:00 Uhr' }
];

export async function GET() {
  return NextResponse.json({ success: true, auftraege: global.globaleAuftraege });
}

export async function POST(request) {
  try {
    const { titel, details, erstelltVon, action, id } = await request.json();

    // Aktion: Auftrag löschen (falls die Führung einen beenden will)
    if (action === 'delete') {
      global.globaleAuftraege = global.globaleAuftraege.filter(a => a.id !== id);
      return NextResponse.json({ success: true, auftraege: global.globaleAuftraege });
    }

    // Aktion: Neuen Auftrag erstellen
    const neuerAuftrag = {
      id: Date.now(),
      titel,
      details,
      erstelltVon: erstelltVon || 'Führungsebene',
      zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
    };
    
    global.globaleAuftraege.unshift(neuerAuftrag);
    return NextResponse.json({ success: true, auftrag: neuerAuftrag, auftraege: global.globaleAuftraege });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
