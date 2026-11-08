import { NextResponse } from 'next/server';


global.isMaintenanceMode = global.isMaintenanceMode || false;

export async function GET() {
  return NextResponse.json({ 
    success: true, 
    maintenance: global.isMaintenanceMode 
  });
}

export async function POST(request) {
  try {
    const { maintenance } = await request.json();
    global.isMaintenanceMode = !!maintenance;
    
    return NextResponse.json({ 
      success: true, 
      maintenance: global.isMaintenanceMode,
      message: global.isMaintenanceMode ? 'Plattform in Notbetrieb versetzt!' : 'Normalbetrieb wiederhergestellt.'
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
