import Link from 'next/link';
import { ShieldAlert, ArrowLeft, MessageSquare, CheckCircle } from 'lucide-react';

export default function Unauthorized() {
  return (
    <main className="page-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '80vh' }}>
      <div style={{
        background: 'linear-gradient(145deg, #0f172a, #0b1120)',
        border: '1px solid #1e293b',
        borderRadius: '24px',
        padding: '3rem 2rem',
        textAlign: 'center',
        maxWidth: '540px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)'
      }}>
        <div style={{
          width: '64px',
          height: '64px',
          background: 'rgba(239, 68, 68, 0.12)',
          color: '#ef4444',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: '1px solid rgba(239, 68, 68, 0.25)'
        }}>
          <ShieldAlert size={32} />
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', margin: '0 0 0.75rem 0' }}>
          Zugriff verweigert
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 1.5rem 0' }}>
          Du bist noch nicht auf dem Discord Server der Stadtwerke Neubrücken verifiziert oder besitzt nicht die nötige Freigabe (Rolle: <code style={{ color: '#38bdf8', background: 'rgba(56,189,248,0.1)', padding: '2px 6px', borderRadius: '6px' }}>1490338777779011706</code>).
        </p>

        <div style={{ background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.15)', borderRadius: '16px', padding: '1.25rem', marginBottom: '2rem', textAlign: 'left' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={16} /> So erhältst du Zugriff:
          </div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.5' }}>
            <li>Tritt unserem Discord-Server bei.</li>
            <li>Verifriere dich im entsprechenden Channel.</li>
            <li>Melde dich danach erneut auf dieser Website an.</li>
          </ol>
        </div>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a 
            href="https://discord.gg/7GUAC5p9et" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{
              background: '#5865F2',
              color: '#fff',
              padding: '10px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)'
            }}
          >
            <MessageSquare size={16} /> Zum Discord Server
          </a>

          <Link 
            href="/" 
            style={{
              background: '#1e293b',
              color: '#f8fafc',
              padding: '10px 20px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #334155'
            }}
          >
            <ArrowLeft size={16} /> Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
