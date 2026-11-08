'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Users, Sliders, Radio, FileText, ArrowLeft, CheckCircle2 } from 'lucide-react';

// Import der einzelnen Modal-Dateien
import SchrankeModal from './modals/SchrankeModal';
import AlarmModal from './modals/AlarmModal';
import DienstplanModal from './modals/DienstplanModal';
import BerichtModal from './modals/BerichtModal';

export default function MitarbeiterDashboard() {
  const [activeModal, setActiveModal] = useState(null);
  const [formStatus, setFormStatus] = useState('');

  const handleActionSubmit = (e) => {
    e.preventDefault();
    setFormStatus('Aktion erfolgreich ausgeführt!');
    setTimeout(() => {
      setFormStatus('');
      setActiveModal(null);
    }, 2000);
  };

  return (
    <main className="page-container">
      <div className="hero-section" style={{ padding: '2rem 1.5rem', marginBottom: '2.5rem' }}>
        <div className="hero-badge">
          <Shield size={16} /> Interne Betriebsleitsstelle & Verwaltung
        </div>
        <h1>Mitarbeiter-Dashboard</h1>
        <p className="hero-subtitle">
          Exklusiver Bereich für verifiziertes Personal der Stadtwerke Neubrücken.
        </p>
      </div>

      <div className="section-container">
        <div className="section-header">
          <h2>Schnellzugriff & Steuerungen</h2>
          <p>Wählen Sie eine Funktion aus, um das entsprechende Modul zu öffnen</p>
        </div>

        <div className="departments-grid">
          <button onClick={() => setActiveModal('schranke')} className="dept-card" style={{ cursor: 'pointer', textAlign: 'left' }}>
            <div className="dept-card-header">
              <div className="card-icon cyan"><Sliders size={20} /></div>
              <span className="badge-alert" style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', borderColor: 'rgba(34,197,94,0.3)' }}>Aktiv</span>
            </div>
            <h3>Schranken & Zufahrt</h3>
            <p>Zufahrtskontrolle zum Betriebshof und Haupttor steuern.</p>
            <div className="dept-link"><span>Konsole öffnen</span> &rarr;</div>
          </button>

          <button onClick={() => setActiveModal('alarm')} className="dept-card" style={{ cursor: 'pointer', textAlign: 'left' }}>
            <div className="dept-card-header">
              <div className="card-icon purple"><Radio size={20} /></div>
              <span className="badge-alert">Notfall</span>
            </div>
            <h3>Leitstellen-Alarm</h3>
            <p>Prioritäts-Signal über Störungen im Netzgebiet senden.</p>
            <div className="dept-link"><span>Alarm auslösen</span> &rarr;</div>
          </button>

          <button onClick={() => setActiveModal('dienstplan')} className="dept-card" style={{ cursor: 'pointer', textAlign: 'left' }}>
            <div className="dept-card-header">
              <div className="card-icon blue"><Users size={20} /></div>
            </div>
            <h3>Schichtdienst eintragen</h3>
            <p>Bereitschaftsdienste verwalten und eintragen.</p>
            <div className="dept-link"><span>Dienstplan bearbeiten</span> &rarr;</div>
          </button>

          <button onClick={() => setActiveModal('bericht')} className="dept-card" style={{ cursor: 'pointer', textAlign: 'left' }}>
            <div className="dept-card-header">
              <div className="card-icon green"><FileText size={20} /></div>
            </div>
            <h3>Einsatzbericht erfassen</h3>
            <p>Protokoll für beendete Einsatzfahrten erstellen.</p>
            <div className="dept-link"><span>Bericht schreiben</span> &rarr;</div>
          </button>
        </div>
      </div>

      <div style={{ marginTop: '2rem' }}>
        <Link href="/" className="dept-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeft size={16} /> Zurück zur Startseite
        </Link>
      </div>

      {/* Die einzelnen Modals als eigene Komponenten */}
      <SchrankeModal isOpen={activeModal === 'schranke'} onClose={() => setActiveModal(null)} onSubmit={handleActionSubmit} />
      <AlarmModal isOpen={activeModal === 'alarm'} onClose={() => setActiveModal(null)} onSubmit={handleActionSubmit} />
      <DienstplanModal isOpen={activeModal === 'dienstplan'} onClose={() => setActiveModal(null)} onSubmit={handleActionSubmit} />
      <BerichtModal isOpen={activeModal === 'bericht'} onClose={() => setActiveModal(null)} onSubmit={handleActionSubmit} />

      {/* Erfolgs-Popup */}
      {formStatus && (
        <div className="modal-overlay">
          <div className="modal-box" style={{ textAlign: 'center', padding: '2rem' }}>
            <CheckCircle2 size={48} color="#22c55e" style={{ margin: '0 auto 1rem auto' }} />
            <h3 style={{ color: '#fff', marginBottom: '0.5rem' }}>Erfolgreich!</h3>
            <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>{formStatus}</p>
          </div>
        </div>
      )}
    </main>
  );
}
