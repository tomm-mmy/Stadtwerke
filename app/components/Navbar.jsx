import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(decodeURIComponent(userCookie.value));
    } catch (e) {
      user = null;
    }
  }

  // Discord Avatar URL generieren
  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <nav className="navbar" style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      padding: '0 2rem', 
      background: '#0f172a', 
      borderBottom: '1px solid #1e293b', 
      height: '70px',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <Link href="/" className="nav-brand" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
        <div style={{ 
          width: '38px', 
          height: '38px', 
          borderRadius: '50%', 
          overflow: 'hidden', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          border: '1px solid #334155',
          backgroundColor: '#1e293b'
        }}>
          <Image 
            src="/stadtwerke-neu.png" 
            alt="Logo" 
            width={38} 
            height={38} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span>Stadtwerke Neubrücken</span>
      </Link>
      
      <ul className="nav-links" style={{ display: 'flex', listStyle: 'none', gap: '20px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link href="/" style={{ color: '#94a3b8', textDecoration: 'none' }}>Startseite</Link></li>
        <li><Link href="/entstoerungsdienst" style={{ color: '#94a3b8', textDecoration: 'none' }}>Entstörungsdienst</Link></li>
        <li><Link href="/fuehrungsebene" style={{ color: '#94a3b8', textDecoration: 'none' }}>Führungsebene</Link></li>
        <li><Link href="/personal" style={{ color: '#94a3b8', textDecoration: 'none' }}>Personalabteilung</Link></li>
        <li><Link href="/ausbilder" style={{ color: '#94a3b8', textDecoration: 'none' }}>Ausbilder</Link></li>
        <li><Link href="/mitarbeiter" style={{ color: '#94a3b8', textDecoration: 'none' }}>Mitarbeiter</Link></li>
      </ul>

      <div>
        {user ? (
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#1e293b', padding: '6px 14px', borderRadius: '30px', border: '1px solid #334155', cursor: 'pointer' }}>
              <img src={avatarUrl} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '500' }}>{user.username}</span>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>▼</span>
            </div>
            
            {/* Dropdown-Menü */}
            <div className="dropdown-content" style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: '12px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
              overflow: 'hidden',
              minWidth: '170px',
              display: 'none',
              zIndex: 100
            }}>
              <Link href="/dashboard" style={{ display: 'block', padding: '12px 16px', color: '#cbd5e1', textDecoration: 'none', borderBottom: '1px solid #334155', fontSize: '14px' }}>📊 Dashboard</Link>
              <a href="/api/auth/logout" style={{ display: 'block', padding: '12px 16px', color: '#ef4444', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>🚪 Abmelden</a>
            </div>

            {/* Einfaches CSS für den Hover-Effekt ohne styled-jsx */}
            <style>{`
              .dropdown-wrapper:hover .dropdown-content {
                display: block !important;
              }
            `}</style>
          </div>
        ) : (
          <a href="/auth/discord" style={{
            background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: '#fff',
            padding: '8px 18px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
          }}>
            Discord Anmelden
          </a>
        )}
      </div>
    </nav>
  );
}
