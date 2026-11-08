'use client';

import { Clock, Info, ShieldAlert } from 'lucide-react';

export default function DienstplanSection() {
  const empfohleneZeiten = [
    { tag: 'Montag – Freitag', zeit: '16:00 – 22:00 Uhr', status: 'Haupt-Dienstzeit (Stark frequentiert)', auslastung: 'Hoch' },
    { tag: 'Samstag & Sonntag', zeit: '14:00 – 00:00 Uhr', status: 'Wochenend-Bereitschaft', auslastung: 'Sehr Hoch' },
    { tag: 'Nachtbereitschaft', zeit: '00:00 – 06:00 Uhr', status: 'On-Call / Rufbereitschaft bei Notfällen', auslastung: 'Flexibel' },
  ];

  return (
    <div style={{ marginTop: '2rem' }}>
      <div style={{
        background: 'rgba(56, 189, 248, 0.05)',
        border: '1px solid rgba(56, 189, 248, 0.2)',
        borderRadius: '16px',
        padding: '1.25rem',
        marginBottom: '1.5rem',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px'
      }}>
        <Info size={22} color="#38bdf8" style={{ flexShrink: 0, marginTop: '2px' }} />
        <div>
          <h4 style={{ margin: '0 0 4px 0', color: '#38bdf8', fontSize: '0.95rem' }}>Orientierungs-Dienstplan (Keine Pflicht)</h4>
          <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.4' }}>
            Dieser Plan dient der Personalleitung und Führung lediglich als Richtwert für eine optimale Netzabdeckung. Es besteht **keine Schichtpflicht**. Die Zeiten zeigen an, wann am meisten Notfälle im Netzgebiet entstehen.
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gap: '1rem' }}>
        {empfohleneZeiten.map((item, idx) => (
          <div key={idx} style={{
            background: 'linear-gradient(160deg, #0f172a 0%, #0b1120 100%)',
            border: '1px solid #1e293b',
            borderRadius: '14px',
            padding: '1.25rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#fff', fontWeight: '700', fontSize: '1rem' }}>
                <Clock size={16} color="#38bdf8" /> {item.tag}
              </div>
              <div style={{ color: '#94a3b8', fontSize: '0.85rem', marginTop: '4px' }}>
                Empfohlenes Zeitfenster: <strong style={{ color: '#f8fafc' }}>{item.zeit}</strong>
              </div>
            </div>

            <div style={{ textAlign: 'right' }}>
              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '4px 10px',
                borderRadius: '12px',
                background: 'rgba(99, 102, 241, 0.15)',
                color: '#818cf8',
                border: '1px solid rgba(99, 102, 241, 0.3)'
              }}>
                {item.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
