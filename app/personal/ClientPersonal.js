'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  UserPlus, 
  Award, 
  FileText, 
  ShieldCheck, 
  CheckCircle2, 
  Lock, 
  RefreshCw,
  UserCheck,
  AlertCircle
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientPersonal({ user, hasFullRights }) {
  const [activeTab, setActiveTab] = useState('mitarbeiter');
  const [statusMsg, setStatusMsg] = useState('');

  // Dummy-States für Personalverwaltung (können später an eine DB angebunden werden)
  const [mitarbeiterListe, setMitarbeiterListe] = useState([
    { id: 1, name: 'Tommy Shelby', rang: 'Leitung / Admin', abteilung: 'Führung', status: 'Aktiv' },
    { id: 2, name: 'JulBa10', rang: 'Entstörungs-Leitung', abteilung: 'Entstördienst', status: 'Aktiv' },
  ]);

  const [bewerbungen, setBewerbungen] = useState([
    { id: 1, kandidat: 'Max Mustermann', wunschBereich: 'Transport & Logistik', datum: 'Heute' },
    { id: 2, kandidat: 'Anna Schmidt', wunschBereich: 'Mitarbeiter-Portal', datum: 'Gestern' },
  ]);

  const [neuerMitarbeiterName, setNeuerMitarbeiterName] = useState('');
  const [neuerMitarbeiterRang, setNeuerMitarbeiterRang] = useState('');

  const handleEinstellung = (e) => {
    e.preventDefault();
    if (!hasFullRights) {
      alert('Keine Berechtigung für Einstellungen.');
      return;
    }
    if (!neuerMitarbeiterName.trim()) return;

    setMitarbeiterListe([
      ...mitarbeiterListe,
      { id: Date.now(), name: neuerMitarbeiterName, rang: neuerMitarbeiterRang || 'Mitarbeiter', abteilung: 'Allgemein', status: 'Neu eingestellt' }
    ]);
    setStatusMsg(`Mitarbeiter "${neuerMitarbeiterName}" erfolgreich ins System aufgenommen!`);
    setNeuerMitarbeiterName('');
    setNeuerMitarbeiterRang('');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <main className={styles.pageContainer} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #0f172a, #065f46)', border: '1px solid #047857', borderRadius: '20px' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <Users size={16} /> Human Resources & Personalwesen
        </div>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#fff' }}>Personalabteilung Dashboard</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> | Status: <strong style={{ color: '#34d399' }}>🟢 HR-System Online</strong> 
          {hasFullRights ? (
            <span style={{ background: 'rgba(52,211,153,0.2)', color: '#34d399', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', marginLeft: '10px' }}>👑 Personalabteilungsleitung (Volle Rechte)</span>
          ) : (
            <span style={{ background: 'rgba(56,189,248,0.2)', color: '#38bdf8', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', marginLeft: '10px' }}>🛡️ HR-Mitarbeiter</span>
          )}
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
          onClick={() => setActiveTab('mitarbeiter')}
          style={{ background: activeTab === 'mitarbeiter' ? '#38bdf8' : '#0f172a', color: activeTab === 'mitarbeiter' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Users size={18} /> Aktive Belegschaft ({mitarbeiterListe.length})
        </button>
        <button 
          onClick={() => setActiveTab('bewerbungen')}
          style={{ background: activeTab === 'bewerbungen' ? '#38bdf8' : '#0f172a', color: activeTab === 'bewerbungen' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <UserPlus size={18} /> Bewerbungen & Aufnahme ({bewerbungen.length})
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
      </div>

      {/* TAB 1: MITARBEITERLISTE */}
      {activeTab === 'mitarbeiter' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Aktive Belegschaft der Stadtwerke Neubrücken</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Übersicht aller verifizierten Mitarbeiter im Dienst.</p>

          <div style={{ display: 'grid', gap: '1rem' }}>
            {mitarbeiterListe.map((m) => (
              <div key={m.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ color: '#fff', fontWeight: 'bold', fontSize: '1.05rem' }}>{m.name}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>Rang: <span style={{ color: '#38bdf8' }}>{m.rang}</span> | Abteilung: {m.abteilung}</div>
                </div>
                <div style={{ background: 'rgba(52,211,153,0.1)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
                  {m.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: BEWERBUNGEN */}
      {activeTab === 'bewerbungen' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
            <h2 style={{ color: '#fff', marginTop: 0 }}>Offene Bewerbungen</h2>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Eingegangene Bewerbungsanfragen für verschiedene Unternehmensbereiche.</p>

            <div style={{ display: 'grid', gap: '1rem' }}>
              {bewerbungen.map((b) => (
                <div key={b.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1.25rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ color: '#facc15', fontWeight: 'bold' }}>{b.kandidat}</div>
                    <div style={{ color: '#cbd5e1', fontSize: '0.9rem' }}>Wunsch-Bereich: {b.wunschBereich}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Eingegangen: {b.datum}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button style={{ background: 'rgba(34,197,94,0.2)', color: '#4ade80', border: '1px solid rgba(34,197,94,0.4)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      Annehmen
                    </button>
                    <button style={{ background: 'rgba(239,68,68,0.2)', color: '#f87171', border: '1px solid rgba(239,68,68,0.4)', padding: '6px 14px', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem' }}>
                      Ablehnen
                    </button>
                  </div>
                </div>
              ))}
            </div>
        </div>
      )}

      {/* TAB 3: NEUEN MITARBEITER ERFASSEN */}
      {activeTab === 'einstellung' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Mitarbeiter in das System eintragen</h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Neue Kräfte offiziell den Stadtwerken Neubrücken zuweisen.</p>

          {!hasFullRights && (
            <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '1rem', borderRadius: '12px', color: '#f87171', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Lock size={16} /> Hinweis: Nur die Personalabteilungsleitung kann neue Mitarbeiter direkt erfassen.
            </div>
          )}

          <form onSubmit={handleEinstellung} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '500px' }}>
            <input 
              type="text" 
              value={neuerMitarbeiterName} 
              onChange={(e) => setNeuerMitarbeiterName(e.target.value)} 
              placeholder="Discord Username / Name des Mitarbeiters" 
              required 
              disabled={!hasFullRights}
              className={styles.modalInput} 
            />
            <input 
              type="text" 
              value={neuerMitarbeiterRang} 
              onChange={(e) => setNeuerMitarbeiterRang(e.target.value)} 
              placeholder="Zugewiesener Rang / Position" 
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
              Mitarbeiter einstellen
            </button>
          </form>
        </div>
      )}

      {/* TAB 4: RICHTLINIEN */}
      {activeTab === 'richtlinien' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>HR-Richtlinien & Verhaltenskodex</h2>
          <ul style={{ color: '#cbd5e1', lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li><strong>Dienstpflicht:</strong> Jeder Mitarbeiter verpflichtet sich zu respektvollem Umgang und strikter Einhaltung der Sicherheitsvorschriften.</li>
            <li><strong>Beförderungen:</strong> Beförderungen erfolgen ausschließlich nach Absprache mit der Führungsebene und nachweislicher Leistung.</li>
            <li><strong>Disziplinarmaßnahmen:</strong> Bei Fehlverhalten oder Verstößen gegen das interne Regelwerk hat die Personalabteilung das Recht, Verwarnungen oder Entlassungen auszusprechen.</li>
          </ul>
        </div>
      )}

    </main>
  );
}
