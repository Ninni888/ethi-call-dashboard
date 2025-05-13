import React from "react";
import RadarChartEthic from "./RadarChartEthic";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface FinalPageProps {
  scores: { [section: string]: number };
  notes: { [section: string]: string };
  onRestart: () => void;
}

const FinalPage: React.FC<FinalPageProps> = ({ scores, notes, onRestart }) => {
  const totalScore = Object.values(scores).reduce((acc, curr) => acc + curr, 0);
  const averageScore = totalScore / 7;

  const sectionTitles: { [key: string]: string } = {
    "Sezione 1": "Responsabilità etica",
    "Sezione 2": "Diritti universali",
    "Sezione 3": "Diritti dei lavoratori",
    "Sezione 4": "Ambiente",
    "Sezione 5": "Famiglia scelta",
    "Sezione 6": "Comunicazione etica",
    "Sezione 7": "Innovazione etica",
  };

  const radarData = Object.entries(scores).map(([section, score]) => ({
    section: `${section} – ${sectionTitles[section]}`,
    score,
  }));

  const getLevel = (score: number) => {
    if (score >= 90) return { text: "ECCELLENTE", color: "#b69624" };
    if (score >= 75) return { text: "BUONO", color: "#fbbf24" };
    if (score >= 50) return { text: "SUFFICIENTE", color: "#f59e0b" };
    return { text: "CRITICO", color: "#ef4444" };
  };

  const level = getLevel(averageScore * 10);

  const exportPDF = async () => {
    const pageOne = document.getElementById("pageOne");
    const pageTwo = document.getElementById("pageTwo");

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    if (pageOne && pageTwo) {
      const canvas1 = await html2canvas(pageOne, { scale: 2 });
      const imgData1 = canvas1.toDataURL("image/png");
      const width = 210;
      const height1 = (canvas1.height * width) / canvas1.width;
      pdf.addImage(imgData1, "PNG", 0, 0, width, height1);

      pdf.addPage();

      const canvas2 = await html2canvas(pageTwo, { scale: 2 });
      const imgData2 = canvas2.toDataURL("image/png");
      const height2 = (canvas2.height * width) / canvas2.width;
      pdf.addImage(imgData2, "PNG", 0, 0, width, height2);

      pdf.save(
        `risultati-eticaimprese-${new Date().toISOString().slice(0, 10)}.pdf`
      );
    }
  };

  return (
    <div id="pdfContent">
      <div
        id="pageOne"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "2rem",
          boxSizing: "border-box",
        }}
      >
        <img
          src="/eticaimprese.svg"
          alt="Logo Eticaimprese"
          style={{ width: "400px", marginBottom: "2rem" }}
        />
        <h1 className="text-3xl font-bold text-center mb-2">COMPLIMENTI!</h1>
        <p className="text-center mb-4 text-lg">
          Hai completato il percorso ETHI-Call.
        </p>
        <h2 className="text-2xl font-bold mb-2">
          Punteggio Medio: {(averageScore * 10).toFixed(1)}/100
        </h2>
        <h3 className="text-xl font-bold mb-6" style={{ color: level.color }}>
          Livello Etico: {level.text}
        </h3>
        <div
          style={{
            backgroundColor: level.color,
            color: "white",
            borderRadius: "50%",
            width: "120px",
            height: "120px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "16px",
            boxShadow: "0 0 12px rgba(0,0,0,0.2)",
            marginBottom: "2rem",
          }}
        >
          {level.text}
        </div>
        <div
          style={{
            marginLeft: "2cm",
            marginRight: "2cm",
            marginTop: "2rem",
            textAlign: "center",
            color: "#374151",
            fontSize: "1.125rem",
            fontStyle: "italic",
          }}
        >
          <p>
            Questo non è un giudizio. Non è una certificazione. È un invito a
            guardare dentro la propria organizzazione con coraggio e visione. Il
            percorso ETHI-Call rappresenta uno strumento per trasformare i
            valori dichiarati in leve concrete di vantaggio competitivo. Un modo
            per individuare rischi prima che diventino criticità e per cogliere
            opportunità prima che sfuggano. L’etica non è un fine, ma una forza.
            Una strategia per imprese che vogliono restare umane, autentiche e
            orientate al futuro.
          </p>
        </div>
        <div style={{ height: "400px", width: "100%", marginTop: "3rem" }}>
          <RadarChartEthic data={radarData} />
        </div>
      </div>

      <div
        id="pageTwo"
        style={{ padding: "2cm", fontSize: "18px", boxSizing: "border-box" }}
      >
        <div className="flex justify-center mb-6">
          <img
            src="/eticaimprese.svg"
            alt="Logo Eticaimprese"
            style={{ width: "220px" }}
          />
        </div>

        <div className="mt-12 bg-yellow-50 border-l-4 border-yellow-500 p-6 rounded-md">
          <h4 className="text-xl font-bold mb-4" style={{ color: "#b69624" }}>
            📋 Principali aspetti da migliorare (per area)
          </h4>
          <ul className="list-disc list-inside text-gray-800 space-y-2">
            {Object.entries(notes).map(([section, note]) =>
              note ? (
                <li key={section}>
                  <strong>
                    {section} – {sectionTitles[section]}:
                  </strong>{" "}
                  {note}
                </li>
              ) : null
            )}
          </ul>
        </div>

        <div className="mt-12">
          <h4
            className="text-xl font-bold text-center mb-4"
            style={{ color: "#b69624" }}
          >
            🛡 Risk Ethic Framework – Rischi Etici
          </h4>
          <ul
            className="list-inside text-gray-800 space-y-2"
            style={{ fontSize: "1.1rem" }}
          >
            <li>
              <strong>⚠️ Rischio interno:</strong> Mancanza di un referente o
              comitato etico attivo.
            </li>
            <li>
              <strong>⚠️ Rischio esterno:</strong> Percezione incoerente dei
              valori da parte degli stakeholder.
            </li>
            <li>
              <strong>⚠️ Rischio interno:</strong> Assenza di strumenti di
              ascolto strutturati per i collaboratori.
            </li>
            <li>
              <strong>⚠️ Rischio interno:</strong> Inadeguata integrazione
              dell’etica nella governance.
            </li>
            <li>
              <strong>⚠️ Rischio esterno:</strong> Comunicazione potenzialmente
              percepita come greenwashing.
            </li>
          </ul>
        </div>

        <div className="mt-12">
          <h4
            className="text-xl font-bold text-center mb-4"
            style={{ color: "#b69624" }}
          >
            🌿 Ethic Template Opportunity – Opportunità Strategiche
          </h4>
          <ul
            className="list-inside text-gray-800 space-y-2"
            style={{ fontSize: "1.1rem" }}
          >
            <li>
              <strong>✅ Valorizzare il capitale umano</strong> con percorsi di
              ascolto e mentoring valoriale.
            </li>
            <li>
              <strong>✅ Attivare una comunicazione trasparente</strong> e
              coerente con la cultura interna.
            </li>
            <li>
              <strong>✅ Utilizzare l’etica come leva distintiva</strong> per
              l’innovazione e la competitività sostenibile.
            </li>
            <li>
              <strong>✅ Creare una community valoriale</strong> coinvolgendo
              fornitori e stakeholder nel modello ETHI-Call.
            </li>
            <li>
              <strong>✅ Integrare strumenti come il bilancio EP&L</strong> per
              misurare l’impatto etico-economico.
            </li>
          </ul>
        </div>

        <div className="mt-12 space-y-2 text-gray-800 text-base">
          <h4
            className="text-xl font-bold text-center mb-2"
            style={{ color: "#b69624" }}
          >
            📌 Raccomandazioni personalizzate
          </h4>

          {averageScore < 5 && (
            <ul className="list-disc list-inside">
              <li>
                Definisci una Carta dei Valori interna, condivisa e vissuta.
              </li>
              <li>
                Nomina un referente per l’etica e avvia percorsi formativi base.
              </li>
              <li>
                Effettua un’analisi etica con il supporto degli ETHI-Call
                Manager.
              </li>
            </ul>
          )}
          {averageScore >= 5 && averageScore < 7.5 && (
            <ul className="list-disc list-inside">
              <li>Formalizza procedure etiche nei processi chiave.</li>
              <li>Comunica all’esterno il tuo impegno con trasparenza.</li>
              <li>
                Utilizza strumenti come il REF e l’ETO per mappare rischi e
                opportunità.
              </li>
            </ul>
          )}
          {averageScore >= 7.5 && (
            <ul className="list-disc list-inside">
              <li>
                Coinvolgi la tua filiera in una logica di etica condivisa.
              </li>
              <li>
                Partecipa al network ETHI-Call per creare contaminazione
                positiva.
              </li>
              <li>
                Considera la certificazione etica avanzata e il bilancio EP&L.
              </li>
            </ul>
          )}

          <div className="mt-8 text-base text-gray-800">
            <h5 className="font-semibold mb-2">🎓 Formazione consigliata:</h5>
            <ul className="list-disc list-inside">
              <li>
                Corso base su etica d’impresa e cultura della trasparenza.
              </li>
              <li>Formazione ESG per leadership e comitato etico interno.</li>
              <li>
                Laboratori pratici su comunicazione valoriale e linguaggio
                inclusivo.
              </li>
              <li>
                Workshop sull’uso strategico di REF e ETO nella pianificazione
                aziendale.
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-12 text-lg text-gray-800">
          <p>
            Vuoi approfondire il tuo percorso etico e trasformarlo in vantaggio
            competitivo?
            <br />
            Contattaci all’indirizzo{" "}
            <a
              href="mailto:info@ethi-call.it"
              style={{
                color: "#b69624",
                fontWeight: "bold",
                textDecoration: "underline",
              }}
            >
              info@ethi-call.it
            </a>
          </p>
        </div>

        <div style={{ height: "100px" }}></div>

        <div className="text-center text-xs text-gray-400 mt-10">
          Dashboard Eticaimprese © 2025 - Tutti i diritti riservati
        </div>
      </div>

      <div
        id="buttonsContainer"
        className="flex justify-center space-x-6 mt-10"
      >
        <button
          onClick={exportPDF}
          style={{
            backgroundColor: "#b69624",
            padding: "12px 24px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Esporta PDF
        </button>

        <button
          onClick={onRestart}
          style={{
            backgroundColor: "#b69624",
            padding: "12px 24px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bold",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Riparti da Inizio
        </button>
      </div>
    </div>
  );
};

export default FinalPage;
