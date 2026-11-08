import Link from 'next/link';
import { cookies } from 'next/headers';
import { 
  Zap, 
  Building2, 
  Users, 
  GraduationCap, 
  Shield, 
  ArrowRight,
  Clock,
  Activity,
  PhoneCall,
  ShieldCheck
} from 'lucide-react';
import NotfallBanner from './components/NotfallBanner';
import NotfallLockout from './components/NotfallLockout';
import { canAccessFuehrung } from './mitarbeiter/utils/checkPermissions';

async function getSystemState() {
  try {
    return global.isMaintenanceMode || false;
  } catch (err) {
    return false;
  }
}

export default async function Home() {
  const cookieStore = await cookies();
  const userCookie = cookieStore.get('discord_user');
  
  let user = null;
  if (userCookie) {
    try {
      user = JSON.parse(userCookie.value);
    } catch (e) {}
  }

  const isMaintenance = await getSystemState();
  const isFuehrung = user ? canAccessFuehrung(user) : false;

  // 1. Nicht eingeloggt + Notbetrieb -> Sofort roter Notfall-Bildschirm für Gäste
  if (isMaintenance && !user) {
    return <NotfallLockout />;
  }

  // 2. Eingeloggt als normaler User (keine Führung) während Notbetrieb -> Komplett gesperrt
  const isLockedForUser = isMaintenance && user && !isFuehrung;

  return (
    <main className="page-container">
      {/* 3. Fettes Notfall-Banner ganz oben */}
      {isMaintenance && <NotfallBanner isFuehrung={isFuehrung} />}

      {/* 4. Gesamter Seiteninhalt wird im Notbetrieb für normale User gesperrt */}
      <div style={{
        opacity: isLockedForUser ? 0.35 : 1,
        pointerEvents: isLockedForUser ? 'none' : 'auto',
        userSelect: isLockedForUser ? 'none' : 'auto',
        transition: 'opacity 0.3s ease'
      }}>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-badge">
            <Activity size={16} /> 24/7 Infrastruktur- & Versorgungsnetz Neubrücken
          </div>
          <h1>Stadtwerke Neubrücken</h1>
          <p className="hero-subtitle">
            Wir sichern die zuverlässige Versorgung mit Strom, Wasser, Gas und Glasfaser im gesamten Stadtgebiet. Rund um die Uhr für Neubrücken im Einsatz.
          </p>

          {/* Quick Stats Grid */}
          <div className="hero-stats">
            <div className="stat-card">
              <span className="stat-value">24/7</span>
              <span className="stat-label">Entstörungsdienst</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">&lt; 15 Min</span>
              <span className="stat-label">Durchschn. Ausrückzeit</span>
            </div>
            <div className="stat-card">
              <span className="stat-value">100%</span>
              <span className="stat-label">Versorgungssicherheit</span>
            </div>
          </div>
        </section>

        {/* Internes Portal & Unternehmensbereiche */}
        <section className="section-container">
          <div className="section-header">
            <div>
              <h2>Unternehmensbereiche</h2>
              <p>Interne Verwaltungs- und Dienstbereiche für Mitarbeiter</p>
            </div>
          </div>

          <div className="departments-grid">
            <Link href="/entstoerungsdienst" className="dept-card">
              <div className="dept-card-header">
                <div className="card-icon cyan"><Zap size={20} /></div>
                <span className="badge-alert">24/7 Aktiv</span>
              </div>
              <h3>Entstörungsdienst</h3>
              <p>Bereitschaftsdienst, Schadensmeldungen und Einsätze im Netzgebiet.</p>
              <div className="dept-link">
                <span>Bereich ansehen</span> <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/fuehrungsebene" className="dept-card">
              <div className="dept-card-header">
                <div className="card-icon purple"><Building2 size={20} /></div>
              </div>
              <h3>Führungsebene</h3>
              <p>Geschäftsführung, strategische Leitung und administrative Freigaben.</p>
              <div className="dept-link">
                <span>Bereich ansehen</span> <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/personal" className="dept-card">
              <div className="dept-card-header">
                <div className="card-icon blue"><Users size={20} /></div>
              </div>
              <h3>Personalabteilung</h3>
              <p>HR-Management, Richtlinien, Bewerbungsprozesse und Betreuung.</p>
              <div className="dept-link">
                <span>Bereich ansehen</span> <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/ausbilder" className="dept-card">
              <div className="dept-card-header">
                <div className="card-icon green"><GraduationCap size={20} /></div>
              </div>
              <h3>Ausbildung & Lehre</h3>
              <p>Einarbeitung, Schulungsunterlagen und Ausbildungsfortschritt.</p>
              <div className="dept-link">
                <span>Bereich ansehen</span> <ArrowRight size={14} />
              </div>
            </Link>

            <Link href="/mitarbeiter" className="dept-card">
              <div className="dept-card-header">
                <div className="card-icon slate"><Shield size={20} /></div>
              </div>
              <h3>Mitarbeiter-Portal</h3>
              <p>Dienstpläne, interne Berichte und Ankündigungen fürs Kollegium.</p>
              <div className="dept-link">
                <span>Bereich ansehen</span> <ArrowRight size={14} />
              </div>
            </Link>
          </div>
        </section>

        {/* Bürger-Infobereich / FAQ */}
        <section className="section-container info-section">
          <div className="section-header center">
            <h2>Häufige Fragen & Bürgerinformationen</h2>
            <p>Wichtige Fakten rund um den Service der Stadtwerke Neubrücken</p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon"><Zap size={22} /></div>
              <div className="faq-body">
                <h3>Was ist der Entstörungsdienst?</h3>
                <p>
                  Der Entstörungsdienst ist unsere rund um die Uhr besetzte Notfalleinheit. Er rückt bei akuten Beschädigungen an Leitungen, Rohrbürsten, Gasaustritten, Stromausfällen oder Wasserrohrbrüchen im Stadtgebiet aus, um Gefahren abzuwehren und die Netzstabilität wiederherzustellen.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><Clock size={22} /></div>
              <div className="faq-body">
                <h3>Wann kommen wir zum Einsatz?</h3>
                <p>
                  Bei Notfällen (z. B. Gasgeruch, Rohrbruch) rückt der Entstörungsdienst sofort aus und ist in der Regel innerhalb von 10 bis 20 Minuten vor Ort. Geplante Wartungs- oder Anschlussarbeiten finden regulär während unserer Dienstzeiten (Mo–Fr: 07:00 – 17:00 Uhr) statt.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><ShieldCheck size={22} /></div>
              <div className="faq-body">
                <h3>Was bedeutet „Wir halten die Stadt am laufen“?</h3>
                <p>
                  Dieser Spruch steht für unsere Verantwortung gegenüber allen Bürgern in Neubrücken. Ob Strom im Haushalt, fließendes Trinkwasser, funktionierende Ampelanlagen oder Wärme im Winter – ohne die Arbeit der Stadtwerke würde das öffentliche und private Leben stillstehen.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><PhoneCall size={22} /></div>
              <div className="faq-body">
                <h3>Wie melde ich eine Störung?</h3>
                <p>
                  Akute Störungen im öffentlichen Netz können direkt über unseren Discord-Support-Kanal oder telefonisch bei der Notfall-Leitstelle gemeldet werden. Bei Notfällen am eigenen Zähler schalten Sie bitte erst die Hauptsicherung oder den Haupthahn ab.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
