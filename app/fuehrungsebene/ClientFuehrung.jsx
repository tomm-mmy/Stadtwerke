'use client';

import { useState } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Power, 
  UserX, 
  PlusCircle, 
  CheckCircle2, 
  Lock, 
  Activity,
  Radio
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientFuehrung({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('sessions'); // 'sessions', 'auftraege', 'notfall'
  const [statusMsg, setStatusMsg] = useState('');
  
  // Formular State für Aufträge an Mitarbeiter
  const [auftragTitel, setAuftragTitel] = useState('');
  const [auftragDetails, setAuftragDetails] = useState('');

  // Aktive User Simulation (könnte über API geladen werden)
  const [aktiveNutzer] = useState([
    { id: '1', name: 'Tommy', rank: 'Führungsebene', status: 'Online' },
    { id: '2', name: 'Max_Müller', rank: 'Mitarbeiter', status: 'Im Dienst' },
    { id: '3', name: 'Anna99', rank: 'Neubrücken Hauptleitung', status: 'Online' }
  ]);

  const handleAuftragSubmit = (e) => {
    e.preventDefault();
    setStatusMsg('Arbeitsauftrag erfolgreich an das Mitarbeiter-Portal übermittelt!');
    setTimeout(() => setStatusMsg(''), 2500);
    setAuftragTitel('');
    setAuftragDetails('');
  };

  const handleKillswitch = () => {
    if (!hasFullRights) return;
    if (confirm('ACHTUNG: Möchtest du die Website wirklich in den Notbetrieb / Offline-Modus versetzen?')) {
      setStatusMsg('Website wurde in den Notfall-Modus versetzt!');
    }
  };

  const handleKickUser = (userName) => {
    if (!hasFullRights) return;
    alert(`Benutzer ${userName} wurde manuell abgemeldet.`);
  };

  return (
    <main className={styles.pageContainer}>
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={16} /> Zentrale Führungs-Leitstelle
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>Führungsebene & Administration</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Angemeldet als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> 
          {!hasFullRights && <span style={{ color: '#f87171', marginLeft: '10px' }}>(Hauptleitung: Eingeschränkte Notfallrechte)</span>}
        </p>
      </div>

      {/* Status-Meldung */}
      {statusMsg && (
        <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', padding: '1rem', borderRadius: '12px', color: '#4ade80', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} /> {statusMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('sessions')}
          style={{ background: activeTab === 'sessions' ? '#38bdf8' : '#0f172a', color: activeTab === 'sessions' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Aktive Sitzungen & Ränge
        </button>
        <button 
          onClick={() => setActiveTab('auftraege')}
          style={{ background: activeTab === 'auftraege' ? '#38bdf8' : '#0f172a', color: activeTab === 'auftraege' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={18} /> Aufträge an Mitarbeiter
        </button>
        <button 
          onClick={() => setActiveTab('notfall')}
          style={{ background: activeTab === 'notfall' ? '#ef4444' : '#0f172a', color: '#fff', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Power size={18} /> Notfall & Leitungs-Kontrolle {!hasFullRights && <Lock size={14} />}
        </button>
      </div>

      {/* TAB 1: AKTIVE SITZUNGEN & RÄNGE */}
      {activeTab === 'sessions' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Eingeloggte Benutzer & Ränge</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Echtzeit-Übersicht aller aktuell aktiven Personal-Sessions auf der Plattform.</p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {aktiveNutzer.map((u, idx) => (
              <div key={idx} style={{ background: '#070b14', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{u.name}</div>
                  <div style={{ color: '#38bdf8', fontSize: '0.85rem' }}>Rang: {u.rank}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(34,197,94,0.1)', color: '#4ade80', padding: '4px 10px', borderRadius: '10px' }}>{u.status}</span>
                  
                  {/* Manuelles Abmelden - für Hauptleitung gesperrt */}
                  <button 
                    onClick={() => handleKickUser(u.name)}
                    disabled={!hasFullRights}
                    style={{
                      background: hasFullRights ? 'rgba(239, 68, 68, 0.15)' : 'rgba(100,100,100,0.1)',
                      color: hasFullRights ? '#f87171' : '#666',
                      border: `1px solid ${hasFullRights ? 'rgba(239, 68, 68, 0.3)' : '#333'}`,
                      padding: '6px 12px',
                      borderRadius: '8px',
                      cursor: hasFullRights ? 'pointer' : 'not-allowed',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <UserX size={14} /> Abmelden
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AUFTRÄGE FÜR MITARBEITER ERSTELLEN */}
      {activeTab === 'auftraege' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Neuen Arbeitsauftrag für Mitarbeiter erstellen</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Dieser Auftrag wird direkt im Mitarbeiter-Portal unter *Aktive Aufträge* angezeigt.</p>
          
          <form onSubmit={handleAuftragSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Auftragstitel</label>
              <input 
                type="text" 
                value={auftragTitel} 
                onChange={(e) => setAuftragTitel(e.target.value)} 
                placeholder="z.B. Wartung Hauptwasserleitung Sektor B" 
                required 
                className={styles.modalInput} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Auftragsdetails & Instruktionen</label>
              <textarea 
                rows={4} 
                value={auftragDetails} 
                onChange={(e) => setAuftragDetails(e.target.value)} 
                placeholder="Genaue Anweisungen für das Kollegium..." 
                required 
                className={styles.modalInput} 
                style={{ resize: 'none' }} 
              />
            </div>
            <button type="submit" className={styles.modalSubmitBtn} style={{ width: 'auto', padding: '12px 24px' }}>
              Auftrag an Mitarbeiter-Portal senden
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: NOTFALL & LEITUNGS-KONTROLLE (Mit Sperre für Hauptleitung) */}
      {activeTab === 'notfall' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Notfall-Steuerung & Killswitch</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Kritische Eingriffe in den Systembetrieb. Diese Funktionen sind der Hauptführung vorbehalten.</p>
          
          {!hasFullRights && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> <strong>Hinweis für Neubrücken Hauptleitung:</strong> Diese Notfall-Aktionen sind für deinen Account gesperrt.
            </div>
          )}

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button 
              onClick={handleKillswitch}
              disabled={!hasFullRights}
              style={{
                background: hasFullRights ? '#ef4444' : '#334155',
                color: '#fff',
                border: 'none',
                padding: '14px 24px',
                borderRadius: '12px',
                fontWeight: 'bold',
                cursor: hasFullRights ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                opacity: hasFullRights ? 1 : 0.6
              }}
            >
              <Power size={18} /> Website sofort offline nehmen (Notbetrieb)
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
