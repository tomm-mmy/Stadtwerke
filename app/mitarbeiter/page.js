import { cookies } from 'next/headers';
import Link from 'next/link';
import { Lock, LogIn, ShieldAlert } from 'lucide-react';
import ClientMitarbeiter from './ClientMitarbeiter';
import { canAccessMitarbeiter } from './utils/checkPermissions';

export default async function MitarbeiterPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      const rawValue = userCookie.value;
      const decodedValue = rawValue.includes('%') ? decodeURIComponent(rawValue) : rawValue;
      user = JSON.parse(decodedValue);
    } catch (e) {
      user = null;
    }
  }

  // 1. Nicht eingeloggt
  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #111827, #1f2937)', border: '1px solid #374151', padding: '45px', borderRadius: '24px', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', marginBottom: '20px' }}>
            <Lock size={42} />
          </div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', color: '#f8fafc' }}>Mitarbeiterbereich geschützt</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' }}>Bitte mit Discord verifizieren.</p>
          <a href="/auth/discord" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', width: '100%', boxSizing: 'border-box' }}>
            <LogIn size={18} /> Mit Discord verifizieren
          </a>
        </div>
      </div>
    );
  }

  // 2. Eingeloggt, aber keine Mitarbeiter-Rolle vorhanden
  if (!canAccessMitarbeiter(user)) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #111827, #1f2937)', border: '1px solid #374151', padding: '45px', borderRadius: '24px', textAlign: 'center', maxWidth: '450px', width: '100%' }}>
          <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', background: 'rgba(234, 179, 8, 0.1)', color: '#eab308', marginBottom: '20px' }}>
            <ShieldAlert size={42} />
          </div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', color: '#f8fafc' }}>Zugriff verweigert</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' }}>Dir fehlt die erforderliche <strong>Mitarbeiter-Rolle</strong>, um diesen Bereich zu betreten.</p>
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', background: '#1e293b', color: '#fff', padding: '12px 24px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold' }}>
            Zurück zur Startseite
          </Link>
        </div>
      </div>
    );
  }

  return <ClientMitarbeiter user={user} />;
}
