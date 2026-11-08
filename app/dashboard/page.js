
import { getCurrentUser } from '../../lib/auth';
import { Lock, LogIn } from 'lucide-react';
import ClientDashboard from './ClientDashboard';

export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  // Sitzung über den Neon-Sitzungsspeicher prüfen
  const user = await getCurrentUser();

  if (!user) {
    return (
      <div
        style={{
          minHeight: '100vh',
          background: '#090d16',
          color: '#fff',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          fontFamily: 'sans-serif',
          padding: '20px'
        }}
      >
        <div
          style={{
            background: 'linear-gradient(135deg, #111827, #1f2937)',
            border: '1px solid #374151',
            padding: '45px',
            borderRadius: '24px',
            textAlign: 'center',
            boxShadow: '0 25px 50px rgba(0,0,0,0.8)',
            maxWidth: '450px',
            width: '100%'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              padding: '16px',
              borderRadius: '50%',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              marginBottom: '20px',
              border: '1px solid rgba(239, 68, 68, 0.2)'
            }}
          >
            <Lock size={42} />
          </div>

          <h2
            style={{
              marginBottom: '10px',
              fontSize: '1.8rem',
              color: '#f8fafc',
              fontWeight: '700'
            }}
          >
            Zugriff verweigert
          </h2>

          <p
            style={{
              color: '#94a3b8',
              marginBottom: '30px',
              fontSize: '0.95rem',
              lineHeight: '1.5'
            }}
          >
            Du bist nicht angemeldet oder deine Sitzung ist abgelaufen.
          </p>

          <a
            href="/auth/discord"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: '#fff',
              padding: '14px 28px',
              borderRadius: '12px',
              textDecoration: 'none',
              fontWeight: 'bold',
              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.4)',
              width: '100%',
              boxSizing: 'border-box'
            }}
          >
            <LogIn size={18} />
            Mit Discord verifizieren & einloggen
          </a>
        </div>
      </div>
    );
  }

  return <ClientDashboard user={user} />;
}
