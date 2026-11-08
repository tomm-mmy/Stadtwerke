import { NextResponse } from 'next/server';

// Globaler Speicher für alle Berichte
global.allReports = global.allReports || [
  { id: 1, ort: 'Hauptstraße 12', details: 'Rohrbruch erfolgreich abgedichtet und Ventil getauscht.', verfasser: 'Max_Müller', zeit: 'Heute, 14:30 Uhr' }
];

export async function GET() {
  return NextResponse.json({ success: true, reports: global.allReports });
}

export async function POST(request) {
  try {
    const { ort, details, verfasser } = await request.json();
    const neuerBericht = {
      id: Date.now(),
      ort,
      details,
      verfasser: verfasser || 'Mitarbeiter',
      zeit: new Date().toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' }) + ' Uhr'
    };

    global.allReports.unshift(neuerBericht);
    return NextResponse.json({ success: true, report: neuerBericht, reports: global.allReports });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
