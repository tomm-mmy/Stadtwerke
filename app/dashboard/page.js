import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function DashboardPage() {
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

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#070a12', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ background: 'linear-gradient(145deg, #0e1526, #111c33)', border: '1px solid #1e293b', padding: '45px 35px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.7)', maxWidth: '420px', width: '100%' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🛡️</div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.6rem', fontWeight: '700', color: '#f8fafc' }}>Zugriff verweigert</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem', lineHeight: '1.5' }}>
            Für diesen internen Bereich ist eine authentifizierte Discord-Sitzung erforderlich.
          </p>
          <a href="/auth/discord" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '14px 28px', borderRadius: '14px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)', width: '100%', boxSizing: 'border-box' }}>
            <span>Mit Discord einloggen</span>
          </a>
        </div>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div style={{ minHeight: '100vh', background: '#070a12', color: '#f8fafc', padding: '60px 20px', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <div style={{ maxWidth: '960px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '24px', flexWrap: 'wrap', gap: '15px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(56, 189, 248, 0.1)', color: '#38bdf8', padding: '4px 12px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', letterSpacing: '0.5px', marginBottom: '8px', border: '1px solid rgba(56, 189, 248, 0.2)' }}>
              STADTWERKE NEUBRÜCKEN • INTERN
            </div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Portal
            </h1>
          </div>
          <Link href="/" style={{ color: '#cbd5e1', textDecoration: 'none', fontSize: '14px', background: '#111c33', padding: '10px 20px', borderRadius: '12px', border: '1px solid #1e293b', fontWeight: '500', display: 'flex', alignItems: 'center', gap: '6px' }}>
            ← Zur Startseite
          </Link>
        </div>

        {/* Main Dashboard Card */}
        <div style={{ background: '#0e1526', border: '1px solid #1e293b', borderRadius: '28px', padding: '45px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
          
          {/* Profile Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px', background: 'linear-gradient(135deg, #111c33, #16223b)', padding: '30px', borderRadius: '20px', border: '1px solid #22304a', flexWrap: 'wrap' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '100px', height: '100px', borderRadius: '50%', border: '3px solid #38bdf8', boxShadow: '0 0 25px rgba(56, 189, 248, 0.3)', objectFit: 'cover' }} />
            <div style={{ flex: 1, minWidth: '200px' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '4px', color: '#fff', fontWeight: '700' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 14px 0', fontFamily: 'monospace' }}>@{user.username}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <span style={{ fontSize: '10px' }}>●</span> Verifiziert & Eingeloggt
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.15rem', marginBottom: '12px', color: '#e2e8f0', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
            🛡️ Account-Sicherheit & Sensible Daten
          </h3>
          <p style={{ color: '#64748b', fontSize: '13.5px', marginBottom: '30px', lineHeight: '1.5' }}>
            Sensible Discord-Daten sind zum Schutz vor unbefugten Einblicken geschützt. Klicke auf die jeweilige Box, um die Informationen aufzudecken.
          </p>

          {/* Secure Fields (Details / Summary Reveal) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Email Box */}
            <details style={{ background: '#111c33', borderRadius: '16px', border: '1px solid #22304a', overflow: 'hidden', cursor: 'pointer' }}>
              <summary style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none', outline: 'none' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700', letterSpacing: '0.8px' }}>DISCORD E-MAIL-ADRESSE</span>
                  <span style={{ fontSize: '15px', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {user.email || 'Keine E-Mail hinterlegt'}
                  </span>
                </div>
                <span style={{ fontSize: '12px', background: '#090d16', padding: '6px 14px', borderRadius: '8px', color: '#94a3b8', border: '1px solid #1e293b', fontWeight: '500' }}>
                  🔓 Einblenden
                </span>
              </summary>
            </details>

            {/* Discord ID Box */}
            <details style={{ background: '#111c33', borderRadius: '16px', border: '1px solid #22304a', overflow: 'hidden', cursor: 'pointer' }}>
              <summary style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none', outline: 'none' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '4px', fontWeight: '700', letterSpacing: '0.8px' }}>DISCORD USER ID</span>
                  <span style={{ fontSize: '15px', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {user.id}
                  </span>
                </div>
                <span style={{ fontSize: '12px', background: '#090d16', padding: '6px 14px', borderRadius: '8px', color: '#94a3b8', border: '1px solid #1e293b', fontWeight: '500' }}>
                  🔓 Einblenden
                </span>
              </summary>
            </details>

            {/* Grid for General Info */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginTop: '10px' }}>
              <div style={{ background: '#111c33', padding: '20px 22px', borderRadius: '16px', border: '1px solid #22304a' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.8px' }}>SPRACHE / LOCALE</span>
                <span style={{ fontSize: '15px', color: '#f8fafc', textTransform: 'uppercase', fontWeight: '600' }}>{user.locale || 'DE'}</span>
              </div>

              <div style={{ background: '#111c33', padding: '20px 22px', borderRadius: '16px', border: '1px solid #22304a' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.8px' }}>2-FAKTOR-SCHUTZ (MFA)</span>
                <span style={{ fontSize: '15px', color: user.mfa_enabled ? '#22c55e' : '#f59e0b', fontWeight: '600' }}>
                  {user.mfa_enabled ? 'Aktiviert' : 'Nicht aktiviert'}
                </span>
              </div>

              <div style={{ background: '#111c33', padding: '20px 22px', borderRadius: '16px', border: '1px solid #22304a' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#64748b', marginBottom: '6px', fontWeight: '700', letterSpacing: '0.8px' }}>PORTAL-ROLLE</span>
                <span style={{ fontSize: '15px', color: '#38bdf8', fontWeight: '700' }}>Stadtwerke Mitarbeiter</span>
              </div>
            </div>

          </div>

          {/* Internal Quick Links */}
          <div style={{ marginTop: '35px', paddingTop: '30px', borderTop: '1px solid #1e293b' }}>
            <h4 style={{ fontSize: '1rem', color: '#cbd5e1', marginBottom: '15px', fontWeight: '600' }}>⚡ Interne Schnellstart-Bereiche</h4>
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <a href="/entstoerdienst" style={{ background: '#16223b', color: '#38bdf8', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '13.5px', fontWeight: '600', border: '1px solid #283a5c' }}>
                🔧 Entstördienst Dispatch
              </a>
              <a href="/status" style={{ background: '#16223b', color: '#22c55e', padding: '10px 18px', borderRadius: '10px', textDecoration: 'none', fontSize: '13.5px', fontWeight: '600', border: '1px solid #283a5c' }}>
                🟢 System Status
              </a>
            </div>
          </div>

          {/* Logout Button */}
          <div style={{ marginTop: '35px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1e293b', paddingTop: '30px' }}>
            <a href="/api/auth/logout" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', padding: '12px 26px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>🚪 Aus dem Account abmelden</span>
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
