'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, 
  ShieldCheck, 
  KeyRound, 
  Eye, 
  EyeOff, 
  Calendar, 
  Globe, 
  ShieldAlert, 
  LogOut, 
  CheckCircle2, 
  Mail, 
  User 
} from 'lucide-react';

export default function ClientDashboard({ user }) {
  const [revealed, setRevealed] = useState({
    id: false,
    email: false,
  });

  const toggleReveal = (field) => {
    setRevealed((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const avatarUrl = user.avatar 
    ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=256`
    : 'https://cdn.discordapp.com/embed/avatars/0.png';

  const formattedJoinDate = user.joined_at 
    ? new Date(user.joined_at).toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) 
    : 'Verifiziert';

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '50px 20px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid #1e293b', paddingBottom: '20px' }}>
          <div>
            <h1 style={{ fontSize: '2.4rem', fontWeight: '800', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', margin: 0 }}>
              Mitarbeiter-Dashboard
            </h1>
            <p style={{ color: '#94a3b8', fontSize: '14px', margin: '6px 0 0 0' }}>Stadtwerke Neubrücken – Server ID: 1490307263909335102</p>
          </div>
          <Link href="/" style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '14px', background: '#1e293b', padding: '10px 20px', borderRadius: '12px', border: '1px solid #334155', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Zur Startseite
          </Link>
        </div>

        <div style={{ background: 'linear-gradient(145deg, #111827, #0d1322)', border: '1px solid #1f2937', borderRadius: '28px', padding: '45px', boxShadow: '0 30px 60px rgba(0,0,0,0.8)' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginBottom: '40px', background: 'rgba(22, 30, 46, 0.7)', backdropFilter: 'blur(10px)', padding: '30px', borderRadius: '20px', border: '1px solid #283548' }}>
            <img src={avatarUrl} alt="Avatar" style={{ width: '105px', height: '105px', borderRadius: '50%', border: '4px solid #38bdf8', boxShadow: '0 0 25px rgba(56, 189, 248, 0.4)' }} />
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2.2rem', marginBottom: '4px', color: '#fff', fontWeight: '700' }}>{user.global_name || user.username}</h2>
              <p style={{ color: '#94a3b8', fontSize: '15px', margin: '0 0 12px 0' }}>
                {user.nickname ? `Server-Nickname: ${user.nickname}` : `@${user.username}`}
              </p>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ background: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(34, 197, 94, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <CheckCircle2 size={14} /> Server-Mitglied verifiziert
                </span>
                <span style={{ background: 'rgba(56, 189, 248, 0.15)', color: '#38bdf8', padding: '6px 14px', borderRadius: '8px', fontSize: '12px', fontWeight: '700', border: '1px solid rgba(56, 189, 248, 0.3)', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                  <ShieldCheck size={14} /> Ränge aktiv ({user.roles?.length || 0} zugewiesen)
                </span>
              </div>
            </div>
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '15px', color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <KeyRound size={20} className="text-cyan" style={{ color: '#38bdf8' }} /> Sensible Account-Daten & Sicherheit
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13.5px', marginBottom: '25px', lineHeight: '1.5' }}>
            Deine E-Mail und Discord-ID sind standardmäßig unscharf gestellt. Klicke auf die jeweilige Box, um sie aufzudecken oder wieder zu zensieren.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            
            <div 
              onClick={() => toggleReveal('email')}
              style={{ background: '#161e2e', padding: '20px 25px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548', transition: 'border-color 0.2s' }}
            >
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>
                  <Mail size={12} /> DISCORD E-MAIL-ADRESSE
                </span>
                <span style={{ 
                  fontSize: '17px', 
                  fontFamily: 'monospace', 
                  color: '#38bdf8',
                  filter: revealed.email ? 'none' : 'blur(7px)',
                  userSelect: revealed.email ? 'text' : 'none',
                  transition: 'filter 0.25s ease'
                }}>
          Nicht verfügbar
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', border: '1px solid #334155', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {revealed.email ? <EyeOff size={14} /> : <Eye size={14} />}
                {revealed.email ? 'Verstecken' : 'Aufdecken'}
              </span>
            </div>

            <div 
              onClick={() => toggleReveal('id')}
              style={{ background: '#161e2e', padding: '20px 25px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', border: '1px solid #283548', transition: 'border-color 0.2s' }}
            >
              <div>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>
                  <User size={12} /> DISCORD USER ID
                </span>
                <span style={{ 
                  fontSize: '17px', 
                  fontFamily: 'monospace', 
                  color: '#38bdf8',
                  filter: revealed.id ? 'none' : 'blur(7px)',
                  userSelect: revealed.id ? 'text' : 'none',
                  transition: 'filter 0.25s ease'
                }}>
                  {user.id}
                </span>
              </div>
              <span style={{ fontSize: '12px', background: '#0f172a', padding: '8px 14px', borderRadius: '10px', color: '#38bdf8', border: '1px solid #334155', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                {revealed.id ? <EyeOff size={14} /> : <Eye size={14} />}
                {revealed.id ? 'Verstecken' : 'Aufdecken'}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '18px', marginTop: '10px' }}>
              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>
                  <Calendar size={12} /> SERVER-BEITRITT
                </span>
                <span style={{ fontSize: '16px', color: '#f8fafc', fontWeight: '600' }}>{formattedJoinDate}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>
                  <Globe size={12} /> SPRACHE / LOCALE
                </span>
                <span style={{ fontSize: '16px', color: '#f8fafc', textTransform: 'uppercase', fontWeight: '600' }}>{user.locale}</span>
              </div>

              <div style={{ background: '#161e2e', padding: '20px', borderRadius: '16px', border: '1px solid #283548' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: '#94a3b8', marginBottom: '6px', fontWeight: 'bold' }}>
                  <ShieldAlert size={12} /> 2-FAKTOR-SCHUTZ (MFA)
                </span>
                <span style={{ fontSize: '16px', color: '#22c55e', fontWeight: '600' }}>{user.mfa_enabled ? 'Aktiviert' : 'Deaktiviert'}</span>
              </div>
            </div>

          </div>

          <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid #1f2937', paddingTop: '30px' }}>
            <a href="/api/auth/logout" style={{ background: '#ef4444', color: '#fff', padding: '14px 30px', borderRadius: '12px', textDecoration: 'none', fontWeight: '600', fontSize: '15px', boxShadow: '0 6px 20px rgba(239, 68, 68, 0.4)', display: 'inline-flex', alignItems: 'center', gap: '10px' }}>
              <LogOut size={18} /> Aus dem Account abmelden
            </a>
          </div>

        </div>

      </div>
    </div>
  );
}
