'use client';
import { FileText, X } from 'lucide-react';

export default function BerichtModal({ isOpen, onClose, onSubmit }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button onClick={onClose} className="modal-close-btn"><X size={18} /></button>
        <h3 className="modal-title">
          <FileText size={22} color="#4ade80" /> Einsatzbericht erfassen
        </h3>
        <p className="modal-desc">Dokumentieren Sie den Vorfall für die Führungsebene und das Archiv.</p>
        
        <form onSubmit={onSubmit} className="modal-form">
          <input type="text" placeholder="Einsatzort / Adresse" required className="modal-input" />
          <textarea rows={3} placeholder="Details zum behobenen Schaden..." required className="modal-input" style={{ resize: 'none' }} />
          <button type="submit" className="btn-discord-login" style={{ width: '100%', border: 'none', cursor: 'pointer' }}>
            Bericht einreichen
          </button>
        </form>
      </div>
    </div>
  );
}
