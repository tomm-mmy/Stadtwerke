import Link from 'next/link';

export default function Home() {
  return (
    <main className="page-container">
      <div className="hero-section">
        <h1>Stadtwerke Neubrücken</h1>
        <p>
          Willkommen auf dem offiziellen Portal der Stadtwerke Neubrücken. Hier koordinieren wir die städtische Infrastruktur, den Entstörungsdienst und unsere internen Fachbereiche.
        </p>
        <a href="/auth/discord" className="btn-nav-login" style={{ padding: '0.75rem 1.75rem', fontSize: '1rem', display: 'inline-block' }}>
          Mit Discord Verifizieren & Einloggen
        </a>
      </div>

      <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: '700' }}>Unternehmensbereiche</h2>
      
      <div className="departments-grid">
        <Link href="/entstoerungsdienst" className="dept-card">
          <div>
            <h3>⚡ Entstörungsdienst</h3>
            <p>Bereitschaftsdienste, Störungsmeldungen und akute Notsituationen im Netzgebiet.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/fuehrungsebene" className="dept-card">
          <div>
            <h3>👔 Führungsebene</h3>
            <p>Geschäftsführung, administrative Leitung und strategische Koordinierung.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/personal" className="dept-card">
          <div>
            <h3>📋 Personalabteilung</h3>
            <p>HR-Management, Richtlinien, Bewerbungen und interne Mitarbeiterbetreuung.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/ausbilder" className="dept-card">
          <div>
            <h3>🎓 Ausbilder</h3>
            <p>Ausbildungskoordination, Einarbeitung und Schulungsunterlagen für neue Azubis.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/mitarbeiter" className="dept-card">
          <div>
            <h3>👥 Mitarbeiter</h3>
            <p>Interne Übersichten, Dienstpläne und exklusive Bereiche für das Kollegium.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>
      </div>
    </main>
  );
}
