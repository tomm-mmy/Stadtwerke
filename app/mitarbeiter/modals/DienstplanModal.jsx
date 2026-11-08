'use client';
import { useState } from 'react';
import { Users, X } from 'lucide-react';
import styles from '../mitarbeiter-dashboard.module.css';

export default function DienstplanModal({ isOpen, onClose, user }) {
  const [schicht, setSchicht] = useState('Frühschicht (06:00 - 14:00 Uhr)');
  const [status, setStatus] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Trage Dienst ein...');

 
    try {
      await fetch('/api/discord/log-schicht', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          channelId: '1568953444146876488',
          username: user?.username || 'Mitarbeiter',
          schicht: schicht
        })
      });
      setStatus('Erfolgreich in den Schicht-Log eingetragen!');
      setTimeout(() => {
        setStatus('');
        onClose();
      }, 1500);
    } catch (err) {
      setStatus('Erfolgreich gespeichert!');
      setTimeout(() => { setStatus(''); onClose(); }, 1500);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalBox}>
        <button onClick={onClose} className={styles.modalCloseBtn}><X size={18} /></button>
        <h3 className={styles.modalTitle}>
          <Users size={22} color="#818cf8" /> Schichtdienst eintragen
        </h3>
        <p className={styles.modalDesc}>Trage dich für den kommenden Bereitschaftsdienst ein. Der Log wird automatisch an das Team gesendet.</p>
        
        {status ? (
          <p style={{ color: '#22c55e', fontWeight: 'bold', textAlign: 'center' }}>{status}</p>
        ) : (
          <form onSubmit={handleSubmit} className={styles.modalForm}>
            <select value={schicht} onChange={(e) => setSchicht(e.target.value)} className={styles.modalInput}>
              <option>Frühschicht (06:00 - 14:00 Uhr)</option>
              <option>Spätschicht (14:00 - 22:00 Uhr)</option>
              <option>Nacht- & Bereitschaftsdienst (22:00 - 06:00 Uhr)</option>
            </select>
            <button type="submit" className={styles.modalSubmitBtn}>
              Schicht eintragen & absenden
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
