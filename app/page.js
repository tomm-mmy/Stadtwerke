import { cookies } from 'next/headers';
import NotfallBanner from './components/NotfallBanner';
import NotfallLockout from './components/NotfallLockout';
import { canAccessFuehrung } from './mitarbeiter/utils/checkPermissions';
import { Zap, Droplet, Flame, Wifi, HelpCircle } from 'lucide-react';

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

  // 1. Nicht eingeloggt + Notbetrieb -> Sofort roter Lockout-Bildschirm
  if (isMaintenance && !user) {
    return <NotfallLockout />;
  }

  // 2. Eingeloggt als normaler User (keine Führung) während Notbetrieb -> Komplett gesperrt
  const isLockedForUser = isMaintenance && user && !isFuehrung;

  return (
    <main className="page-container">
      {/* Notfall-Banner oben für alle eingeloggten User im Notbetrieb */}
      {isMaintenance && <NotfallBanner isFuehrung={isFuehrung} />}

      <div style={{
        opacity: isLockedForUser ? 0.4 : 1,
        pointerEvents: isLockedForUser ? 'none' : 'auto',
        userSelect: isLockedForUser ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}>
        {/* Hero Section */}
        <div className="hero-section">
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

        {/* Fachbereiche / Cards Sektion */}
        <div className="section-container">
          <div className="section-header">
            <h2>Unsere Fachbereiche</h2>
            <p>Zentrale Infrastruktur und operative Abteilungen im Stadtgebiet.</p>
          </div>

          <div className="departments-grid">
            <div className="dept-card">
              <div>
                <div className="dept-card-header">
                  <div className="card-icon cyan"><Zap size={22} /></div>
                  <span className="badge-alert">Aktiv</span>
                </div>
                <h3>Stromnetz</h3>
                <p>Hoch- und Mittelspannungsversorgung, Umspannwerke und Netzwertung.</p>
              </div>
              <span className="dept-link">Netzstatus prüfen &rarr;</span>
            </div>

            <div className="dept-card">
              <div>
                <div className="dept-card-header">
                  <div className="card-icon blue"><Droplet size={22} /></div>
                  <span className="badge-alert">Stabil</span>
                </div>
                <h3>Wasserversorgung</h3>
                <p>Frischwasser, Pumpwerke, Druckprüfung und Rohrnetzüberwachung.</p>
              </div>
              <span className="dept-link">Messwerte ansehen &rarr;</span>
            </div>

            <div className="dept-card">
              <div>
                <div className="dept-card-header">
                  <div className="card-icon purple"><Flame size={22} /></div>
                  <span className="badge-alert">Reguliert</span>
                </div>
                <h3>Gasversorgung</h3>
                <p>Gasnetz-Sicherheit, Hausanschlüsse und Druckregelanlagen.</p>
              </div>
              <span className="dept-link">Sicherheitsrichtlinien &rarr;</span>
            </div>

            <div className="dept-card">
              <div>
                <div className="dept-card-header">
                  <div className="card-icon green"><Wifi size={22} /></div>
                  <span className="badge-alert">Highspeed</span>
                </div>
                <h3>Glasfaser / IT</h3>
                <p>Breitbandausbau, Backbone-Anbindung und Rechenzentrum.</p>
              </div>
              <span className="dept-link">Ausbaustatus &rarr;</span>
            </div>
          </div>
        </div>

        {/* QA / FAQ Sektion */}
        <div className="section-container">
          <div className="section-header">
            <h2>Häufig gestellte Fragen (FAQ)</h2>
            <p>Wichtige Informationen rund um den Betrieb und Notfallmaßnahmen.</p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon"><HelpCircle size={20} /></div>
              <div className="faq-body">
                <h3>Was tun bei einem Rohrbruch oder Stromausfall?</h3>
                <p>Sofort den 24/7-Entstörungsdienst alarmieren und die entsprechende Abteilung über das Mitarbeiterportal oder die Leitstelle informieren.</p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><HelpCircle size={20} /></div>
              <div className="faq-body">
                <h3>Wie erhalte ich Zugriff auf das Mitarbeiterportal?</h3>
                <p>Der Zugriff erfordert eine verifizierte Discord-Authentifizierung und die Zuweisung der entsprechenden Team-Berechtigung durch die Führungsebene.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
