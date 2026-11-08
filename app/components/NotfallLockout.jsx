'use client';

import { ShieldAlert, Lock } from 'lucide-react';

export default function NotfallLockout() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{
        background: 'linear-gradient(160deg, #18090a 0%, #0d0405 100%)',
        border: '1px solid rgba(239, 68, 68, 0.4)',
        boxShadow: '0 20px 50px rgba(239, 68, 68, 0.2)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        maxWidth: '520px',
        width: '100%',
        textAlign: 'center'
      }}>
        <div style={{
          background: 'rgba(239, 68, 68, 0.15)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          width: '70px',
          height: '70px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: '#f87171'
        }}>
          <ShieldAlert size={38} />
        </div>

        <h1 style={{ color: '#fff', fontSize: '1.75rem', margin: '0 0 0.75rem 0', fontWeight: '800' }}>
          Zugriff temporär gesperrt
        </h1>

        <p style={{ color: '#fca5a5', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 2rem 0' }}>
          Das System der Stadtwerke Neubrücken befindet sich aktuell in einem unvorhergesehenen Notbetrieb. Eine Anmeldung sowie der Zugriff auf die Plattform sind derzeit deaktiviert.
        </p>

        <div style={{
          background: 'rgba(0,0,0,0.4)',
          border: '1px solid #271315',
          borderRadius: '12px',
          padding: '1rem',
          color: '#991b1b',
          fontSize: '0.85rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          <Lock size={16} /> Login für reguläre Nutzer deaktiviert
        </div>
      </div>
    </div>
  );
}
