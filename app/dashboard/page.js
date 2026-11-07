'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Standardmäßig auf FALSE, damit beim Laden alles sofort verschleiert/zensiert ist!
  const [revealed, setRevealed] = useState({
    id: false,
    email: false,
  });

  useEffect(() => {
    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
      };

      const userCookie = getCookie('discord_user');
      if (userCookie) {
        const decoded = JSON.parse(decodeURIComponent(userCookie));
        setUser(decoded);
      }
    } catch (e) {
      console.error('Fehler beim Auslesen des Cookies:', e);
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
        <p>Lade Mitarbeiter-Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', fontFamily: 'sans-serif' }}>
        <h2>Du bist nicht angemeldet.</h2>
        <p style={{ color: '#94a3b8', fontSize: '14px' }}>Bitte verifiziere dich über Discord, um auf das Dashboard zuzugreifen.</p>
        <a href="/auth/discord" style={{ background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', boxShadow: '0 4px 15px rgba(99, 102, 241, 0.4)' }}>
          Mit Discord anmelden
        </a>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '35px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Portal
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '5px 0 0 0' }}>Stadtwerke Neubrücken – Interaktive Sicherheitszentrale</p>
          </div>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '10px 18px', borderRadius: '10px', border: '1px solid #334155', transition: 'background 0.2s' }}>
            ← Zur Startseite
          </Link>
        </div>

        {/* Neues Card-Design */}
        <div style={{ background: 'linear-gradient(145deg, #111827, #0f172a)', border: '1px solid #1f2937', borderRadius: '24px', padding: '40px', boxShadow: '0 25px 50px rgba(0,0,0,0.7)' }}>
          
          {/* Profil-Header Card */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '35px', background: 'rgba(22, 30, 46, 0.7)', padding: '25px', borderRadius: '18px', border: '1px solid #283548', backdropFilter: 'blur(10px)' }}>
            <img src={avatarUrl} alt="Profilbild" style={{ width: '95px', height: '95px', borderRadius: '50%', border: '3px solid #38bdf8', boxShadow: '0 0 20px rgba(56, 189, 248, 0.4)' }} />
            <div>
              <h2 style={{ fontSize: '1.9rem', marginBottom: '4px', color: '#fff' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 10px 0' }}>Handle: @{user.username}</p>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(34, 197, 94, 0.3)' }}>
                  ● Verifiziert & Eingecheckt
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '5px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '600', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
                  Stufe: Mitarbeiter
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
            <h3 style={{ fontSize: '1.1rem', color: '#cbd5e1', margin: 0 }}>
              🔒 Sensible Account-Daten & Sicherheit
            </h3>
            <span style={{ fontSize: '12px', color: '#64748b', background: '#161e2e', padding: '4px 10px', borderRadius: '6px', border: '1px solid #283548' }}>
              💡 Tipp: Klicke auf eine Box, um die Zensur aufzuheben
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* E-Mail Card (Zensiert / Blur) */}
            <div 
              onClick={() => toggleReveal('email')}
              style={{ 
                background: '#161e2e', 
                padding: '20px 24px', 
                borderRadius: '16px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer', 
                border: '1px solid #283548',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold', letterSpacing: '0.5px' }}>DISCORD E-MAIL-ADRESSE</span>
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
              <div style={{ background: revealed.email ? 'rgba(56, 189, 248, 0.15)' : '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', fontSize: '13px', fontWeight: '600', border: '1px solid #334155' }}>
                {revealed.email ? '👁️ Sichtbar' : '🔒 Zensiert (Klick)'}
              </div>
            </div>

            {/* Discord ID Card (Zensiert / Blur) */}
            <div 
              onClick={() => toggleReveal('id')}
              style={{ 
                background: '#161e2e', 
                padding: '20px 24px', 
                borderRadius: '16px', 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                cursor: 'pointer', 
                border: '1px solid #283548',
                transition: 'all 0.2s ease',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold', letterSpacing: '0.5px' }}>DISCORD USER ID</span>
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
              <div style={{ background: revealed.id ? 'rgba(56, 189, 248, 0.15)' : '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', fontSize: '13px', fontWeight: '600', border: '1px solid #334155' }}>
                {revealed.id ? '👁️ Sichtbar' : '🔒 Zensiert (Klick)'}
              </div>
            </div>

            {/* Weitere System-Infos Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px', marginTop: '10px' }}>
              <div style={{ background: '#161e2e', padding: '18px 22px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>SPRACHE / LOCALE</span>
                <span style={{ fontSize: '16px', color: '#f8fafc', textTransform: 'uppercase', fontWeight: '500' }}>{user.locale}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '18px 22px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>2-FAKTOR-SICHERHEIT</span>
                <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '500' }}>{user.mfa_enabled}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '18px 22px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'block', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>PORTAL-ZUGRIFF</span>
                <span style={{ fontSize: '16px', color: '#38bdf8', fontWeight: '600' }}>Freigeschaltet</span>
              </div>
            </div>

          </div>

          {/* Abmelden Footer */}
          <div style={{ marginTop: '45px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '25px' }}>
            <a href="/api/auth/logout" style={{ background: 'linear-gradient(135deg, #ef4444, #dc2626)', color: '#fff', padding: '12px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)', transition: 'transform 0.2s' }}>
              🚪 Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
