import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {
      user = null;
    }
  }

  return (
    <nav className="navbar">
      <Link href="/" className="nav-brand">
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
            src="/stadtwerke-neu.png" 
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
        {user ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: '#22c55e', fontSize: '14px', fontWeight: '500' }}>
              ● {user.username}
            </span>
            <a href="/api/auth/logout" className="btn-nav-login" style={{ backgroundColor: '#ef4444' }}>
              Abmelden
            </a>
          </div>
        ) : (
          <a href="/auth/discord" className="btn-nav-login">
            Discord Anmelden
          </a>
        )}
      </div>
    </nav>
  );
}
