import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
        ⚡ Stadtwerke Neubrücken
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
