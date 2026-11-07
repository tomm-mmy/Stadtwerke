export default function Unauthorized() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#0f172a', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif' }}>
      <h1 style={{ color: '#ef4444' }}>Zugriff verweigert</h1>
      <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
        Du bist nicht Mitglied auf dem Discord-Server der Stadtwerke Neubrücken.
      </p>
      <a href="/" style={{ color: '#3b82f6', marginTop: '2rem' }}>Zurück zur Hauptseite</a>
    </main>
  );
}
