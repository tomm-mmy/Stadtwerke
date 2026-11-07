'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zensur-Zustände für Blur-Effekt
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
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#38bdf8', display: 'flex', justifyContent: 'center', alignItems: 'center', fontFamily: 'sans-serif' }}>
        <p>Lade Mitarbeiter-Portal...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #111827, #1f2937)', border: '1px solid #374151', padding: '45px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', maxWidth: '450px', width: '100%' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', color: '#f8fafc' }}>Zugriff verweigert</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' }}>Du bist nicht angemeldet oder die Sitzung ist abgelaufen.</p>
          <a href="/auth/discord" style={{ display: 'block', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }}>
            Mit Discord verifizieren & einloggen
          </a>
        </div>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  const formattedJoinDate = user.joined_at ? new Date(user.joined_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'Verifiziert';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '950px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.5rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0 0 0' }}>Stadtwerke Neubrücken – Server ID: 1490307263909335102</p>
          </div>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '10px 20px', borderRadius: '12px', border: '1px solid #334155' }}>
            ← Zur Startseite
          </Link>
        </div>

        {/* Neues High-End Card Design */}
        <div style={{ background: 'linear-gradient(145deg, #111827, #0d1322)', border: '1px solid #1f2937', borderRadius: '28px', padding: '45px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
          
          {/* Profil Banner */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px', background: 'rgba(22, 30, 46, 0.7)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px', border: '1px solid #283548' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '105px', height: '105px', borderRadius: '50%', border: '4px solid #38bdf8', boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)' }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '4px', color: '#fff', fontWeight: '700' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0 0 12px 0' }}>
                {user.nickname ? `Server-Nickname: ${user.nickname}` : `@${user.username}`}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ● Server-Mitglied verifiziert
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  🛡️ Ränge aktiv ({user.roles?.length || 0} zugewiesen)
                </span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            🔐 Sensible Account-Daten (Klick zum Aufdecken)
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '25px', lineHeight: '1.5' }}>
            Deine E-Mail und Discord-ID sind durch einen Unschärfe-Filter geschützt. Ein Klick auf die Box hebt die Zensur auf.
          </p>

          {/* Zensierbare Boxen mit echtem Blur-Toggle */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            {/* E-Mail */}
            <div 
              onClick={() => toggleReveal('email')}
              style={{ background: '#161e2e', padding: '20px 25px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>DISCORD E-MAIL-ADRESSE</span>
                <span style={{ 
                  fontSize: '17px', 
                  fontFamily: 'monospace', 
                  color: '#f8fafc',
                  filter: revealed.email ? 'none' : 'blur(7px)',
                  userSelect: revealed.email ? 'text' : 'none',
                  transition: 'filter 0.25s ease'
                }}>
                  {user.email}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', border: '1px solid #334155', fontWeight: '600' }}>
                {revealed.email ? '👁️ Verstecken' : '🔒 Unscharf (Klicken)'}
              </span>
            </div>

            {/* Discord ID */}
            <div 
              onClick={() => toggleReveal('id')}
              style={{ background: '#161e2e', padding: '20px 25px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>DISCORD USER ID</span>
                <span style={{ 
                  fontSize: '17px', 
                  fontFamily: 'monospace', 
                  color: '#f8fafc',
                  filter: revealed.id ? 'none' : 'blur(7px)',
                  userSelect: revealed.id ? 'text' : 'none',
                  transition: 'filter 0.25s ease'
                }}>
                  {user.id}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', border: '1px solid #334155', fontWeight: '600' }}>
                {revealed.id ? '👁️ Verstecken' : '🔒 Unscharf (Klicken)'}
              </span>
            </div>

            {/* Weitere Profildaten */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '18px', marginTop: '10px' }}>
              
              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>SERVER-BEITRITT</span>
                <span style={{ fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>{formattedJoinDate}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>SPRACHE / LOCALE</span>
                <span style={{ fontSize: '16px', color: '#f8fafc', textTransform: 'uppercase', fontWeight: '600' }}>{user.locale}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>2-FAKTOR-SCHUTZ (MFA)</span>
                <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>{user.mfa_enabled}</span>
              </div>

            </div>

          </div>

          {/* Abmelden */}
          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '30px' }}>
            <a href="/api/auth/logout" style={{ background: '#ef4444', color: '#fff', padding: '14px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)' }}>
              🚪 Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
