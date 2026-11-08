'use client';

import { useState } from 'react';
import { Shield, FileText, CheckCircle, Calendar, Plus } from 'lucide-react';
import RegelwerkSection from './components/RegelwerkSection';

export default function ClientMitarbeiter({ user }) {
  const [activeTab, setActiveTab] = useState('regelwerk');

  // Prüfen, ob der User zur Führungsebene oder Personalabteilung gehört (für Buttons zum Erstellen)
  // Hier Rollen-IDs anpassen
  const isManagementOrHR = user.roles?.some(role => ['1490307263909335102', '1490307263909335103'].includes(role));

  return (
    <main className="page-container">
      <div className="hero-section">
        <div className="hero-content" style={{ textAlign: 'left', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="card-icon" style={{ margin: 0 }}><Shield size={28} /></div>
            <div>
              <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Mitarbeiterportal</h1>
              <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Angemeldet als: <strong>{user.global_name || user.username}</strong></p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <button 
          onClick={() => setActiveTab('regelwerk')} 
          style={{ background: activeTab === 'regelwerk' ? 'var(--cyan)' : '#111827', color: activeTab === 'regelwerk' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} /> Dienstvorschrift & Regelwerk
        </button>
        <button 
          onClick={() => setActiveTab('auftraege')} 
          style={{ background: activeTab === 'auftraege' ? 'var(--cyan)' : '#111827', color: activeTab === 'auftraege' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> Aktive Aufträge
        </button>
        <button 
          onClick={() => setActiveTab('meetings')} 
          style={{ background: activeTab === 'meetings' ? 'var(--cyan)' : '#111827', color: activeTab === 'meetings' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} /> Meetings & Termine
        </button>
      </div>

      {/* Tab Inhalt */}
      {activeTab === 'regelwerk' && <RegelwerkSection />}

      {activeTab === 'auftraege' && (
        <div style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '20px', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#fff' }}>Operative Aufträge</h3>
            {isManagementOrHR && (
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> Neuen Auftrag anlegen
              </button>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Hier erscheinen alle aktuellen Arbeitsaufträge für das Netzgebiet.</p>
        </div>
      )}

      {activeTab === 'meetings' && (
        <div style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '20px', padding: '30px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ margin: 0, color: '#fff' }}>Anstehende Dienstbesprechungen</h3>
            {isManagementOrHR && (
              <button style={{ background: '#6366f1', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} /> Neues Meeting ansetzen
              </button>
            )}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>Hier erscheinen alle Termine und Versammlungen.</p>
        </div>
      )}
    </main>
  );
}
