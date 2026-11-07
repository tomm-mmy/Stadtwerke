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
      zIndex: 1000,
      fontFamily: 'sans-serif'
    }}>
      {/* Logo & Markenname */}
      <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none', color: '#fff', fontWeight: 'bold' }}>
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
      
      {/* Oben nur noch Startseite */}
      <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link href="/" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Startseite</Link></li>
      </ul>

      {/* Rechts: Login oder Profil mit Kategorien-Dropdown */}
      <div>
        {user ? (
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#1e293b', 
              padding: '6px 14px', 
              borderRadius: '30px', 
              border: '1px solid #334155', 
              cursor: 'pointer' 
            }}>
              <img src={avatarUrl} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%' }} />
              <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '500' }}>{user.username}</span>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>▼</span>
            </div>
            
            {/* Dropdown-Menü mit Kategorien */}
            <div className="dropdown-content" style={{
              position: 'absolute',
              right: 0,
              top: 'calc(100% + 8px)',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '12px',
              boxShadow: '0 15px 35px rgba(0,0,0,0.6)',
              overflow: 'hidden',
              minWidth: '220px',
              display: 'none',
              zIndex: 100
            }}>
              <div style={{ padding: '10px 16px 6px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>
                Bereiche & Navigation
              </div>
              <Link href="/entstoerungsdienst" style={{ display: 'block', padding: '10px 16px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>⚡ Entstörungsdienst</Link>
              <Link href="/fuehrungsebene" style={{ display: 'block', padding: '10px 16px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>🏢 Führungsebene</Link>
              <Link href="/personal" style={{ display: 'block', padding: '10px 16px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>👥 Personalabteilung</Link>
              <Link href="/ausbilder" style={{ display: 'block', padding: '10px 16px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>🎓 Ausbilder</Link>
              <Link href="/mitarbeiter" style={{ display: 'block', padding: '10px 16px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', borderBottom: '1px solid #1e293b' }}>🛡️ Mitarbeiter</Link>
              
              <div style={{ padding: '10px 16px 6px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>
                Account
              </div>
              <Link href="/dashboard" style={{ display: 'block', padding: '10px 16px', color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>📊 Dashboard</Link>
              <a href="/api/auth/logout" style={{ display: 'block', padding: '10px 16px', color: '#ef4444', textDecoration: 'none', fontSize: '14px', fontWeight: '500', background: 'rgba(239, 68, 68, 0.05)' }}>🚪 Abmelden</a>
            </div>

            {/* Reines CSS-Hover für das Dropdown (ohne styled-jsx Build-Fehler) */}
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
