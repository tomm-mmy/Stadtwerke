import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: '#fff', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'sans-serif'
    }}>
      <h1 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Stadtwerke Neubrücken</h1>
      <p style={{ color: '#94a3b8', marginBottom: '2rem' }}>Verifizierungs- & Antragsportal</p>
      
      <a 
        href="/auth/discord" 
        style={{
          backgroundColor: '#5865F2',
          color: '#fff',
          padding: '12px 24px',
          borderRadius: '8px',
          textDecoration: 'none',
          fontWeight: 'bold',
          fontSize: '1rem',
          boxShadow: '0 4px 14px 0 rgba(88, 101, 242, 0.39)'
        }}
      >
        Mit Discord Anmelden & Verifizieren
      </a>
    </main>
  );
}
