'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Steuerung für den Unschärfe-Effekt (false = unscharf, true = klar)
  const [revealed, setRevealed] = useState({
    id: false,
    email: false,
  });

  useEffect(() => {
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    };

    try {
      const userCookie = getCookie('discord_user');
      if (userCookie) {
        const decoded = JSON.parse(decodeURIComponent(userCookie));
        setUser(decoded);
      }
    } catch (e) {
      console.error('Fehler beim Auslesen:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  const toggleReveal = (field) => {
    setRevealed((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <p>Lade Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', fontFamily: 'sans-serif' }}>
        <h2>Du bist nicht angemeldet.</h2>
        <a href="/auth/discord" style={{ background: '#6366f1', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600' }}>
          Jetzt mit Discord anmelden
        </a>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.2rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '5px 0 0 0' }}>Stadtwerke Neubrücken – Profil & Account-Sicherheit</p>
          </div>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '10px 18px', borderRadius: '10px', border: '1px solid #334155' }}>
            ← Zur Startseite
          </Link>
        </div>

        {/* Hauptkarte */}
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '20px', padding: '35px', boxShadow: '0 20px 40px rgba(0,0,0,0.6)' }}>
          
          {/* Profil-Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '40px', background: '#161e2e', padding: '25px', borderRadius: '16px', border: '1px solid #283548' }}>
            <img src={avatarUrl} alt="Profilbild" style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid #38bdf8', boxShadow: '0 4px 15px rgba(56, 189, 248, 0.3)' }} />
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '4px', color: '#fff' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 10px 0' }}>Benutzername: @{user.username}</p>
              <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '5px 12px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                ● Verifiziert & Eingecheckt
              </span>
            </div>
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '20px', color: '#cbd5e1', display: 'flex', alignItems: 'center', gap: '8px' }}>
            🔒 Sensible Discord-Daten 
            <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>(Klicke auf die Boxen, um sie zu entblößen / unscharf zu schalten)</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            
            {/* E-Mail mit Blur */}
            <div 
              onClick={() => toggleReveal('email')}
              style={{ background: '#161e2e', padding: '18px 22px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>DISCORD E-MAIL-ADRESSE</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontFamily: 'monospace', 
                  color: '#f8fafc',
                  filter: revealed.email ? 'none' : 'blur(6px)',
                  transition: 'filter 0.2s ease'
                }}>
                  {user.email}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 14px', borderRadius: '8px', color: '#38bdf8', border: '1px solid #334155' }}>
                {revealed.email ? '👁️ Verstecken' : '🔒 Unscharf (Klicken)'}
              </span>
            </div>

            {/* Discord ID mit Blur */}
            <div 
              onClick={() => toggleReveal('id')}
              style={{ background: '#161e2e', padding: '18px 22px', borderRadius: '14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>DISCORD USER ID</span>
                <span style={{ 
                  fontSize: '16px', 
                  fontFamily: 'monospace', 
                  color: '#f8fafc',
                  filter: revealed.id ? 'none' : 'blur(6px)',
                  transition: 'filter 0.2s ease'
                }}>
                  {user.id}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 14px', borderRadius: '8px', color: '#38bdf8', border: '1px solid #334155' }}>
                {revealed.id ? '👁️ Verstecken' : '🔒 Unscharf (Klicken)'}
              </span>
            </div>

            {/* Weitere Infos von Discord */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '15px', marginTop: '10px' }}>
              <div style={{ background: '#161e2e', padding: '16px 20px', borderRadius: '14px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}>SPRACHE / LOCALE</span>
                <span style={{ fontSize: '15px', color: '#f8fafc', textTransform: 'uppercase' }}>{user.locale}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '16px 20px', borderRadius: '14px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}>2-FAKTOR-SCHUTZ</span>
                <span style={{ fontSize: '15px', color: '#22c55e' }}>{user.mfa_enabled}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '16px 20px', borderRadius: '14px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '4px', fontWeight: 'bold' }}>PORTAL-Rolle</span>
                <span style={{ fontSize: '15px', color: '#38bdf8', fontWeight: '600' }}>Mitarbeiter / Bürger</span>
              </div>
            </div>

          </div>

          {/* Abmelden */}
          <div style={{ marginTop: '40px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '25px' }}>
            <a href="/api/auth/logout" style={{ background: '#ef4444', color: '#fff', padding: '12px 26px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)' }}>
              🚪 Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
