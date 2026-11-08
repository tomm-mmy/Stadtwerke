'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  Calendar, 
  Clock, 
  Users,
  Wrench
} from 'lucide-react';
import DienstplanSection from './components/DienstplanSection';
import DienstplanModal from './modals/DienstplanModal';
import BerichtModal from './modals/BerichtModal';

export default function ClientMitarbeiter({ user }) {
  const [activeTab, setActiveTab] = useState('auftraege'); 
  const [activeModal, setActiveModal] = useState(null); // 'dienstplan' oder 'bericht'
  const [auftraege, setAuftraege] = useState([]);

  useEffect(() => {
    fetch('/api/auftraege')
      .then(res => res.json())
      .then(data => {
        if (data.success) setAuftraege(data.auftraege);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main className="page-container">
      {/* Banner / Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem' }}>
        <h1 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0' }}>Mitarbeiterportal</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Angemeldet als: <strong style={{ color: '#38bdf8' }}>{user?.username || 'Mitarbeiter'}</strong>
        </p>
      </div>

      {/* Schnellzugriff / Management Aktions-Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
        
        {/* GESPERRTE CARD: Schichtdienst eintragen (Coming Soon) */}
        <div 
          style={{
            background: 'linear-gradient(160deg, #090d16 0%, #070b14 100%)',
            border: '1px dashed #1e293b',
            borderRadius: '16px',
            padding: '1.25rem',
            textAlign: 'left',
            color: '#64748b',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            opacity: 0.65,
            cursor: 'not-allowed',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Badge oben rechts */}
          <span style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(245, 158, 11, 0.15',
            color: '#fbbf24',
            border: '1px solid rgba(245, 158, 11, 0.3)',
            fontSize: '0.7rem',
            fontWeight: '700',
            padding: '3px 8px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <Wrench size={12} /> Demnächst
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ background: 'rgba(100, 116, 139, 0.12)', padding: '10px', borderRadius: '10px', color: '#64748b' }}>
              <Users size={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem', color: '#94a3b8' }}>Schichtdienst eintragen</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', color: '#475569', fontSize: '0.85rem' }}>Trage deine Bereitschaftszeit ein (Log an Kanal 1568953444146876488).</p>
          <span style={{ color: '#475569', fontSize: '0.85rem', fontWeight: '600' }}>In Entwicklung...</span>
        </div>

        {/* AKTIVE CARD: Einsatzbericht erfassen */}
        <button 
          onClick={() => setActiveModal('bericht')}
          style={{
            background: 'linear-gradient(160deg, #0f172a 0%, #0b1120 100%)',
            border: '1px solid #1e293b',
            borderRadius: '16px',
            padding: '1.25rem',
            textAlign: 'left',
            cursor: 'pointer',
            color: '#fff',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.75rem' }}>
            <div style={{ background: 'rgba(34, 197, 94, 0.12)', padding: '10px', borderRadius: '10px', color: '#4ade80' }}>
              <FileText size={20} />
            </div>
            <h3 style={{ margin: 0, fontSize: '1.1rem' }}>Einsatzbericht erfassen</h3>
          </div>
          <p style={{ margin: '0 0 1rem 0', color: '#94a3b8', fontSize: '0.85rem' }}>Erstelle einen Bericht für die Führung (Post in Kanal 1568953171643072622).</p>
          <span style={{ color: '#4ade80', fontSize: '0.85rem', fontWeight: '600' }}>Bericht schreiben &rarr;</span>
        </button>
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
          <h2 style={{ margin: '0 0 4px 0', fontSize: '1.4rem' }}>Operative Arbeitsaufträge</h2>
          <p style={{ margin: '0 0 1.5rem 0', color: '#94a3b8', fontSize: '0.9rem' }}>Echte Live-Aufträge der Führungsebene für das Netzgebiet.</p>
          
          {auftraege.length === 0 ? (
            <div style={{ padding: '2rem', textAlign: 'center', border: '1px dashed #1e293b', borderRadius: '12px', color: '#94a3b8' }}>
              Derzeit liegen keine offenen Störungsmeldungen vor. Das Versorgungsnetz läuft stabil.
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {auftraege.map((a) => (
                <div key={a.id} style={{ background: '#070b14', border: '1px solid #1e293b', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ color: '#38bdf8', fontWeight: 'bold', fontSize: '1.05rem' }}>{a.titel}</div>
                  <div style={{ color: '#f8fafc', fontSize: '0.95rem', margin: '6px 0' }}>{a.details}</div>
                  <div style={{ color: '#94a3b8', fontSize: '0.8rem' }}>Eingestellt von: <strong>{a.erstelltVon}</strong> um {a.zeit}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB CONTENT: DIENSTPLAN */}
      {activeTab === 'dienstplan' && <DienstplanSection />}

      {/* TAB CONTENT: REGELWERK */}
      {activeTab === 'regelwerk' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem', color: '#94a3b8' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Dienstvorschrift & Sicherheitsbestimmungen</h2>
          <ul style={{ lineHeight: '1.8', paddingLeft: '1.2rem' }}>
            <li>Bei Einsätzen im Netzgebiet ist stets PSA zu tragen.</li>
            <li>Störungsmeldungen müssen im System protokolliert werden.</li>
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

      {/* Modals einbinden */}
      <DienstplanModal isOpen={activeModal === 'dienstplan'} onClose={() => setActiveModal(null)} user={user} />
      <BerichtModal isOpen={activeModal === 'bericht'} onClose={() => setActiveModal(null)} user={user} />
    </main>
  );
}
