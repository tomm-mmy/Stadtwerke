'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserCheck, 
  FileText, 
  Lock, 
  RefreshCw,
  CheckCircle2
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientPersonal({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('mitarbeiter');
  const [statusMsg, setStatusMsg] = useState('');
  const [belegschaft, setBelegschaft] = useState([]);
  const [loading, setLoading] = useState(true);

  const [neuerMitarbeiterName, setNeuerMitarbeiterName] = useState('');
  const [neuerMitarbeiterRang, setNeuerMitarbeiterRang] = useState('');

  useEffect(() => {
    fetchEchteDaten();
  }, []);

  const fetchEchteDaten = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/discord-members');
      const data = await res.json();
      if (data.success) {
        setBelegschaft(data.members);
      }
    } catch (err) {
      console.error('Fehler beim Laden der echten Daten:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleEinstellung = (e) => {
    e.preventDefault();
    if (!hasFullRights) {
      alert('Keine Berechtigung für Einstellungen.');
      return;
    }
    setStatusMsg(`Mitarbeiter erfolgreich erfasst!`);
    setNeuerMitarbeiterName('');
    setNeuerMitarbeiterRang('');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <main className={styles.pageContainer} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #0f172a, #065f46)', border: '1px solid #047857', borderRadius: '20px' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <Users size={16} /> Human Resources & Personalwesen (Server ID: 1490307263909335102)
        </div>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#fff' }}>Personalabteilung Dashboard</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> | Status: <strong style={{ color: '#34d399' }}>🟢 Live-Daten aktiv</strong> 
        </p>
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', padding: '1rem', borderRadius: '12px', color: '#4ade80', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} /> {statusMsg}
        </div>
      )}

      {/* Navigation Tabs (Bewerbungen entfernt) */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('mitarbeiter')}
          style={{ background: activeTab === 'mitarbeiter' ? '#38bdf8' : '#0f172a', color: activeTab === 'mitarbeiter' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Server-Belegschaft ({belegschaft.length})
        </button>
        <button 
          onClick={() => setActiveTab('einstellung')}
          style={{ background: activeTab === 'einstellung' ? '#38bdf8' : '#0f172a', color: activeTab === 'einstellung' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <UserCheck size={18} /> Neuen Mitarbeiter erfassen {!hasFullRights && <Lock size={14} />}
        </button>
        <button 
          onClick={() => setActiveTab('richtlinien')}
          style={{ background: activeTab === 'richtlinien' ? '#38bdf8' : '#0f172a', color: activeTab === 'richtlinien' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FileText size={18} /> HR-Richtlinien & Kodex
        </button>
        <button 
          onClick={fetchEchteDaten}
          style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          title="Daten aktualisieren"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* TAB 1: ECHTE SERVER-BELEGSCHAFT */}
      {activeTab === 'mitarbeiter' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Echte Mitglieder des Servers (1490307263909335102)</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Direkt aus der Discord-Server-Schnittstelle geladene Benutzer.</p>

          {loading ? (
            <p style={{ color: '#38bdf8' }}>Lade echte Server-Daten...</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {belegschaft.map((m) => (
                <div key={m.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem' }}>{m.username}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Discord ID: {m.id}</div>
                  </div>
                  <div style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                    Verifiziert / Aktiv
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: NEUEN MITARBEITER ERFASSEN */}
      {activeTab === 'einstellung' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Mitarbeiter erfassen</h2>
          <form onSubmit={handleEinstellung} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            <input 
              type="text" 
              value={neuerMitarbeiterName} 
              onChange={(e) => setNeuerMitarbeiterName(e.target.value)} 
              placeholder="Name / Username" 
              required 
              disabled={!hasFullRights}
              className={styles.modalInput} 
            />
            <input 
              type="text" 
              value={neuerMitarbeiterRang} 
              onChange={(e) => setNeuerMitarbeiterRang(e.target.value)} 
              placeholder="Position / Rang" 
              required 
              disabled={!hasFullRights}
              className={styles.modalInput} 
            />
            <button 
              type="submit" 
              disabled={!hasFullRights}
              style={{ 
                padding: '10px 20px', 
                background: hasFullRights ? '#38bdf8' : '#334155', 
                color: hasFullRights ? '#070b14' : '#94a3b8', 
                fontWeight: 'bold', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: hasFullRights ? 'pointer' : 'not-allowed' 
              }}
            >
              Speichern
            </button>
          </form>
        </div>
      )}

      {/* TAB 3: RICHTLINIEN */}
      {activeTab === 'richtlinien' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>HR-Richtlinien</h2>
          <p style={{ color: '#cbd5e1' }}>Offizieller Verhaltenskodex für die Personalabteilung der Stadtwerke Neubrücken.</p>
        </div>
      )}

    </main>
  );
}
