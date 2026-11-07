import { cookies } from 'next/headers';
import ClientDashboard from './ClientDashboard';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      const rawValue = userCookie.value;
      const decodedValue = rawValue.includes('%') ? decodeURIComponent(rawValue) : rawValue;
      user = JSON.parse(decodedValue);
    } catch (e) {
      console.error('Cookie Parse Fehler:', e);
      user = null;
    }
  }

  if (!user) {
    return (
      <div style={{ minHeight: '100vh', background: '#090d16', color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '20px', fontFamily: 'sans-serif', padding: '20px' }}>
        <div style={{ background: 'linear-gradient(135deg, #111827, #1f2937)', border: '1px solid #374151', padding: '45px', borderRadius: '24px', textAlign: 'center', boxShadow: '0 25px 50px rgba(0,0,0,0.8)', maxWidth: '450px', width: '100%' }}>
          <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🔒</div>
          <h2 style={{ marginBottom: '10px', fontSize: '1.8rem', color: '#f8fafc' }}>Zugriff verweigert</h2>
          <p style={{ color: '#94a3b8', marginBottom: '30px', fontSize: '0.95rem' }}>Du bist nicht angemeldet oder die Sitzung ist abgelaufen.</p>
          <a href="/auth/discord" style={{ display: 'block', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: '#fff', padding: '14px 28px', borderRadius: '12px', textDecoration: 'none', fontWeight: 'bold', boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)' }}>
            Mit Discord verifizieren & einloggen
          </a>
        </div>
      </div>
    );
  }

  return <ClientDashboard user={user} />;
}
