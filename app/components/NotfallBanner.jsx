'use client';

import { ShieldAlert, AlertOctagon } from 'lucide-react';
import Link from 'next/link';

export default function NotfallBanner({ isFuehrung }) {
  return (
    <div style={{
      background: 'linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(127, 29, 29, 0.35) 100%)',
      border: '1px solid rgba(239, 68, 68, 0.5)',
      boxShadow: '0 8px 32px rgba(239, 68, 68, 0.15)',
      borderRadius: '16px',
      padding: '1.25rem 1.75rem',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '1rem',
      backdropFilter: 'blur(10px)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
        <div style={{
          background: 'rgba(239, 68, 68, 0.25)',
          border: '1px solid #ef4444',
          borderRadius: '12px',
          padding: '12px',
          color: '#f87171',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <AlertOctagon size={28} />
        </div>
        <div>
          <h3 style={{ margin: 0, color: '#fef2f2', fontSize: '1.2rem', fontWeight: '800', letterSpacing: '0.02em' }}>
            🚨 SYSTEM-NOTBETRIEB AKTIV
          </h3>
          <p style={{ margin: '4px 0 0 0', color: '#fca5a5', fontSize: '0.9rem' }}>
            {isFuehrung 
              ? 'Das Versorgungsnetz befindet sich im Notbetrieb. Funktionen für reguläre Nutzer sind gesperrt.' 
              : 'Aktuell sind alle operativen Systeme und Berechtigungen temporär deaktiviert.'}
          </p>
        </div>
      </div>

      {isFuehrung && (
        <Link 
          href="/fuehrungsebene" 
          style={{
            background: '#ef4444',
            color: '#ffffff',
            padding: '10px 18px',
            borderRadius: '10px',
            fontWeight: '700',
            fontSize: '0.85rem',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 14px rgba(239, 68, 68, 0.4)',
            whiteSpace: 'nowrap'
          }}
        >
          <ShieldAlert size={16} /> Leitstelle öffnen
        </Link>
      )}
    </div>
  );
}
