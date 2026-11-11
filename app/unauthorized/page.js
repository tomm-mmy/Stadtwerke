import Link from 'next/link';
import { ShieldAlert, ArrowLeft, MessageSquare, CheckCircle, Lock } from 'lucide-react';

export default function Unauthorized() {
  return (
    <main style={{ 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '85vh',
      padding: '1rem',
      background: '#070b14'
    }}>
      <div style={{
        background: 'linear-gradient(145deg, #0f172a, #0b1120)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '24px',
        padding: '3rem 2rem',
        textAlign: 'center',
        maxWidth: '540px',
        width: '100%',
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.7), 0 0 40px rgba(239, 68, 68, 0.05)'
      }}>
        <div style={{
          width: '72px',
          height: '72px',
          background: 'rgba(239, 68, 68, 0.12)',
          color: '#ef4444',
          borderRadius: '22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          boxShadow: '0 0 20px rgba(239, 68, 68, 0.2)'
        }}>
          <ShieldAlert size={36} />
        </div>

        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '6px',
          background: 'rgba(239, 68, 68, 0.1)',
          color: '#f87171',
          padding: '4px 12px',
          borderRadius: '20px',
          fontSize: '0.75rem',
          fontWeight: '700',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          marginBottom: '1rem',
          border: '1px solid rgba(239, 68, 68, 0.2)'
        }}>
          <Lock size={12} /> Sicherheitsstufe: Geschützter Bereich
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: '800', color: '#fff', margin: '0 0 0.75rem 0' }}>
          Zugriff verweigert
        </h1>
        
        <p style={{ color: '#94a3b8', fontSize: '0.95rem', lineHeight: '1.6', margin: '0 0 1.75rem 0' }}>
          Dein Account verfügt nicht über die erforderlichen Berechtigungen oder Rollen, um diesen internen Bereich der Stadtwerke Neubrücken zu betreten.
        </p>

        <div style={{ 
          background: 'rgba(56, 189, 248, 0.04)', 
          border: '1px solid rgba(56, 189, 248, 0.12)', 
          borderRadius: '16px', 
          padding: '1.25rem', 
          marginBottom: '2rem', 
          textAlign: 'left' 
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#38bdf8', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={16} /> So erhältst du Zugriff:
          </div>
          <ol style={{ margin: 0, paddingLeft: '1.2rem', color: '#94a3b8', fontSize: '0.85rem', lineHeight: '1.6' }}>
            <li>Tritt unserem offiziellen Discord-Server bei.</li>
            <li>Lasse dich im entsprechenden Authentifizierungs-Channel verifizieren.</li>
            <li>Melde dich hier auf der Website ab und via Discord neu an.</li>
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
              padding: '11px 22px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              boxShadow: '0 4px 15px rgba(88, 101, 242, 0.4)',
              transition: 'all 0.2s ease'
            }}
          >
            <MessageSquare size={16} /> Zum Discord Server
          </a>

          <Link 
            href="/" 
            style={{
              background: '#1e293b',
              color: '#f8fafc',
              padding: '11px 22px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '0.9rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid #334155',
              transition: 'all 0.2s ease'
            }}
          >
            <ArrowLeft size={16} /> Zur Startseite
          </Link>
        </div>
      </div>
    </main>
  );
}
