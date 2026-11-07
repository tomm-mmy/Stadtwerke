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
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', fontFamily: 'sans-serif' }}>
        <div style={{ background: '#111827', border: '1px solid #1f2937', padding: '40px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem' }}>🔒 Zugriff verweigert</h2>
          <p style={{ color: '#94a3b8', marginBottom: '25px' }}>Du bist nicht angemeldet oder die Sitzung ist abgelaufen.</p>
          <a href="/auth/discord" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}>
            Mit Discord verifizieren & einloggen
          </a>
        </div>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Portal
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0 0 0' }}>Stadtwerke Neubrücken – Autorisierter Mitarbeiterbereich</p>
          </div>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '10px 18px', borderRadius: '10px', border: '1px solid #334155', transition: 'all 0.2s' }}>
            ← Zur Startseite
          </Link>
        </div>

        {/* Neues, modernes Card-Design */}
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.7)' }}>
          
          {/* Profil-Banner-Box */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '35px', background: 'linear-gradient(135deg, #161e2e, #1e293b)', padding: '30px', borderRadius: '18px', border: '1px solid #283548' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '95px', height: '95px', borderRadius: '50%', border: '3px solid #38bdf8', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }} />
            <div>
              <h2 style={{ fontSize: '2rem', marginBottom: '4px', color: '#fff' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 12px 0' }}>Discord-Tag: @{user.username}</p>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                <span>●</span> Verifiziert & Eingecheckt
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🛡️ Account-Sicherheit & Sensible Daten
          </h3>
          <p style={{ color: '#64748b', fontSize: '13px', marginBottom: '25px' }}>
            Aus Sicherheitsgründen sind sensible Angaben (E-Mail und ID) standardmäßig unscharf gestellt. Klicke auf eine Box, um die Zensur aufzuheben oder wieder zu aktivieren.
          </p>

          {/* Eingebettetes Client-Skript für den Klick-Zensur-Effekt */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* Zensierbare E-Mail Box */}
            <details style={{ background: '#161e2e', borderRadius: '16px', border: '1px solid #283548', overflow: 'hidden', cursor: 'pointer' }}>
              <summary style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none', outline: 'none' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>DISCORD E-MAIL-ADRESSE</span>
                  <span style={{ fontSize: '16px', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {user.email || 'Nicht öffentlich hinterlegt'}
                  </span>
                </div>
                <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 12px', borderRadius: '8px', color: '#94a3b8', border: '1px solid #334155' }}>
                  🔓 Zum Aufdecken klicken
                </span>
              </summary>
            </details>

            {/* Zensierbare Discord ID Box */}
            <details style={{ background: '#161e2e', borderRadius: '16px', border: '1px solid #283548', overflow: 'hidden', cursor: 'pointer' }}>
              <summary style={{ padding: '20px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', userSelect: 'none', outline: 'none' }}>
                <div>
                  <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold', letterSpacing: '0.5px' }}>DISCORD USER ID</span>
                  <span style={{ fontSize: '16px', fontFamily: 'monospace', color: '#38bdf8' }}>
                    {user.id}
                  </span>
                </div>
                <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 12px', borderRadius: '8px', color: '#94a3b8', border: '1px solid #334155' }}>
                  🔓 Zum Aufdecken klicken
                </span>
              </summary>
            </details>

            {/* Weitere Profilinfos im Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: '5px' }}>
              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>SPRACHE / LOCALE</span>
                <span style={{ fontSize: '16px', color: '#f8fafc', textTransform: 'uppercase', fontWeight: '600' }}>{user.locale || 'DE'}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>2-FAKTOR-SCHUTZ (MFA)</span>
                <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>{user.mfa_enabled || 'Aktiviert'}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>PORTAL-ROLLE</span>
                <span style={{ fontSize: '16px', color: '#38bdf8', fontWeight: '700' }}>Mitarbeiter / Bürger</span>
              </div>
            </div>

          </div>

          {/* Abmelden */}
          <div style={{ marginTop: '45px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '30px' }}>
            <a href="/api/auth/logout" style={{ background: '#ef4444', color: '#fff', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', transition: 'background 0.2s' }}>
              🚪 Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
