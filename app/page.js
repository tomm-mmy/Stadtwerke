import Link from 'next/link';
import { cookies } from 'next/headers';

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  const isLoggedIn = !!userCookie;

  return (
    <div style={{ minHeight: '100vh', background: '#090d16', color: '#f8fafc', padding: '40px 20px', fontFamily: 'sans-serif' }}>
      
      {/* Hero / Willkommens-Sektion */}
      <div style={{ 
        maxWidth: '900px', 
        margin: '0 auto 50px auto', 
        background: '#111827', 
        border: '1px solid #1f2937', 
        borderRadius: '20px', 
        padding: '50px 30px', 
        textAlign: 'center',
        boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
      }}>
        <h1 style={{ fontSize: '2.8rem', fontWeight: '800', marginBottom: '20px', background: 'linear-gradient(to right, #38bdf8, #818cf8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          Stadtwerke Neubrücken
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#9ca3af', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 30px auto' }}>
          Willkommen auf dem offiziellen Portal der Stadtwerke Neubrücken. Hier koordinieren wir die städtische Infrastruktur, den Entstörungsdienst und unsere internen Fachbereiche.
        </p>

        {/* Button in der Mitte nur anzeigen, wenn NICHT eingeloggt */}
        {!isLoggedIn ? (
          <a href="/auth/discord" style={{ 
            display: 'inline-block',
            background: 'linear-gradient(135deg, #4f46e5, #6366f1)', 
            color: '#fff', 
            padding: '14px 32px', 
            borderRadius: '12px', 
            textDecoration: 'none', 
            fontWeight: 'bold',
            fontSize: '16px',
            boxShadow: '0 8px 20px rgba(79, 70, 229, 0.4)',
            transition: 'transform 0.2s'
          }}>
            Mit Discord Verifizieren & Einloggen
          </a>
        ) : (
          <div style={{ 
            display: 'inline-block',
            background: '#1e293b',
            border: '1px solid #334155',
            color: '#22c55e',
            padding: '12px 24px',
            borderRadius: '12px',
            fontWeight: '600',
            fontSize: '15px'
          }}>
            ✓ Du bist erfolgreich angemeldet und verifiziert.
          </div>
        )}
      </div>

      {/* Info-Bereich: Aufgaben der Stadtwerke & Discord Widget Grid */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
        
        {/* Linke Spalte: Aufgaben & Infos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#38bdf8', marginBottom: '12px' }}>⚡ Unsere Kernaufgaben</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Die Stadtwerke Neubrücken sorgen rund um die Uhr für eine stabile Versorgung und Instandhaltung der städtischen Systeme. Dazu gehören Strom-, Wasser- und Gasnetze sowie der technische Innendienst.
            </p>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#f59e0b', marginBottom: '12px' }}>🚨 Entstörungsdienst 24/7</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Bei Notfällen, Rohrbrüchen oder Stromausfällen im Stadtgebiet rückt unser Entstörungsdienst sofort aus, um Schäden zu minimieren und die Sicherheit wiederherzustellen.
            </p>
          </div>

          <div style={{ background: '#111827', border: '1px solid #1f2937', borderRadius: '16px', padding: '25px' }}>
            <h3 style={{ fontSize: '1.3rem', color: '#10b981', marginBottom: '12px' }}>🛡️ Sicherheit & Rollen</h3>
            <p style={{ color: '#9ca3af', fontSize: '0.95rem', lineHeight: '1.5' }}>
              Der Zugriff auf interne Abteilungen (Mitarbeiter, Führungsebene, Ausbilder) ist streng geschützt und erfordert eine gültige Verifizierung sowie die entsprechenden Rollen auf unserem Discord-Server.
            </p>
          </div>
        </div>

        {/* Rechte Spalte: Schönes Discord Widget Fenster */}
        <div style={{ 
          background: '#111827', 
          border: '1px solid #1f2937', 
          borderRadius: '16px', 
          padding: '25px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: '0 10px 30px rgba(0,0,0,0.4)'
        }}>
          <h3 style={{ fontSize: '1.3rem', color: '#fff', marginBottom: '15px', alignSelf: 'flex-start' }}>💬 Community & Discord</h3>
          <p style={{ color: '#9ca3af', fontSize: '0.9rem', marginBottom: '20px', alignSelf: 'flex-start' }}>
            Tritt unserem offiziellen Discord-Server bei, um dich zu vernetzen und auf dem Laufenden zu bleiben.
          </p>
          
          <div style={{ width: '100%', borderRadius: '12px', overflow: 'hidden', border: '1px solid #374151', background: '#000' }}>
            <iframe 
              src="https://discord.com/widget?id=1490307263909335102&theme=dark" 
              width="100%" 
              height="450" 
              allowTransparency="true" 
              frameBorder="0" 
              sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"
              title="Discord Server Widget"
            ></iframe>
          </div>
        </div>

      </div>
    </div>
  );
}
