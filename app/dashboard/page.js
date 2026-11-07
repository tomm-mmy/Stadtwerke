export default function Dashboard() {
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
      <h1 style={{ color: '#22c55e', fontSize: '2rem' }}>Verifizierung erfolgreich!</h1>
      <p style={{ color: '#94a3b8', marginTop: '1rem' }}>
        Du hast dich erfolgreich bei den Stadtwerken Neubrücken autorisiert.
      </p>
      <a href="/" style={{ color: '#3b82f6', marginTop: '2rem', textDecoration: 'none' }}>
        Zurück zur Startseite
      </a>
    </main>
  );
}
