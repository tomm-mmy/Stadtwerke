'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Power, 
  UserX, 
  PlusCircle, 
  CheckCircle2, 
  Lock, 
  Activity,
  Trash2
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientFuehrung({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('sessions'); 
  const [statusMsg, setStatusMsg] = useState('');
  
  const [auftragTitel, setAuftragTitel] = useState('');
  const [auftragDetails, setAuftragDetails] = useState('');
  const [auftraegeListe, setAuftraegeListe] = useState([]);

  // Echte Sitzung vom angemeldeten User laden
  const [aktiveNutzer, setAktiveNutzer] = useState([
    { id: user?.id || '1', name: user?.username || 'Tommy', rank: 'Führungsebene / Admin', status: 'Aktiv (Jetzt)' }
  ]);

  useEffect(() => {
    // Aktuelle Aufträge von der API laden
    fetch('/api/auftraege')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAuftraegeListe(data.auftraege);
      })
      .catch(err => console.error(err));
  }, []);

  const handleAuftragSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Übermittle Auftrag an das Mitarbeiter-Portal...');

    try {
      const res = await fetch('/api/auftraege', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titel: auftragTitel,
          details: auftragDetails,
          erstelltVon: user?.username || 'Führung'
        })
      });
      const data = await res.json();
      if (data.success) {
        setAuftraegeListe([data.auftrag, ...auftraegeListe]);
        setStatusMsg('Arbeitsauftrag erfolgreich im Mitarbeiter-Portal live geschaltet!');
        setAuftragTitel('');
        setAuftragDetails('');
      } else {
        setStatusMsg('Fehler beim Speichern des Auftrags.');
      }
    } catch (err) {
      setStatusMsg('Netzwerkfehler aufgetreten.');
    }
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleKillswitch = () => {
    if (!hasFullRights) return;
    if (confirm('ACHTUNG: Möchtest du das gesamte Stadtwerke-Netzwerk in den Notbetrieb versetzen?')) {
      alert('SYSTEM-NOTBETRIEB AKTIVIERT: Alle öffentlichen Zugriffe wurden gesperrt.');
    }
  };

  const handleKickUser = (userName) => {
    if (!hasFullRights) return;
    if (confirm(`Möchtest du den User ${userName} wirklich sofort zwangsabmelden?`)) {
      setAktiveNutzer(aktiveNutzer.filter(u => u.name !== userName));
      alert(`Benutzer ${userName} wurde erfolgreich abgemeldet.`);
    }
  };

  return (
    <main className={styles.pageContainer}>
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={16} /> Echte Leitstelle & Administration
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>Führungsebene & Zentrale</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> 
          {!hasFullRights && <span style={{ color: '#f87171', marginLeft: '10px' }}>(Neubrücken Hauptleitung: Eingeschränkte Notfallrechte)</span>}
        </p>
      </div>

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
          <Users size={18} /> Echte Sessions & Ränge
        </button>
        <button 
          onClick={() => setActiveTab('auftraege')}
          style={{ background: activeTab === 'auftraege' ? '#38bdf8' : '#0f172a', color: activeTab === 'auftraege' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={18} /> Live-Aufträge für Mitarbeiter ({auftraegeListe.length})
        </button>
        <button 
          onClick={() => setActiveTab('notfall')}
          style={{ background: activeTab === 'notfall' ? '#ef4444' : '#0f172a', color: '#fff', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Power size={18} /> Notfall-Kontrolle {!hasFullRights && <Lock size={14} />}
        </button>
      </div>

      {/* TAB 1: ECHTE SITZUNGEN */}
      {activeTab === 'sessions' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Aktive Personal-Sessions</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Echtzeit-Überwachung der aktuell verbundenen Teammitglieder.</p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            {aktiveNutzer.map((u, idx) => (
              <div key={idx} style={{ background: '#070b14', border: '1px solid #1e293b', borderRadius: '12px', padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold' }}>{u.name}</div>
                  <div style={{ color: '#38bdf8', fontSize: '0.85rem' }}>Status: {u.rank}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <span style={{ fontSize: '0.8rem', background: 'rgba(34,197,94,0.1)', color: '#4ade80', padding: '4px 10px', borderRadius: '10px' }}>{u.status}</span>
                  
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
                    <UserX size={14} /> Manuell abmelden
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: AUFTRÄGE ERSTELLEN */}
      {activeTab === 'auftraege' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Echten Arbeitsauftrag für Mitarbeiter veröffentlichen</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Erscheint sofort live im Mitarbeiter-Portal unter *Aktive Aufträge*.</p>
          
          <form onSubmit={handleAuftragSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginBottom: '2rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Auftragstitel</label>
              <input 
                type="text" 
                value={auftragTitel} 
                onChange={(e) => setAuftragTitel(e.target.value)} 
                placeholder="z.B. Rohrbruch Sektor A beheben" 
                required 
                className={styles.modalInput} 
              />
            </div>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Instruktionen</label>
              <textarea 
                rows={3} 
                value={auftragDetails} 
                onChange={(e) => setAuftragDetails(e.target.value)} 
                placeholder="Details für das anrückende Team..." 
                required 
                className={styles.modalInput} 
                style={{ resize: 'none' }} 
              />
            </div>
            <button type="submit" className={styles.modalSubmitBtn} style={{ width: 'auto', padding: '12px 24px' }}>
              Live schalten
            </button>
          </form>

          <h3 style={{ color: '#fff', fontSize: '1.1rem', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>Bereits aktive Live-Aufträge ({auftraegeListe.length})</h3>
          <div style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }}>
            {auftraegeListe.map((a) => (
              <div key={a.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '10px' }}>
                <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>{a.titel}</div>
                <div style={{ color: '#f8fafc', fontSize: '0.9rem', margin: '4px 0' }}>{a.details}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.75rem' }}>Erstellt von {a.erstelltVon} um {a.zeit}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: NOTFALL-KONTROLLE */}
      {activeTab === 'notfall' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Notfall-Steuerung & Killswitch</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Kritische Leitungs-Funktionen.</p>
          
          {!hasFullRights && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> <strong>Hinweis:</strong> Als Neubrücken Hauptleitung sind diese Notfall-Schalter für dich gesperrt.
            </div>
          )}

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
            <Power size={18} /> Gesamte Plattform in Notbetrieb schalten
          </button>
        </div>
      )}
    </main>
  );
}
