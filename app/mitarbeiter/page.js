'use client';

import { useState } from 'react';
import { Shield, FileText, Calendar, CheckCircle, XCircle, Send, AlertTriangle } from 'lucide-react';

export default function MitarbeiterPage() {
  const [activeTab, setActiveTab] = useState('regelwerk');
  

  const [auftraege, setAuftraege] = useState([
    { id: 1, title: 'Netzprüfung Sektor 4', creator: 'Führungsebene (Max)', desc: 'Komplette Überprüfung der Hauptverteilerkästen in Neubrücken-Nord.', status: 'Ausstehend' },
    { id: 2, title: 'Wartung Notstromaggregat', creator: 'Personalabteilung (Sarah)', desc: 'Monatliche Testläufe und Protokollierung der Betriebsdaten.', status: 'Ausstehend' }
  ]);

  const [meetings, setMeetings] = useState([
    { id: 1, title: 'Monatsbesprechung & Sicherheitsbriefing', creator: 'Geschäftsführung', date: '12.11.2026 - 18:30 Uhr', status: 'Ausstehend' }
  ]);

  const [declineReason, setDeclineReason] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionType, setActionType] = useState(null); 

  const handleAction = (item, type, status) => {
    if (status === 'Abgelehnt' && !declineReason) {
      alert('Bitte geben Sie einen gültigen Grund für die Ablehnung an.');
      return;
    }


    console.log(`Milo Log: ${type} "${item.title}" wurde auf "${status}" gesetzt. Grund: ${declineReason || 'Keiner'}`);

    if (type === 'auftrag') {
      setAuftraege(auftraege.map(a => a.id === item.id ? { ...a, status } : a));
    } else {
      setMeetings(meetings.map(m => m.id === item.id ? { ...m, status } : m));
    }

    setSelectedItem(null);
    setDeclineReason('');
    setActionType(null);
  };

  return (
    <main className="page-container">
      <div className="hero-section">
        <div className="hero-content" style={{ textAlign: 'left', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '15px' }}>
            <div className="card-icon" style={{ margin: 0 }}><Shield size={28} /></div>
            <div>
              <h1 style={{ fontSize: '2.2rem', margin: 0 }}>Mitarbeiterportal</h1>
              <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0' }}>Interne Richtlinien, operative Aufträge und verbindliche Dienstbesprechungen.</p>
            </div>
          </div>
        </div>
      </div>

   
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px' }}>
        <button 
          onClick={() => setActiveTab('regelwerk')} 
          style={{ background: activeTab === 'regelwerk' ? 'var(--cyan)' : '#111827', color: activeTab === 'regelwerk' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} /> Dienstvorschrift & Regelwerk
        </button>
        <button 
          onClick={() => setActiveTab('auftraege')} 
          style={{ background: activeTab === 'auftraege' ? 'var(--cyan)' : '#111827', color: activeTab === 'auftraege' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle size={18} /> Aktive Aufträge
        </button>
        <button 
          onClick={() => setActiveTab('meetings')} 
          style={{ background: activeTab === 'meetings' ? 'var(--cyan)' : '#111827', color: activeTab === 'meetings' ? '#070b14' : '#fff', border: '1px solid var(--border)', padding: '12px 24px', borderRadius: '12px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Calendar size={18} /> Anstehende Meetings
        </button>
      </div>


      {activeTab === 'regelwerk' && (
        <div style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '20px', padding: '40px', lineHeight: '1.8', color: '#cbd5e1' }}>
          <h2 style={{ color: '#fff', fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '15px' }}>Dienstvorschrift und Betriebsordnung der Stadtwerke Neubrücken</h2>
          
          <p style={{ marginBottom: '20px' }}>
            Jeder Mitarbeiter der Stadtwerke Neubrücken unterliegt mit der Aufnahme seiner Tätigkeit einer strengen arbeitsrechtlichen und disziplinarischen Bindung an dieses Regelwerk. Die Einhaltung der hier niedergelegten Vorschriften ist zwingende Voraussetzung für den Verbleib im Betriebsdienst. Das Ansehen des Unternehmens nach außen sowie die absolute Funktionsfähigkeit der städtischen Infrastruktur stehen zu jeder Zeit an oberster Stelle und dulden keinerlei Nachlässigkeit.
          </p>

          <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', marginTop: '30px', marginBottom: '10px' }}>1. Pünktlichkeit, Anwesenheit und Dienstantritt</h3>
          <p style={{ marginBottom: '20px' }}>
            Der Dienstantritt hat pünktlich zum zugewiesenen Zeitpunkt an den offiziellen Betriebsstätten oder im zugewiesenen Einsatzgebiet zu erfolgen. Verspätungen sind unverzüglich und unaufgefordert der Personalabteilung sowie dem zuständigen Vorgesetzten zu melden. Unentschuldigtes Fernbleiben vom Dienst oder eigenmächtiges Verlassen des Arbeitsplatzes während der Schicht werden als schwerwiegender Verstoß gewertet und führen unmittelbar zu disziplinarischen Schritten bis hin zur fristlosen Entlassung. Die Zeiterfassung über die internen Systeme ist lückenlos und wahrheitsgemäß zu führen.
          </p>

          <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', marginTop: '30px', marginBottom: '10px' }}>2. Verschwiegenheit und Datenschutz</h3>
          <p style={{ marginBottom: '20px' }}>
            Sämtliche internen Vorgänge, Betriebsabläufe, Personaldaten, sicherheitsrelevante Netzpläne und strategischen Entscheidungen der Führungsebene unterliegen einer strikten und unzeitlichen Geheimhaltungspflicht. Es ist strengstens untersagt, betriebsinterne Informationen an unbefugte Dritte, externe Personen oder konkurrierende Organisationen weiterzugeben. Zuwiderhandlungen gegen diese Verschwiegenheitsverpflichtung verletzen das Vertrauensverhältnis tiefgehend und ziehen zivil- sowie strafrechtliche Konsequenzen nach sich.
          </p>

          <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', marginTop: '30px', marginBottom: '10px' }}>3. Weisungsbefugnis und Befehlskette</h3>
          <p style={{ marginBottom: '20px' }}>
            Den Weisungen der Geschäftsführung, der Führungsebene sowie der Personalabteilung ist in jedem Fall Folge zu leisten. Dienstliche Anweisungen sind diszipliniert auszuführen. Sollte ein Mitarbeiter begründete Zweifel an der technischen Machbarkeit oder der Rechtmäßigkeit einer Weisung haben, ist dies auf dem Dienstweg unverzüglich zu melden, entbindet jedoch ohne ausdrückliche Freigabe nicht von der Ausführung. Eigenmächtiges Handeln außerhalb der zugewiesenen Kompetenzen ist im operativen Netzbetrieb untersagt.
          </p>

          <h3 style={{ color: '#38bdf8', fontSize: '1.3rem', marginTop: '30px', marginBottom: '10px' }}>4. Arbeitssicherheit, Materialpflege und Verhalten im Einsatz</h3>
          <p style={{ marginBottom: '0' }}>
            Die Vorschriften zur Arbeitssicherheit und zum Unfallschutz sind kompromisslos einzuhalten. Jeder Mitarbeiter ist verpflichtet, die zur Verfügung gestellte Schutzkleidung zu tragen und die anvertrauten Fahrzeuge, Werkzeuge sowie technischen Anlagen mit äußerster Sorgfalt zu behandeln. Beschädigungen oder Defekte an Gerätschaften sind sofort zu melden. Der Konsum von Alkohol, Betäubungsmitteln oder sonstigen Rauschmitteln während der Dienstzeit sowie das Betreten des Betriebsgeländes unter deren Einfluss ist absolut tabu und führt zum sofortigen Ausschluss aus dem Dienst.
          </p>
        </div>
      )}


      {activeTab === 'auftraege' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {auftraege.map((a) => (
            <div key={a.id} style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '16px', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--cyan)', fontWeight: '700' }}>ERSTELLT VON: {a.creator}</span>
                <h3 style={{ margin: '5px 0 10px 0', fontSize: '1.3rem', color: '#fff' }}>{a.title}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>{a.desc}</p>
                <div style={{ marginTop: '12px' }}>
                  <span style={{ background: a.status === 'Angenommen' ? 'rgba(34,197,94,0.15)' : a.status === 'Abgelehnt' ? 'rgba(239,68,68,0.15)' : 'rgba(234,179,8,0.15)', color: a.status === 'Angenommen' ? '#22c55e' : a.status === 'Abgelehnt' ? '#ef4444' : '#eab308', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                    Status: {a.status}
                  </span>
                </div>
              </div>

              {a.status === 'Ausstehend' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleAction(a, 'auftrag', 'Angenommen')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Annehmen</button>
                  <button onClick={() => { setSelectedItem(a); setActionType('auftrag'); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Ablehnen</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

    
      {activeTab === 'meetings' && (
        <div style={{ display: 'grid', gap: '20px' }}>
          {meetings.map((m) => (
            <div key={m.id} style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '16px', padding: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--cyan)', fontWeight: '700' }}>TERMIN: {m.date}</span>
                <h3 style={{ margin: '5px 0 10px 0', fontSize: '1.3rem', color: '#fff' }}>{m.title}</h3>
                <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '0.95rem' }}>Erstellt durch die {m.creator}. Teilnahme ist verpflichtend sofern nicht begründet abgesagt wird.</p>
                <div style={{ marginTop: '12px' }}>
                  <span style={{ background: m.status === 'Zugesagt' ? 'rgba(34,197,94,0.15)' : m.status === 'Abgesagt' ? 'rgba(239,68,68,0.15)' : 'rgba(234,179,8,0.15)', color: m.status === 'Zugesagt' ? '#22c55e' : m.status === 'Abgesagt' ? '#ef4444' : '#eab308', padding: '4px 12px', borderRadius: '8px', fontSize: '12px', fontWeight: '700' }}>
                    Status: {m.status}
                  </span>
                </div>
              </div>

              {m.status === 'Ausstehend' && (
                <div style={{ display: 'flex', gap: '10px' }}>
                  <button onClick={() => handleAction(m, 'meeting', 'Zugesagt')} style={{ background: '#22c55e', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Teilnehmen</button>
                  <button onClick={() => { setSelectedItem(m); setActionType('meeting'); }} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: '700', cursor: 'pointer' }}>Absagen</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      
      {selectedItem && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ background: '#111827', border: '1px solid var(--border)', borderRadius: '20px', padding: '30px', maxWidth: '450px', width: '100%' }}>
            <h3 style={{ color: '#fff', marginTop: 0 }}>Ablehnung / Absage begründen</h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '14px' }}>Bitte geben Sie einen verbindlichen Grund an, warum Sie "{selectedItem.title}" ablehnen.</p>
            
            <textarea 
              rows={4}
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Grund hier eingeben..."
              style={{ width: '100%', background: '#0b1120', border: '1px solid var(--border)', color: '#fff', padding: '12px', borderRadius: '10px', boxSizing: 'border-box', margin: '15px 0' }}
            />

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }}>
              <button onClick={() => setSelectedItem(null)} style={{ background: '#1e293b', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', cursor: 'pointer' }}>Abbrechen</button>
              <button onClick={() => handleAction(selectedItem, actionType, actionType === 'auftrag' ? 'Abgelehnt' : 'Abgesagt')} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '10px 16px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>Absenden & Loggen</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
