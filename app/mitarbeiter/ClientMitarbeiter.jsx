'use client';

import { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Plus, 
  Clock, 
  Sliders, 
  Radio, 
  Users, 
  X,
  Info
} from 'lucide-react';
import DienstplanSection from './components/DienstplanSection';

export default function ClientMitarbeiter({ user }) {
  const [activeTab, setActiveTab] = useState('auftraege'); // 'regelwerk', 'auftraege', 'meetings', 'dienstplan'
  const [activeModal, setActiveModal] = useState(null); // 'auftrag', 'schranke', 'alarm'
  const [successMsg, setSuccessMsg] = useState('');

  const handleModalSubmit = (e) => {
    e.preventDefault();
    setSuccessMsg('Aktion erfolgreich übermittelt!');
    setTimeout(() => {
      setSuccessMsg('');
      setActiveModal(null);
    }, 1800);
  };

  return (
    <main className="page-container">
      {/* Banner / Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Mitarbeiterportal</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Angemeldet als: <strong style={{ color: '#38bdf8' }}>{user?.username || 'Mitarbeiter'}</strong>
        </p>
      </div>

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('auftraege')}
          style={{
            background: activeTab === 'auftraege' ? '#38bdf8' : '#0f172a',
            color: activeTab === 'auftraege' ? '#070b14' : '#f8fafc',
            border: '1px solid #1e293b',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <CheckCircle2 size={18} /> Aktive Aufträge
        </button>

        <button 
          onClick={() => setActiveTab('dienstplan')}
          style={{
            background: activeTab === 'dienstplan' ? '#38bdf8' : '#0f172a',
            color: activeTab === 'dienstplan' ? '#070b14' : '#f8fafc',
            border: '1px solid #1e293b',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Clock size={18} /> Richtzeiten-Dienstplan
        </button>

        <button 
          onClick={() => setActiveTab('regelwerk')}
          style={{
            background: activeTab === 'regelwerk' ? '#38bdf8' : '#0f172a',
            color: activeTab === 'regelwerk' ? '#070b14' : '#f8fafc',
            border: '1px solid #1e293b',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FileText size={18} /> Dienstvorschrift & Regelwerk
        </button>

        <button 
          onClick={() => setActiveTab('meetings')}
          style={{
            background: activeTab === 'meetings' ? '#38bdf8' : '#0f172a',
            color: activeTab === 'meetings' ? '#070b14' : '#f8fafc',
            border: '1px solid #1e293b',
            padding: '10px 18px',
            borderRadius: '12px',
            fontWeight: '700',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <Calendar size={18} /> Meetings & Termine
        </button>
      </div>

      {/* TAB CONTENT: AUFTRÄGE */}
      {activeTab === 'auftraege' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem' }}>Operative Arbeitsaufträge</h2>
              <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.9rem' }}>Aktuelle Wartungs- und Entstörungsaufträge im Netzgebiet.</p>
            </div>
            <button 
              onClick={() => setActiveModal('auftrag')}
              style={{
                background: '#6366f1',
                color: '#fff',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '12px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Plus size={18} /> Neuen Auftrag anlegen
            </button>
          </div>

          <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed #1e293b', borderRadius: '12px', color: '#94a3b8' }}>
            Derzeit liegen keine offenen Störungsmeldungen vor. Das Versorgungsnetz läuft stabil.
          </div>
        </div>
      )}

      {/* TAB CONTENT: DIENSTPLAN */}
      {activeTab === 'dienstplan' && <DienstplanSection />}

      {/* TAB CONTENT: REGELWERK */}
      {activeTab === 'regelwerk' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem', color: '#94a3b8' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Dienstvorschrift & Sicherheitsbestimmungen</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>Bei Einsätzen im Netzgebiet ist stets PSA (Persönliche Schutzausrüstung) zu tragen.</li>
            <li>Störungsmeldungen müssen unverzüglich im System protokolliert werden.</li>
            <li>Fahrzeuge des Entstörungsdienstes sind nach Dienstende aufzutanken und zu überprüfen.</li>
          </ul>
        </div>
      )}

      {/* TAB CONTENT: MEETINGS */}
      {activeTab === 'meetings' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Anstehende Besprechungen</h2>
          <p style={{ color: '#94a3b8' }}>Wöchentliche Dienstbesprechung: Jeden Sonntag um 18:00 Uhr im Discord-Büro.</p>
        </div>
      )}

      {/* MODAL SYSTEM */}
      {activeModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <button onClick={() => setActiveModal(null)} className="modal-close-btn"><X size={18} /></button>
            
            {successMsg ? (
              <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                <CheckCircle2 size={44} color="#22c55e" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ color: '#fff' }}>{successMsg}</h3>
              </div>
            ) : (
              <div>
                {activeModal === 'auftrag' && (
                  <div>
                    <h3 className="modal-title"><Plus size={20} color="#6366f1" /> Neuen Auftrag anlegen</h3>
                    <p className="modal-desc">Erfassen Sie einen neuen Einsatz für den Entstörungsdienst.</p>
                    <form onSubmit={handleModalSubmit} className="modal-form">
                      <input type="text" placeholder="Einsatzort / Straße" required className="modal-input" />
                      <select className="modal-input">
                        <option>Priorität: Normal (Wartung)</option>
                        <option>Priorität: Hoch (Rohrbruch/Stromausfall)</option>
                        <option>Priorität: Dringend (Gasaustritt)</option>
                      </select>
                      <textarea rows={3} placeholder="Beschreibung der Störung..." required className="modal-input" style={{ resize: 'none' }} />
                      <button type="submit" className="btn-discord-login" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
                        Auftrag freigeben
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
