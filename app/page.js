import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  const isLoggedIn = !!userCookie;

  return (
    <main className="page-container">
      {/* Hero-Sektion mit integriertem Banner */}
      <div className="hero-section">
        <div className="banner-container">
          <Image 
            src="/stadtwerkebanner.png" 
            alt="Stadtwerke Neubrücken Banner" 
            width={1000} 
            height={300} 
            priority
            style={{ width: '100%', height: 'auto', maxHeight: '280px', objectFit: 'cover', borderRadius: '16px' }}
          />
        </div>
        
        <div className="hero-content">
          <h1>Stadtwerke Neubrücken</h1>
          <p>
            Willkommen auf dem offiziellen Portal der Stadtwerke Neubrücken. Hier koordinieren wir die städtische Infrastruktur, den Entstörungsdienst und unsere internen Fachbereiche auf höchstem Niveau.
          </p>
          
          {isLoggedIn && (
            <div className="welcome-badge">
              ✓ Erfolgreich als Mitarbeiter / Verifiziert angemeldet
            </div>
          )}
        </div>
      </div>

      <div className="section-header">
        <h2>Unternehmensbereiche</h2>
        <p>Wählen Sie einen Bereich, um fortzufahren</p>
      </div>
      
      <div className="departments-grid">
        <Link href="/entstoerungsdienst" className="dept-card">
          <div className="card-icon">⚡</div>
          <div className="card-body">
            <h3>Entstörungsdienst</h3>
            <p>Bereitschaftsdienste, Störungsmeldungen und akute Notsituationen im Netzgebiet.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/fuehrungsebene" className="dept-card">
          <div className="card-icon">🏢</div>
          <div className="card-body">
            <h3>Führungsebene</h3>
            <p>Geschäftsführung, administrative Leitung und strategische Koordinierung.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/personal" className="dept-card">
          <div className="card-icon">👥</div>
          <div className="card-body">
            <h3>Personalabteilung</h3>
            <p>HR-Management, Richtlinien, Bewerbungen und interne Mitarbeiterbetreuung.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/ausbilder" className="dept-card">
          <div className="card-icon">🎓</div>
          <div className="card-body">
            <h3>Ausbilder</h3>
            <p>Ausbildungskoordination, Einarbeitung und Schulungsunterlagen für neue Azubis.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>

        <Link href="/mitarbeiter" className="dept-card">
          <div className="card-icon">🛡️</div>
          <div className="card-body">
            <h3>Mitarbeiter</h3>
            <p>Interne Übersichten, Dienstpläne und exklusive Bereiche für das Kollegium.</p>
          </div>
          <span className="dept-link">Bereich ansehen →</span>
        </Link>
      </div>
    </main>
  );
}
