export default function Dashboard() {
  return (
    <main className="portal-container">
      <div className="portal-card">
        <h1 style={{ color: 'var(--success)' }}>Verifiziert!</h1>
        <p>Du bist erfolgreich als Mitarbeiter/Bürger angemeldet.</p>
        
        <a href="/" className="link-subtle">
          ← Zurück zur Startseite
        </a>
      </div>
    </main>
  );
}
