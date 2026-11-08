'use client';
import { Users, X } from 'lucide-react';

export default function DienstplanModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="modal-close-btn"><X size={18} /></button>
        <h3 className="modal-title">
          <Users size={22} color="#818cf8" /> Schichtdienst eintragen
        </h3>
        <p className="modal-desc">Tragen Sie sich oder Mitarbeiter für den kommenden Bereitschaftsdienst ein.</p>
        
        <form onSubmit={onSubmit} className="modal-form">
          <input type="text" placeholder="Mitarbeiter Name / ID" required className="modal-input" />
          <select className="modal-input">
            <option>Frühschicht (06:00 - 14:00 Uhr)</option>
            <option>Spätschicht (14:00 - 22:00 Uhr)</option>
            <option>Nacht- & Bereitschaftsdienst (22:00 - 06:00 Uhr)</option>
          </select>
          <button type="submit" className="btn-discord-login" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
            Schicht speichern
          </button>
        </form>
      </div>
    </div>
  );
}
