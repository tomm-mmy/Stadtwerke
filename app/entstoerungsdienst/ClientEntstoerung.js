'use client';

import { useState } from 'react';
import { 
  Zap, 
  ShieldAlert, 
  BookOpen, 
  Wrench, 
  Activity, 
  Flame, 
  Wifi, 
  FileText, 
  CheckCircle2, 
  Lock,
  AlertTriangle,
  HardHat
} from 'lucide-react';
import styles from '../mitarbeiter/mitarbeiter-dashboard.module.css';

export default function ClientEntstoerung({ user, isManagementOrLeader }) {
  const [activeTab, setActiveTab] = useState('anleitungen');
  const [einsatzMeldung, setEinsatzMeldung] = useState('');
  const [statusMsg, setStatusMsg] = useState('');

  const handleStörungMelden = (e) => {
    e.preventDefault();
    if (!einsatzMeldung.trim()) return;
    setStatusMsg('Einsatzprotokoll erfolgreich an die Leitstelle übermittelt!');
    setEinsatzMeldung('');
    setTimeout(() => setStatusMsg(''), 4000);
  };

  return (
    <main className={styles.pageContainer} style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
      
      {/* Header */}
      <div className="hero-section" style={{ textAlign: 'left', padding: '2rem', marginBottom: '2rem', background: 'linear-gradient(135deg, #0f172a, #1e1b4b)', border: '1px solid #312e81', borderRadius: '20px' }}>
        <div className="hero-badge" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: 'rgba(234, 179, 8, 0.15)', color: '#facc15', padding: '4px 10px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 'bold' }}>
          <Zap size={16} /> 24/7 Notfall- & Krisenreaktionszentrum
        </div>
        <h1 style={{ fontSize: '2.2rem', margin: '0.5rem 0', color: '#fff' }}>Entstördienst Command Center</h1>
        <p style={{ margin: 0, color: '#94a3b8' }}>
          Eingeloggt als: <strong style={{ color: '#38bdf8' }}>{user?.username}</strong> | Status: <strong style={{ color: '#22c55e' }}>🟢 Einsatzbereit</strong> {isManagementOrLeader && <span style={{ background: 'rgba(234,179,8,0.2)', color: '#facc15', padding: '2px 8px', borderRadius: '6px', fontSize: '0.8rem', marginLeft: '10px' }}>⚡ Abteilungsleitung / Einsatzleiter Rechte aktiv</span>}
        </p>
      </div>

      {statusMsg && (
        <div style={{ background: 'rgba(34,197,94,0.15)', border: '1px solid #22c55e', padding: '1rem', borderRadius: '12px', color: '#4ade80', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <CheckCircle2 size={20} /> {statusMsg}
        </div>
      )}

      {/* Navigation Tabs */}
      <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
        <button 
          onClick={() => setActiveTab('anleitungen')}
          style={{ background: activeTab === 'anleitungen' ? '#38bdf8' : '#0f172a', color: activeTab === 'anleitungen' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <BookOpen size={18} /> Technische Anleitungen
        </button>
        <button 
          onClick={() => setActiveTab('ausruestung')}
          style={{ background: activeTab === 'ausruestung' ? '#38bdf8' : '#0f172a', color: activeTab === 'ausruestung' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Wrench size={18} /> Kleidung & Werkzeug
        </button>
        <button 
          onClick={() => setActiveTab('erdung')}
          style={{ background: activeTab === 'erdung' ? '#38bdf8' : '#0f172a', color: activeTab === 'erdung' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <Activity size={18} /> Erdung & Sicherheit
        </button>
        <button 
          onClick={() => setActiveTab('regelwerk')}
          style={{ background: activeTab === 'regelwerk' ? '#ef4444' : '#0f172a', color: activeTab === 'regelwerk' ? '#fff' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ShieldAlert size={18} /> Extra Regelwerk
        </button>
        <button 
          onClick={() => setActiveTab('einsatz')}
          style={{ background: activeTab === 'einsatz' ? '#38bdf8' : '#0f172a', color: activeTab === 'einsatz' ? '#070b14' : '#f8fafc', border: '1px solid #1e293b', padding: '10px 16px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <FileText size={18} /> Schnellmeldung
        </button>
      </div>

      {/* TAB 1: TECHNISCHE ANLEITUNGEN (Strom, Gas, Netzwerk) */}
      {activeTab === 'anleitungen' && (
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
            <h2 style={{ color: '#38bdf8', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Zap size={22} /> Stromnetz-Entstörung (Hoch- & Niederspannung)</h2>
            <ol style={{ color: '#cbd5e1', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
              <li><strong>Lageerkundung & Eigensicherung:</strong> Absicherung der Einsatzstelle mit Warnleuten und Absperrband im Radius von mindestens 15 Metern.</li>
              <li><strong>Freischalten:</strong> Hauptverteiler oder Trafo-Station über die Netzzentrale in Absprache mit dem Einsatzleiter stromlos schalten (3-polig trennen).</li>
              <li><strong>Spannungsfreiheit feststellen:</strong> Mit dem zweipoligen Spannungsprüfer an allen Phasen prüfen.</li>
              <li><strong>Erden und Kurzschließen:</strong> Erforderliche Erdungspeitschen anbringen (siehe Reiter „Erdung“).</li>
              <li><strong>Reparatur / Austausch:</strong> Defekte Sicherungen, beschädigte Erdkabel oder Schaltelemente fachgerecht instand setzen.</li>
            </ol>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
            <h2 style={{ color: '#f97316', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Flame size={22} /> Gasversorgung & Leckage-Management</h2>
            <ol style={{ color: '#cbd5e1', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
              <li><strong>Gasaustritt / Geruch:</strong> Sofortiger Zündquellen-Stopp! Keine elektrischen Schalter betätigen, keine Funkgeräte im Gefahrenbereich nutzen.</li>
              <li><strong>Absperren:</strong> Hauptschieber der betroffenen Sektion sofort schließen.</li>
              <li><strong>Belüftung:</strong> Gebäude oder Schächte natürlich belüften (Türen und Fenster öffnen).</li>
              <li><strong>Messung:</strong> Mit dem Ex-Meter kontinuierlich die Gaskonzentration in der Umgebung überwachen.</li>
              <li><strong>Freigabe:</strong> Erst nach Unterschreitung der Unteren Explosionsgrenze (UEG) Reparaturarbeiten einleiten.</li>
            </ol>
          </div>

          <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
            <h2 style={{ color: '#a855f7', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Wifi size={22} /> Glasfaser- & Telekommunikations-Netzwerke</h2>
            <ol style={{ color: '#cbd5e1', lineHeight: '1.6', paddingLeft: '1.2rem' }}>
              <li><strong>Trassen-Ortung:</strong> Kabelfehler mittels OTDR-Messgerät und Kabelfinder präzise einmessen.</li>
              <li><strong>Spleißarbeiten:</strong> Beschädigte LWL-Adern im Spleißfahrzeug unter staubfreien Bedingungen neu absetzen und verschmelzen.</li>
              <li><strong>Dokumentation:</strong> Dämpfungswerte protokollieren und an die Zentrale melden.</li>
            </ol>
          </div>
        </div>
      )}

      {/* TAB 2: KLEIDUNG & WERKZEUG */}
      {activeTab === 'ausruestung' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><HardHat size={22} /> Vorschriftsmäßige Schutzkleidung & Ausrüstung</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Ohne die vollständige, korrekte Ausrüstung ist das Betreten von Einsatzorten strengstens untersagt.</p>
          
          <div style={{ display: 'grid', mdTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <div style={{ background: '#070b14', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🦺 Persönliche Schutzausrüstung (PSA)</h3>
              <ul style={{ color: '#cbd5e1', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                <li>Warnschutzkleidung Klasse 3 (Fluoreszierend mit Reflexstreifen)</li>
                <li>Sicherheitsschuhe S3 mit durchtrittsicherer Sohle und Stahlkappe</li>
                <li>Schutzhelm mit Kinnriemen (EN 397)</li>
                <li>Lichtbogengeprüfte Schutzhandschuhe & Gesichtsschutzschild bei Arbeiten an aktiven Anlagen</li>
                <li>Gaswarngerät (Multigaswarngerät am Gürtel mitzuführen)</li>
              </ul>
            </div>

            <div style={{ background: '#070b14', padding: '1rem', borderRadius: '12px', border: '1px solid #1e293b' }}>
              <h3 style={{ color: '#38bdf8', marginTop: 0 }}>🛠️ Standard-Werkzeugsatz</h3>
              <ul style={{ color: '#cbd5e1', margin: 0, paddingLeft: '1.2rem', lineHeight: '1.6' }}>
                <li>Vollisolierte VDE-Schraubendreher (bis 1000V geprüft)</li>
                <li>Zweipoliger Spannungsprüfer (Duspol)</li>
                <li>Rohr- und Gasschieberschlüssel</li>
                <li>Ex-geschützte Handleuchten</li>
                <li>Absperrmaterial (Pylonen, Flatterband, Hinweisschilder)</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: ERDUNG & SICHERHEIT */}
      {activeTab === 'erdung' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><Activity size={22} /> Erdung & Potentialausgleich</h2>
          <p style={{ color: '#94a3b8', lineHeight: '1.6' }}>
            Die Erdung ist das wichtigste Element im Entstördienst, um lebensgefährliche Stromschläge durch Rückeinspeisung oder kapazitive Aufladung zu verhindern.
          </p>
          <div style={{ background: 'rgba(234, 179, 8, 0.1)', border: '1px solid rgba(234, 179, 8, 0.3)', padding: '1.25rem', borderRadius: '12px', color: '#fef08a', marginTop: '1rem' }}>
            <strong>Wichtiger Grundsatz:</strong> Immer zuerst an die Erde anschließen und erst danach an den aktiven Leiter! Beim Abbauen genau umgekehrt vorgehen (erst vom Leiter lösen, dann von der Erde trennen).
          </div>
        </div>
      )}

      {/* TAB 4: EXTRA REGELWERK */}
      {activeTab === 'regelwerk' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#ef4444', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}><ShieldAlert size={22} /> Extra Regelwerk für den Entstördienst</h2>
          <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Dieses Regelwerk gilt verbindlich für alle Einsatzkräfte im Entstörungsdienst der Stadtwerke Neubrücken.</p>
          
          <div style={{ display: 'grid', gap: '1rem' }}>
            <div style={{ background: '#070b14', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <h4 style={{ color: '#f87171', margin: '0 0 4px 0' }}>1. Absolute Anweisungsbindung</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>Den Anweisungen der Abteilungsleitung und des Einsatzleiters (`1523752308813598820`) ist im Einsatzfall bedingungslos Folge zu leisten.</p>
            </div>
            <div style={{ background: '#070b14', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <h4 style={{ color: '#f87171', margin: '0 0 4px 0' }}>2. Funkdisziplin & Dokumentation</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>Jeder Eintreff- und Statuswechsel am Einsatzort muss unverzüglich über Funk oder das Portal gemeldet werden.</p>
            </div>
            <div style={{ background: '#070b14', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(239,68,68,0.3)' }}>
              <h4 style={{ color: '#f87171', margin: '0 0 4px 0' }}>3. Alkoholkonsum- & Substanzenverbot</h4>
              <p style={{ color: '#cbd5e1', margin: 0, fontSize: '0.9rem' }}>Null Toleranz bei Alarmbereitschaft und im Dienst. Verstöße führen zum sofortigen Ausschluss und Entzug aller Berechtigungen.</p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SCHNELLMELDUNG */}
      {activeTab === 'einsatz' && (
        <div style={{ background: '#0f172a', border: '1px solid #1e293b', borderRadius: '20px', padding: '1.75rem' }}>
          <h2 style={{ color: '#fff', marginTop: 0 }}>Einsatz-Schnellmeldung absetzen</h2>
          <form onSubmit={handleStörungMelden} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
            <textarea 
              rows={4} 
              value={einsatzMeldung} 
              onChange={(e) => setEinsatzMeldung(e.target.value)} 
              placeholder="Ort, Art der Störung (Strom/Gas/Netzwerk) und aktueller Status..." 
              required 
              className={styles.modalInput} 
              style={{ resize: 'none' }} 
            />
            <button type="submit" className={styles.modalSubmitBtn} style={{ width: 'auto', padding: '10px 20px', background: '#38bdf8', color: '#070b14', fontWeight: 'bold', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
              Meldung an Leitstelle senden
            </button>
          </form>
        </div>
      )}

    </main>
  );
}
