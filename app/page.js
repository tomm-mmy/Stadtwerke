import { cookies } from 'next/headers';
import NotfallBanner from './components/NotfallBanner';
import NotfallLockout from './components/NotfallLockout';
import { canAccessFuehrung } from './mitarbeiter/utils/checkPermissions';

async function getSystemState() {
  try {
    return global.isMaintenanceMode || false;
  } catch (err) {
    return false;
  }
}

export default async function HomePage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {}
  }

  const isMaintenance = await getSystemState();
  const isFuehrung = user ? canAccessFuehrung(user) : false;

  // 1. NICHT EINGELOGGT + NOTBETRIEB -> sofort Roter Warnbildschirm
  if (isMaintenance && !user) {
    return <NotfallLockout />;
  }

  return (
    <main className="page-container">
      {/* 2. NOTBETRIEB WARNBOX OBEN */}
      {isMaintenance && <NotfallBanner isFuehrung={isFuehrung} />}

      {/* Hero Section ohne das alte Badge */}
      <div 
        className="hero-section"
        style={{
          opacity: (isMaintenance && !isFuehrung) ? 0.4 : 1,
          pointerEvents: (isMaintenance && !isFuehrung) ? 'none' : 'auto'
        }}
      >
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          ⚡ 24/7 Infrastruktur- & Versorgungsnetz Neubrücken
        </div>
        
        <h1 style={{ fontSize: '2.5rem', margin: '1rem 0' }}>Stadtwerke Neubrücken</h1>
        
        <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
          Wir sichern die zuverlässige Versorgung mit Strom, Wasser, Gas und Glasfaser im gesamten Stadtgebiet. Rund um die Uhr für Neubrücken im Einsatz.
        </p>

        {/* Statistik Cards unten */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>24/7</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Entstörungsdienst</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>&lt; 15 Min</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Durchschn. Ausrückzeit</div>
          </div>
          <div>
            <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#38bdf8' }}>100%</div>
            <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Versorgungssicherheit</div>
          </div>
        </div>
      </div>
    </main>
  );
}
