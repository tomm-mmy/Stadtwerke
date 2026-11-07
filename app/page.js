export default function Home() {
  return (
    <main className="portal-container">
      <div className="portal-card">
        <h1>Stadtwerke Neubrücken</h1>
        <p>Verifizierungs- & Antragsportal für Bürger und Mitarbeiter.</p>
        
        <a href="/auth/discord" className="btn-primary">
          Mit Discord Anmelden & Verifizieren
        </a>
      </div>
    </main>
  );
}
