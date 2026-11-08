'use client';
import { AlertTriangle, X } from 'lucide-react';

export default function AlarmModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="modal-close-btn"><X size={18} /></button>
        <h3 className="modal-title" style={{ color: '#ef4444' }}>
          <AlertTriangle size={22} color="#f87171" /> Leitstellen-Alarm auslösen
        </h3>
        <p className="modal-desc">Geben Sie eine Kurzbeschreibung für den akuten Einsatz im Netzgebiet ein.</p>
        
        <form onSubmit={onSubmit} className="modal-form">
          <textarea rows={3} placeholder="Art der Störung (z.B. Rohrbruch Hauptstraße)..." required className="modal-input" style={{ resize: 'none' }} />
          <button type="submit" style={{ background: '#ef4444', color: '#fff', padding: '12px', borderRadius: '10px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>
            Großalarm an alle Einheiten senden
          </button>
        </form>
      </div>
    </div>
  );
}
