import { NextResponse } from 'next/server';


let globaleAuftraege = [
  { id: 1, titel: 'Wartung Hauptwasserleitung Sektor B', details: 'Druckprüfung und Ventile kontrollieren.', erstelltVon: 'Tommy', zeit: 'Heute, 12:00 Uhr' }
];

export async function GET() {
  return NextResponse.json({ success: true, auftraege: globaleAuftraege });
}

export async function POST(request) {
  try {
    const { titel, details, erstelltVon } = await request.json();
    const neuerAuftrag = {
      id: Date.now(),
      titel,
      details,
      erstelltVon: erstelltVon || 'Führungsebene',
      zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
    };
    
    globaleAuftraege.unshift(neuerAuftrag);
    return NextResponse.json({ success: true, auftrag: neuerAuftrag });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
