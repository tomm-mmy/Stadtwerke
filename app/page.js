import Link from 'next/link';
import { cookies } from 'next/headers';
import { 
  Zap, 
  Clock, 
  Activity, 
  PhoneCall, 
  ShieldCheck, 
  HelpCircle, 
  Building, 
  CheckCircle2,
  Wrench,
  Flame,
  Droplet,
  Radio
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

  // 1. Nicht eingeloggt + Notbetrieb -> Sofort roter Lockout-Bildschirm
  if (isMaintenance && !user) {
    return <NotfallLockout />;
  }

  // 2. Eingeloggt als normaler User während Notbetrieb -> Ausgegraut & Gesperrt
  const isLockedForUser = isMaintenance && user && !isFuehrung;

  return (
    <main className="page-container">
      {/* Notfall-Banner oben bei Notbetrieb */}
      {isMaintenance && <NotfallBanner isFuehrung={isFuehrung} />}

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

        {/* ÜBER UNS / UNTERNEHMENSTEXT (Ersetzt die früheren Cards) */}
        <section className="section-container">
          <div className="about-card">
            <div className="about-header">
              <Building size={24} style={{ color: '#38bdf8' }} />
              <h2>Über die Stadtwerke Neubrücken</h2>
            </div>
            <div className="about-content">
              <p>
                Die <strong>Stadtwerke Neubrücken</strong> stehen für Ausfallsicherheit, modernste Infrastruktur und unmittelbare Einsatzbereitschaft im gesamten Stadtgebiet. Als zentraler kommunaler Dienstleister betreuen wir das komplexe Versorgungsnetz aus Elektrizität, Frischwasser, Erdgas und Glasfaser-Breitband.
              </p>
              <p>
                Unser hochqualifiziertes Einsatz- und Technikpersonal ist in Schichtmodellen rund um die Uhr erreichbar, um Störungen abzufangen, Notfallreparaturen durchzuführen und geplante Instandhaltungsarbeiten fachgerecht umzusetzen. Alle internen Abläufe und Arbeitsaufträge werden digital über unsere vernetzte Leitstelle koordiniert.
              </p>
            </div>
          </div>
        </section>

        {/* BÜRGER-INFOBEREICH / ERWEITERTE FAQ SEKTION */}
        <section className="section-container info-section">
          <div className="section-header center">
            <h2>Häufige Fragen & Bürgerinformationen</h2>
            <p>Wichtige Fakten und Verhaltensregeln rund um den Service der Stadtwerke Neubrücken</p>
          </div>

          <div className="faq-grid">
            <div className="faq-card">
              <div className="faq-icon"><Zap size={22} /></div>
              <div className="faq-body">
                <h3>Was ist der Entstörungsdienst?</h3>
                <p>
                  Der Entstörungsdienst ist unsere rund um die Uhr besetzte Notfalleinheit. Er rückt bei akuten Beschädigungen an Leitungen, Gasaustritten, Stromausfällen oder Wasserrohrbrüchen im Stadtgebiet aus, um Gefahren abzuwehren und die Netzstabilität sofort wiederherzustellen.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><Clock size={22} /></div>
              <div className="faq-body">
                <h3>Wann kommen wir zum Einsatz?</h3>
                <p>
                  Bei Notfällen (z. B. Gasgeruch, Rohrbruch) rückt der Entstörungsdienst sofort aus und ist in der Regel innerhalb von 10 bis 15 Minuten vor Ort. Geplante Wartungs- oder Anschlussarbeiten finden regulär während unserer Dienstzeiten (Mo–Fr: 07:00 – 17:00 Uhr) statt.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><ShieldCheck size={22} /></div>
              <div className="faq-body">
                <h3>Was bedeutet „Wir halten die Stadt am laufen“?</h3>
                <p>
                  Dieser Spruch steht für unsere Verantwortung gegenüber allen Bürgern in Neubrücken. Ob Strom im Haushalt, fließendes Trinkwasser, funktionierende Ampelanlagen oder Wärme im Winter – ohne die Arbeit der Stadtwerke würde das öffentliche Leben stillstehen.
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

            <div className="faq-card">
              <div className="faq-icon"><Flame size={22} /></div>
              <div className="faq-body">
                <h3>Wie verhalte ich mich bei Gasgeruch im Gebäude?</h3>
                <p>
                  Verhalten Sie sich ruhig: Betätigen Sie keine Lichtschalter oder elektrischen Geräte, öffnen Sie alle Fenster, warnen Sie Nachbarn und verlassen Sie das Gebäude umgehend. Rufen Sie die Einsatzstelle von außerhalb an.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><Droplet size={22} /></div>
              <div className="faq-body">
                <h3>Wer haftet bei Schäden durch einen Wasserrohrbruch?</h3>
                <p>
                  Schäden bis zum Hauptwasserzähler fallen in die Zuständigkeit der Stadtwerke Neubrücken. Beschädigungen an privaten Leitungen hinter dem Zähler liegen in der Verantwortung des jeweiligen Eigentümers.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><Wrench size={22} /></div>
              <div className="faq-body">
                <h3>Werden geplante Abschaltungen im Voraus angekündigt?</h3>
                <p>
                  Ja, zwingend erforderliche Wartungsarbeiten am Strom- oder Wassernetz werden mindestens 48 Stunden vorher über unser Mitteilungsportal sowie im Stadtfunk bekannt gegeben.
                </p>
              </div>
            </div>

            <div className="faq-card">
              <div className="faq-icon"><Radio size={22} /></div>
              <div className="faq-body">
                <h3>Wie erfolgt die Koordination mit Feuerwehr und Polizei?</h3>
                <p>
                  Unsere Leitstelle steht in direkter Funkverbindung mit allen Notfallbehörden in Neubrücken. Bei Gebäudebränden oder Verkehrsunfällen wird der Entstörungsdienst automatisch mitdisponiert, um Anschlüsse frei zu schalten.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
