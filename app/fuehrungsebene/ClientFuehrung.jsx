'use client';

import { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Users, 
  Power, 
  PlusCircle, 
  CheckCircle2, 
  Lock, 
  FileText,
  Trash2,
  RefreshCw,
  Ban,
  Unlock
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientFuehrung({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('sessions'); 
  const [statusMsg, setStatusMsg] = useState('');
  
  // States
  const [auftraegeListe, setAuftraegeListe] = useState([]);
  const [auftragTitel, setAuftragTitel] = useState('');
  const [auftragDetails, setAuftragDetails] = useState('');
  
  const [sessions, setSessions] = useState([]);
  const [blockedUsers, setBlockedUsers] = useState([]);
  const [reports, setReports] = useState([]);
  const [isMaintenance, setIsMaintenance] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      // Aufträge
      const resA = await fetch('/api/auftraege');
      const dataA = await resA.json();
      if (dataA.success) setAuftraegeListe(dataA.auftraege);

      // System State (Kill Switch)
      const resS = await fetch('/api/admin/system-state');
      const dataS = await resS.json();
      if (dataS.success) setIsMaintenance(dataS.maintenance);

      // Sessions & Blockierte User
      const resSes = await fetch('/api/admin/sessions');
      const dataSes = await resSes.json();
      if (dataSes.success) {
        setSessions(dataSes.sessions);
        setBlockedUsers(dataSes.blocked);
      }

      // Alle Einsatzberichte
      const resRep = await fetch('/api/admin/reports');
      const dataRep = await resRep.json();
      if (dataRep.success) setReports(dataRep.reports);
    } catch (err) {
      console.error(err);
    }
  };

  // Auftrag erstellen
  const handleAuftragSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auftraege', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ titel: auftragTitel, details: auftragDetails, erstelltVon: user?.username })
    });
    const data = await res.json();
    if (data.success) {
      setAuftraegeListe(data.auftraege);
      setStatusMsg('Arbeitsauftrag live geschaltet!');
      setAuftragTitel('');
      setAuftragDetails('');
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  // Auftrag löschen
  const handleDeleteAuftrag = async (id) => {
    const res = await fetch('/api/auftraege', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'delete', id })
    });
    const data = await res.json();
    if (data.success) setAuftraegeListe(data.auftraege);
  };

  // Kill Switch umschalten (Ein / Aus)
  const handleKillswitch = async () => {
    if (!hasFullRights) {
      alert('Sicherheitsfehler: Keine Berechtigung für diese Aktion.');
      return;
    }
    const newState = !isMaintenance;
    const res = await fetch('/api/admin/system-state', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ maintenance: newState })
    });
    const data = await res.json();
    if (data.success) {
      setIsMaintenance(data.maintenance);
      setStatusMsg(data.message);
      setTimeout(() => setStatusMsg(''), 3000);
    }
  };

  // User blockieren oder entsperren
  const handleUserAction = async (targetUserId, action) => {
    if (targetUserId === user?.id && action === 'block') {
      alert('Sicherheitsfehler: Du kannst deinen eigenen Zugriff nicht blockieren!');
      return;
    }

    const res = await fetch('/api/admin/sessions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action, userId: targetUserId, currentUserId: user?.id })
    });
    const data = await res.json();
    if (data.success) {
      setSessions(data.sessions);
      setBlockedUsers(data.blocked);
      setStatusMsg('Benutzerstatus erfolgreich aktualisiert.');
      setTimeout(() => setStatusMsg(''), 3000);
    } else {
      alert(data.error || 'Aktion fehlgeschlagen.');
    }
  };

  return (
    <main className={styles.pageContainer}>
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
          <ShieldAlert size={16} /> Oberste Befehls- & Verwaltungszentrale
        </div>
        <h1 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>Führungsebene Command Center</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> | Plattform-Status: <strong style={{ color: isMaintenance ? '#ef4444' : '#22c55e' }}>{isMaintenance ? '🚨 NOTBETRIEB (OFFLINE)' : '🟢 NORMALBETRIEB'}</strong>
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
          style={{ background: activeTab === 'sessions' ? '#38bdf8' : '#0f172a', color: activeTab === 'sessions' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Mitglieder & Sperren ({sessions.length})
        </button>
        <button 
          onClick={() => setActiveTab('auftraege')}
          style={{ background: activeTab === 'auftraege' ? '#38bdf8' : '#0f172a', color: activeTab === 'auftraege' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <PlusCircle size={18} /> Live-Aufträge ({auftraegeListe.length})
        </button>
        <button 
          onClick={() => setActiveTab('reports')}
          style={{ background: activeTab === 'reports' ? '#38bdf8' : '#0f172a', color: activeTab === 'reports' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FileText size={18} /> Alle Einsatzberichte ({reports.length})
        </button>
        <button 
          onClick={() => setActiveTab('notfall')}
          style={{ background: activeTab === 'notfall' ? '#ef4444' : '#0f172a', color: '#fff', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Power size={18} /> Kill Switch & Notfall {!hasFullRights && <Lock size={14} />}
        </button>
        <button 
          onClick={fetchAllData}
          style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          title="Aktualisieren"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* TAB 1: MITGLIEDER & ZUGRIFFSSPERREN */}
      {activeTab === 'sessions' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Eingeloggte Mitglieder & Zugriffskontrolle</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Hier siehst du alle aktiven User. Du kannst ihren Zugriff komplett blockieren (Sperre greift sofort). Eigene Sperren sind systemseitig unmöglich.</p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {sessions.map((s) => {
              const isMe = s.id === user?.id;
              return (
                <div key={s.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {s.username} {isMe && <span style={{ fontSize: '0.75rem', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '6px' }}>Du</span>}
                    </div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>ID: {s.id} | Rolle: {s.role}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button 
                      onClick={() => handleUserAction(s.id, 'kick')}
                      style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', border: '1px solid rgba(239,68,68,0.2)', padding: '6px 12px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.8rem' }}
                    >
                      Sitzung beenden
                    </button>
                    
                    <button 
                      onClick={() => handleUserAction(s.id, 'block')}
                      disabled={isMe || !hasFullRights}
                      style={{ 
                        background: isMe ? 'rgba(100,100,100,0.1)' : 'rgba(239,68,68,0.2)', 
                        color: isMe ? '#555' : '#ef4444', 
                        border: '1px solid rgba(239,68,68,0.4)', 
                        padding: '6px 12px', 
                        borderRadius: '8px', 
                        cursor: isMe ? 'not-allowed' : 'pointer', 
                        fontSize: '0.8rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                      title={isMe ? 'Du kannst dich nicht selber sperren' : 'Kompletten Zugriff blockieren'}
                    >
                      <Ban size={14} /> Zugriff blockieren
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {blockedUsers.length > 0 && (
            <div style={{ marginTop: '2rem' }}>
              <h3 style={{ color: '#f87171', fontSize: '1rem' }}>Gesperrte User-IDs (Zugriff entzogen)</h3>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                {blockedUsers.map((bId) => (
                  <div key={bId} style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid #ef4444', padding: '6px 12px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontSize: '0.85rem' }}>
                    ID: {bId}
                    <button 
                      onClick={() => handleUserAction(bId, 'unblock')}
                      style={{ background: 'none', border: 'none', color: '#4ade80', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Entsperren"
                    >
                      <Unlock size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: LIVE-AUFTRÄGE */}
      {activeTab === 'auftraege' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Arbeitsaufträge für Mitarbeiter</h2>
          <form onSubmit={handleAuftragSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px', marginBottom: '2rem' }}>
            <input type="text" value={auftragTitel} onChange={(e) => setAuftragTitel(e.target.value)} placeholder="Titel des Auftrags" required className={styles.modalInput} />
            <textarea rows={3} value={auftragDetails} onChange={(e) => setAuftragDetails(e.target.value)} placeholder="Anweisungen..." required className={styles.modalInput} style={{ resize: 'none' }} />
            <button type="submit" className={styles.modalSubmitBtn} style={{ width: 'auto', padding: '10px 20px' }}>Auftrag veröffentlichen</button>
          </form>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {auftraegeListe.map((a) => (
              <div key={a.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold' }}>{a.titel}</div>
                  <div style={{ color: '#fff', fontSize: '0.9rem' }}>{a.details}</div>
                </div>
                <button onClick={() => handleDeleteAuftrag(a.id)} style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'none', padding: '6px 10px', borderRadius: '6px', cursor: 'pointer' }}>
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: ALLE EINSATZBERICHTE */}
      {activeTab === 'reports' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Vollständiges Archiv aller Einsatzberichte</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Hier siehst du sämtliche Berichte, die vom Team eingereicht wurden.</p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {reports.map((r) => (
              <div key={r.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1.25rem', borderRadius: '12px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ color: '#4ade80', fontWeight: 'bold' }}>📍 Ort: {r.ort}</span>
                  <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Verfasser: {r.verfasser} ({r.zeit})</span>
                </div>
                <p style={{ color: '#f8fafc', margin: 0, fontSize: '0.95rem' }}>{r.details}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: KILL SWITCH & NOTFALL */}
      {activeTab === 'notfall' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Kill Switch & Notfall-Steuerung</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Schaltet die Plattform sofort offline oder wieder in den Normalbetrieb zurück.</p>

          {!hasFullRights && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '1.5rem' }}>
              <Lock size={16} /> Hinweis: Für diesen Bereich ist die volle Management-Freigabe erforderlich.
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
            <Power size={18} /> {isMaintenance ? 'Notbetrieb aufheben (Zurück zum Normalbetrieb)' : 'Kill Switch aktivieren (Website komplett offline nehmen)'}
          </button>
        </div>
      )}
    </main>
  );
}
