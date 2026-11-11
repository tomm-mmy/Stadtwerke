'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  ShieldCheck, 
  FileText, 
  Lock, 
  RefreshCw,
  CheckCircle2,
  Filter,
  UserCheck,
  Award,
  AlertTriangle
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientPersonal({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('belegschaft');
  const [statusMsg, setStatusMsg] = useState('');
  const [mitarbeiterListe, setMitarbeiterListe] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterRolle, setFilterRolle] = useState('ALL');

  useEffect(() => {
    fetchServerMitglieder();
  }, []);

  const fetchServerMitglieder = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/discord-members');
      const data = await res.json();
      if (data.success) {
        // Bot-ID ignorieren: 1551313329140793425
        const BOOT_ID_TO_IGNORE = '1551313329140793425';
        
        const gefiltert = data.members
          .filter(m => m.id !== BOOT_ID_TO_IGNORE)
          .map(m => {
            // Rollen zuweisen nach deinen Vorgaben
            let rang = 'Mitglied';
            let badgeColor = '#94a3b8';

            if (m.roles.includes('1490307659411357716')) {
              rang = 'Führungsebene';
              badgeColor = '#ef4444';
            } else if (m.roles.includes('1522887379030118450')) {
              rang = 'Neubrücken Leitung';
              badgeColor = '#facc15';
            } else if (m.roles.includes('1568006833854226513')) {
              rang = 'Ausbilder';
              badgeColor = '#38bdf8';
            } else if (m.roles.includes('1523751770323681523')) {
              rang = 'Techniker';
              badgeColor = '#a855f7';
            } else if (m.roles.includes('1490309362365894707')) {
              rang = 'Mitarbeiter';
              badgeColor = '#22c55e';
            } else if (m.roles.includes('1490338777779011706')) {
              rang = 'Mitglied';
              badgeColor = '#94a3b8';
            }

            return {
              ...m,
              ermittelterRang: rang,
              badgeColor
            };
          });

        setMitarbeiterListe(gefiltert);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filterung anwenden
  const gefilterteBelegschaft = mitarbeiterListe.filter(m => {
    if (filterRolle === 'ALL') return true;
    return m.ermittelterRang === filterRolle;
  });

  return (
    <main className={styles.pageContainer} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #0f172a, #065f46)', border: '1px solid #047857', borderRadius: '20px' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <Users size={16} /> Human Resources & Personalverwaltung
        </div>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#fff' }}>Personalabteilung Dashboard</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> (ID: {user?.id}) | Server-Belegschaft: <strong style={{ color: '#34d399' }}>{mitarbeiterListe.length} Aktive User</strong>
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
          onClick={() => setActiveTab('belegschaft')}
          style={{ background: activeTab === 'belegschaft' ? '#38bdf8' : '#0f172a', color: activeTab === 'belegschaft' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Belegschaft-Übersicht ({mitarbeiterListe.length})
        </button>
        <button 
          onClick={() => setActiveTab('notizen')}
          style={{ background: activeTab === 'notizen' ? '#38bdf8' : '#0f172a', color: activeTab === 'notizen' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <AlertTriangle size={18} /> Personalnotizen & Verwarnungen
        </button>
        <button 
          onClick={() => setActiveTab('richtlinien')}
          style={{ background: activeTab === 'richtlinien' ? '#38bdf8' : '#0f172a', color: activeTab === 'richtlinien' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FileText size={18} /> Dienstvorschriften
        </button>
        <button 
          onClick={fetchServerMitglieder}
          style={{ background: '#0f172a', color: '#94a3b8', border: '1px solid #1e293b', padding: '10px 14px', borderRadius: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
          title="Daten aktualisieren"
        >
          <RefreshCw size={16} />
        </button>
      </div>

      {/* TAB 1: BELEGSCHAFT MIT RÄNGEN & FILTER */}
      {activeTab === 'belegschaft' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h2 style={{ color: '#fff', margin: 0 }}>Komplette Server-Belegschaft</h2>
              <p style={{ color: '#94a3b8', fontSize: '0.85rem', margin: '4px 0 0 0' }}>Automatische Rollen-Zuordnung direkt vom Discord-Server (Bots ignoriert).</p>
            </div>

            {/* Filter-Leiste */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Filter size={16} style={{ color: '#38bdf8' }} />
              <select 
                value={filterRolle} 
                onChange={(e) => setFilterRolle(e.target.value)}
                style={{ background: '#070b14', color: '#fff', border: '1px solid #1e293b', padding: '8px 12px', borderRadius: '8px', cursor: 'pointer' }}
              >
                <option value="ALL">Alle Ränge anzeigen</option>
                <option value="Führungsebene">Führungsebene</option>
                <option value="Neubrücken Leitung">Neubrücken Leitung</option>
                <option value="Ausbilder">Ausbilder</option>
                <option value="Techniker">Techniker</option>
                <option value="Mitarbeiter">Mitarbeiter</option>
                <option value="Mitglied">Mitglied</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p style={{ color: '#38bdf8' }}>Lade Live-Daten vom Server...</p>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {gefilterteBelegschaft.map((m) => {
                const isMe = m.id === user?.id;
                return (
                  <div key={m.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {m.username} 
                        {isMe && <span style={{ fontSize: '0.7rem', background: 'rgba(56,189,248,0.2)', color: '#38bdf8', padding: '2px 6px', borderRadius: '4px' }}>Du (Eingeloggt)</span>}
                      </div>
                      <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Discord ID: {m.id}</div>
                    </div>
                    <div style={{ background: `${m.badgeColor}20`, color: m.badgeColor, border: `1px solid ${m.badgeColor}40`, padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                      {m.ermittelterRang}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PERSONALNOTIZEN */}
      {activeTab === 'notizen' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Interne Personalnotizen</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Dokumentation von Beförderungen, Gesprächen oder disziplinarischen Hinweisen.</p>
          <div style={{ background: '#070b14', padding: '1.25rem', borderRadius: '12px', border: '1px solid #1e293b', color: '#cbd5e1' }}>
            Keine offenen Notizen im System hinterlegt.
          </div>
        </div>
      )}

      {/* TAB 3: DIENSTVORSCHRIFTEN */}
      {activeTab === 'richtlinien' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>HR-Dienstvorschriften</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li><strong>Rollenvergabe:</strong> Beförderungen und Rollenwechsel dürfen ausschließlich durch die Personalabteilungsleitung eingetragen werden.</li>
            <li><strong>Datenschutz:</strong> Interne Mitarbeiterdaten und ID-Listen unterliegen strengem Datenschutz.</li>
          </ul>
        </div>
      )}

    </main>
  );
}
