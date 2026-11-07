import Link from 'next/link';
import Image from 'next/image';
import { cookies } from 'next/headers';

export default async function Navbar() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      const rawValue = userCookie.value;
      const decodedValue = rawValue.includes('%') ? decodeURIComponent(rawValue) : rawValue;
      user = JSON.parse(decodedValue);
    } catch (e) {
      user = null;
    }
  }

  const avatarUrl = user?.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <nav className="navbar">
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
            src="/stadtwerkeprofdilbild.webp" 
            alt="Logo" 
            width={38} 
            height={38} 
            style={{ objectFit: 'cover' }}
          />
        </div>
        <span>Stadtwerke Neubrücken</span>
      </Link>
      
      <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', margin: 0, padding: 0, alignItems: 'center' }}>
        <li><Link href="/" style={{ color: '#f8fafc', textDecoration: 'none', fontWeight: '500', fontSize: '15px' }}>Startseite</Link></li>
      </ul>

      <div>
        {user ? (
          <div className="dropdown-wrapper" style={{ position: 'relative', display: 'inline-block', paddingBottom: '10px', marginBottom: '-10px' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px', 
              background: '#1e293b', 
              padding: '6px 16px', 
              borderRadius: '30px', 
              border: '1px solid #334155', 
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
            }}>
              <img src={avatarUrl} alt="Avatar" style={{ width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #38bdf8' }} />
              <span style={{ color: '#f8fafc', fontSize: '14px', fontWeight: '600' }}>{user.username}</span>
              <span style={{ fontSize: '10px', color: '#94a3b8' }}>▼</span>
            </div>
            
            <div className="dropdown-content" style={{
              position: 'absolute',
              right: 0,
              top: '100% - 2px',
              background: '#0f172a',
              border: '1px solid #334155',
              borderRadius: '16px',
              boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
              overflow: 'hidden',
              minWidth: '240px',
              display: 'none',
              zIndex: 100
            }}>
              <div style={{ padding: '16px 18px 10px 18px', borderBottom: '1px solid #1e293b', background: 'rgba(30, 41, 59, 0.4)' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8' }}>Angemeldet als</span>
                <span style={{ display: 'block', fontSize: '14px', color: '#fff', fontWeight: '700', marginTop: '2px' }}>{user.global_name || user.username}</span>
              </div>

              <div style={{ padding: '12px 18px 6px 18px', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>
                Unternehmensbereiche
              </div>
              <Link href="/entstoerungsdienst" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>⚡ Entstörungsdienst</Link>
              <Link href="/fuehrungsebene" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>🏢 Führungsebene</Link>
              <Link href="/personal" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>👥 Personalabteilung</Link>
              <Link href="/ausbilder" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px' }}>🎓 Ausbilder</Link>
              <Link href="/mitarbeiter" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', borderBottom: '1px solid #1e293b' }}>🛡️ Mitarbeiter</Link>
              
              <div style={{ padding: '12px 18px 6px 18px', fontSize: '11px', textTransform: 'uppercase', color: '#64748b', fontWeight: '700', letterSpacing: '0.5px' }}>
                Account-Verwaltung
              </div>
              <Link href="/dashboard" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 18px', color: '#38bdf8', textDecoration: 'none', fontSize: '14px', fontWeight: '600' }}>📊 Mitarbeiter-Dashboard</Link>
              <a href="/api/auth/logout" style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px 18px', color: '#ef4444', textDecoration: 'none', fontSize: '14px', fontWeight: '600', background: 'rgba(239, 68, 68, 0.08)', borderTop: '1px solid #1e293b' }}>🚪 Abmelden</a>
            </div>

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
            padding: '10px 22px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '14px',
            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)',
            transition: 'transform 0.2s'
          }}>
            Discord Anmelden
          </a>
        )}
      </div>
    </nav>
  );
}
