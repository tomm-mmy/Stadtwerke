'use client';
import { useState } from 'react';
import { FileText, X } from 'lucide-react';
import styles from '../mitarbeiter-dashboard.module.css';

export default function BerichtModal({ isOpen, onClose, user }) {
  const [ort, setOrt] = useState('');
  const [details, setDetails] = useState('');
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Übermittle Bericht an Leitstelle...');

    // Sendet den Post an den Kanal 1568953171643072622
    try {
      await fetch('/api/discord/post-bericht', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: '1568953171643072622',
          username: user?.username || 'Leitung / Personal',
          ort: ort,
          details: details
        })
      });
      setStatus('Einsatzbericht erfolgreich als Post erstellt!');
      setTimeout(() => {
        setStatus('');
        onClose();
      }, 1500);
    } catch (err) {
      setStatus('Bericht eingereicht!');
      setTimeout(() => { setStatus(''); onClose(); }, 1500);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.modalCloseBtn}><X size={18} /></button>
        <h3 className={styles.modalTitle}>
          <FileText size={22} color="#4ade80" /> Einsatzbericht erfassen
        </h3>
        <p className={styles.modalDesc}>Dokumentiere den Vorfall. Dieser wird als Post im Archiv-Kanal veröffentlicht.</p>
        
        {status ? (
          <p style={{ color: '#22c55e', fontWeight: 'bold', textAlign: 'center' }}>{status}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <input 
              type="text" 
              placeholder="Einsatzort / Adresse" 
              value={ort} 
              onChange={(e) => setOrt(e.target.value)} 
              required 
              className={styles.modalInput} 
            />
            <textarea 
              rows={3} 
              placeholder="Details zum behobenen Schaden..." 
              value={details} 
              onChange={(e) => setDetails(e.target.value)} 
              required 
              className={styles.modalInput} 
              style={{ resize: 'none' }} 
            />
            <button type="submit" className={styles.modalSubmitBtn}>
              Bericht als Post veröffentlichen
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
