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
  Trash2,
  RefreshCw
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientFuehrung({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('auftraege'); 
  const [statusMsg, setStatusMsg] = useState('');
  
  const [auftragTitel, setAuftragTitel] = useState('');
  const [auftragDetails, setAuftragDetails] = useState('');
  const [auftraegeListe, setAuftraegeListe] = useState([]);
  const [isMaintenance, setIsMaintenance] = useState(false);

  // Daten beim Laden abrufen
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Aufträge laden
      const resAuftraege = await fetch('/api/auftraege');
      const dataA = await resAuftraege.json();
      if (dataA.success) setAuftraegeListe(dataA.auftraege);

      // System-Status laden
      const resState = await fetch('/api/admin/system-state');
      const dataS = await resState.json();
      if (dataS.success) setIsMaintenance(dataS.maintenance);
    } catch (err) {
      console.error(err);
    }
  };

  const handleAuftragSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg('Sende Auftrag an das Mitarbeiter-Portal...');

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
        setAuftraegeListe(data.auftraege);
        setStatusMsg('Echter Arbeitsauftrag erfolgreich im Mitarbeiter-Portal live geschaltet!');
        setAuftragTitel('');
        setAuftragDetails('');
      }
    } catch (err) {
      setStatusMsg('Fehler beim Übermitteln.');
    }
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleDeleteAuftrag = async (id) => {
    const res = await fetch('/api/auftraege', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    const data = await res.json();
    if (data.success) {
      setAuftraegeListe(data.auftraege);
      setStatusMsg('Auftrag erfolgreich gelöscht / abgeschlossen.');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  const handleKillswitch = async () => {
    if (!hasFullRights) return;
    const newState = !isMaintenance;
    
    if (confirm(`ACHTUNG: Möchtest du den Notbetrieb auf ${newState ? 'AKTIV' : 'AUS'} schalten?`)) {
      try {
        const res = await fetch('/api/admin/system-state', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ maintenance: newState })
        });
        const data = await res.json();
        if (data.success) {
          setIsMaintenance(data.maintenance);
          setStatusMsg(data.message);
        }
      } catch (err) {
        alert('Fehler beim Umschalten des System-Status.');
      }
    }
  };

  return (
    <main className={styles.pageContainer}>
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={16} /> Zentrale Echtzeit-Leitstelle
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>Führungsebene & Administration</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> | System-Status: <strong style={{ color: isMaintenance ? '#ef4444' : '#22c55e' }}>{isMaintenance ? '🚨 NOTBETRIEB AKTIV' : '🟢 Normalbetrieb'}</strong>
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
          onClick={() => setActiveTab('auftraege')}
          style={{ background: activeTab === 'auftraege' ? '#38bdf8' : '#0f172a', color: activeTab === 'auftraege' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={18} /> Live-Aufträge verwalten ({auftraegeListe.length})
        </button>
        <button 
          onClick={() => setActiveTab('notfall')}
          style={{ background: activeTab === 'notfall' ? '#ef4444' : '#0f172a', color: '#fff', border: '1px solid #1e293b', padding: '10px 18px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Power size={18} /> Notfall-Kontrolle & Killswitch {!hasFullRights && <Lock size={14} />}
        </button>
        <button 
          onClick={fetchData}
          style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          title="Daten aktualisieren"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* TAB 1: AUFTRÄGE VERWALTEN & ERSTELLEN */}
      {activeTab === 'auftraege' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Echten Arbeitsauftrag für Mitarbeiter veröffentlichen</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Wird in Echtzeit im Mitarbeiter-Portal angezeigt.</p>
          
          <form onSubmit={handleAuftragSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginBottom: '2.5rem' }}>
            <div>
              <label style={{ display: 'block', color: '#94a3b8', fontSize: '0.85rem', marginBottom: '6px' }}>Auftragstitel</label>
              <input 
                type="text" 
                value={auftragTitel} 
                onChange={(e) => setAuftragTitel(e.target.value)} 
                placeholder="z.B. Transformator Sektor 4 prüfen" 
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
              Live auf Website schalten
            </button>
          </form>

          <h3 style={{ color: '#fff', fontSize: '1.1rem', borderTop: '1px solid #1e293b', paddingTop: '1.5rem' }}>Aktive Live-Aufträge im System ({auftraegeListe.length})</h3>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
            {auftraegeListe.map((a) => (
              <div key={a.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.05rem' }}>{a.titel}</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.95rem', margin: '4px 0' }}>{a.details}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Erstellt von {a.erstelltVon} um {a.zeit}</div>
                </div>
                <button 
                  onClick={() => handleDeleteAuftrag(a.id)}
                  style={{ background: 'rgba(239,68,68,0.15)', color: '#f87171', border: '1px solid rgba(239,68,68,0.3)', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <Trash2 size={16} /> Beenden
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: NOTFALL-KONTROLLE */}
      {activeTab === 'notfall' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Notfall-Steuerung & Killswitch</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Schaltet das System global in den Notbetrieb.</p>
          
          {!hasFullRights && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Lock size={20} /> <strong>Hinweis:</strong> Als Neubrücken Hauptleitung ist dieser Schalter gesperrt.
            </div>
          )}

          <button 
            onClick={handleKillswitch}
            disabled={!hasFullRights}
            style={{
              background: isMaintenance ? '#22c55e' : '#ef4444',
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
            <Power size={18} /> {isMaintenance ? 'Notbetrieb aufheben & Normalbetrieb starten' : 'Plattform sofort in Notbetrieb schalten'}
          </button>
        </div>
      )}
    </main>
  );
}
