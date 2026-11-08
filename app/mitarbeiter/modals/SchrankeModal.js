'use client';
import { Sliders, X } from 'lucide-react';

export default function SchrankeModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="modal-close-btn"><X size={18} /></button>
        <h3 className="modal-title">
          <Sliders size={22} color="#38bdf8" /> Betriebshof-Schranke steuern
        </h3>
        <p className="modal-desc">Wählen Sie den gewünschten Zustand für das Haupttor / die automatische Zufahrt.</p>
        
        <form onSubmit={onSubmit} className="modal-form">
          <select className="modal-input">
            <option>Haupttor: Öffnen (Daueroffen)</option>
            <option>Haupttor: Schließen & Verriegeln</option>
            <option>Automatik-Modus (Sensorsteuerung)</option>
          </select>
          <button type="submit" className="btn-discord-login" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
            Befehl an Tor-Steuerung senden
          </button>
        </form>
      </div>
    </div>
  );
}
