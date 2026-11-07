'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function DashboardPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Zustände für das Zensieren der einzelnen Felder (false = zensiert, true = sichtbar)
  const [revealed, setRevealed] = useState({
    id: false,
    email: false,
  });

  useEffect(() => {
    // Da wir hier im Browser sind, lesen wir den Cookie aus oder holen die User-Daten
    // Alternativ greifen wir auf den Cookie zu. In Next.js Client-Komponenten liest man Cookies meist über document.cookie aus
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
      console.error('Fehler beim Auslesen des Users:', e);
    } finally {
      setLoading(false);
    }
  }, []);

  // Umschalten der Zensur für ein bestimmtes Feld
  const toggleReveal = (field) => {
    setRevealed((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <p>Lade Dashboard...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px' }}>
        <h2>Du bist nicht angemeldet.</h2>
        <a href="/auth/discord" style={{ background: '#6366f1', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
          Jetzt mit Discord anmelden
        </a>
      </div>
    );
  }

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  // Beispiel-E-Mail (Falls Discord-Email im Cookie gespeichert wurde, ansonsten Platzhalter)
  const userEmail = user.email || 'mitglied@neubruecken-rp.de'; 

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <h1 style={{ fontSize: '2rem', fontWeight: '700', color: '#38bdf8' }}>Benutzer-Dashboard</h1>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '8px 16px', borderRadius: '8px' }}>
            ← Zurück zur Startseite
          </Link>
        </div>

        {/* Profil-Karte */}
        <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '30px', boxShadow: '0 10px 30px rgba(0,0,0,0.5)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '25px', marginBottom: '35px' }}>
            <img src={avatarUrl} alt="Profilbild" style={{ width: '90px', height: '90px', borderRadius: '50%', border: '3px solid #38bdf8' }} />
            <div>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '5px', color: '#fff' }}>{user.username}</h2>
              <p style={{ color: '#22c55e', fontSize: '14px', margin: 0 }}>● Verifiziert & Angemeldet</p>
            </div>
          </div>

          <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#cbd5e1', borderBottom: '1px solid #1f2937', paddingBottom: '10px' }}>
            🔒 Private & Account-Details <span style={{ fontSize: '12px', color: '#64748b', fontWeight: 'normal' }}>(Klicke auf die Felder, um sie ein- oder auszublenden)</span>
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Discord ID */}
            <div 
              onClick={() => toggleReveal('id')}
              style={{ background: '#1e293b', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #334155', transition: 'border-color 0.2s' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>DISCORD USER ID</span>
                <span style={{ fontSize: '16px', fontFamily: 'monospace', color: '#f8fafc' }}>
                  {revealed.id ? user.id : '••••••••••••••••••••'}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 12px', borderRadius: '6px', color: '#38bdf8' }}>
                {revealed.id ? '👁️ Verstecken' : '🔒 Aufdecken'}
              </span>
            </div>

            {/* E-Mail */}
            <div 
              onClick={() => toggleReveal('email')}
              style={{ background: '#1e293b', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #334155', transition: 'border-color 0.2s' }}
            >
              <div>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>E-MAIL-ADRESSE</span>
                <span style={{ fontSize: '16px', fontFamily: 'monospace', color: '#f8fafc' }}>
                  {revealed.email ? userEmail : '••••••••••••@••••••.com'}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '6px 12px', borderRadius: '6px', color: '#38bdf8' }}>
                {revealed.email ? '👁️ Verstecken' : '🔒 Aufdecken'}
              </span>
            </div>

            {/* Status / Rolle */}
            <div style={{ background: '#1e293b', padding: '16px 20px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', border: '1px solid #334155' }}>
              <div>
                <span style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '4px' }}>STATUS AUF DEM SERVER</span>
                <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>
                  Mitarbeiter / Bürger
                </span>
              </div>
            </div>

          </div>

          {/* Abmelden Button */}
          <div style={{ marginTop: '35px', textAlign: 'right' }}>
            <a href="/api/auth/logout" style={{ background: '#ef4444', color: '#fff', padding: '12px 24px', borderRadius: '10px', textDecoration: 'none', fontWeight: '600', fontSize: '14px', display: 'inline-block' }}>
              🚪 Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
