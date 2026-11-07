import Link from 'next/link';
import Image from 'next/image'; // Next.js optimiert Bilder automatisch

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        {/* Hier holen wir das Logo aus dem public-Ordner für die Navbar */}
        <div style={{ 
          width: '32px', 
          height: '32px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid var(--border)',
          backgroundColor: '#1e293b'
        }}>
          <Image 
            src="/logo.png" 
            alt="Logo" 
            width={32} 
            height={32} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span>Stadtwerke Neubrücken</span>
      </Link>
      
      <ul className="nav-links">
        <li><Link href="/">Startseite</Link></li>
        <li><Link href="/entstoerungsdienst">Entstörungsdienst</Link></li>
        <li><Link href="/fuehrungsebene">Führungsebene</Link></li>
        <li><Link href="/personal">Personalabteilung</Link></li>
        <li><Link href="/ausbilder">Ausbilder</Link></li>
        <li><Link href="/mitarbeiter">Mitarbeiter</Link></li>
      </ul>

      <div>
        <a href="/auth/discord" className="btn-nav-login">
          Discord Anmelden
        </a>
      </div>
    </nav>
  );
}
