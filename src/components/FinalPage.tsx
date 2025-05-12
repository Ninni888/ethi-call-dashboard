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

  const radarData = Object.entries(scores).map(([section, score]) => ({
    section,
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
    const input = document.getElementById("pdfContent");

    if (input) {
      const buttons = document.getElementById("buttonsContainer");
      if (buttons) buttons.style.display = "none";

      const canvas = await html2canvas(input, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");

      const marginLeft = 120;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width + marginLeft + 40, canvas.height + 200],
      });

      pdf.addImage(imgData, "PNG", marginLeft, 40, canvas.width, canvas.height);
      pdf.save(
        `risultati-eticaimprese-${new Date().toISOString().slice(0, 10)}.pdf`
      );

      if (buttons) buttons.style.display = "flex";
    }
  };

  return (
    <div
      id="pdfContent"
      style={{
        padding: "2rem",
        maxWidth: "960px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-6">
        <img
          src="/eticaimprese.svg"
          alt="Logo Eticaimprese"
          style={{ width: "180px" }}
        />
      </div>

      {/* Titolo */}
      <h1 className="text-3xl font-bold text-center mb-2">COMPLIMENTI!</h1>
      <p className="text-center mb-4">Hai completato il percorso ETHI-Call.</p>

      {/* Punteggio */}
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">
          Punteggio Medio: {(averageScore * 10).toFixed(1)}/100
        </h2>
        <h3 className="text-xl font-bold" style={{ color: level.color }}>
          Livello Etico: {level.text}
        </h3>
      </div>

      {/* Badge livello etico */}
      <div className="flex justify-center mt-4">
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
          }}
        >
          {level.text}
        </div>
      </div>

      {/* Narrativa dinamica */}
      <div className="mt-6 text-center text-lg text-gray-700">
        {averageScore >= 9 && (
          <p>
            La tua organizzazione rappresenta un modello di coerenza e visione
            etica. Continua a guidare il cambiamento, coinvolgendo i tuoi
            stakeholder in un processo di contaminazione positiva.
          </p>
        )}
        {averageScore >= 7.5 && averageScore < 9 && (
          <p>
            L’etica è chiaramente parte integrante del tuo business. Hai tutte
            le basi per evolvere verso una leadership etica di riferimento,
            espandendo il tuo impatto positivo.
          </p>
        )}
        {averageScore >= 5 && averageScore < 7.5 && (
          <p>
            Hai intrapreso un percorso importante: alcune pratiche etiche sono
            già presenti, ma c’è ancora margine per renderle sistemiche e
            strategiche.
          </p>
        )}
        {averageScore < 5 && (
          <p>
            Questo risultato non rappresenta un giudizio, ma un punto di
            partenza. ETHI-Call può aiutarti a costruire una cultura etica
            solida e orientata al futuro, migliorando la resilienza e la
            reputazione dell’impresa.
          </p>
        )}
      </div>

      {/* Raccomandazioni operative */}
      <div className="mt-10 space-y-2 text-gray-800 text-base">
        <h4
          className="text-xl font-bold text-center mb-2"
          style={{ color: "#b69624" }}
        >
          Raccomandazioni personalizzate
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
              Effettua un’analisi etica con il supporto degli ETHI-Call Manager.
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
            <li>Coinvolgi la tua filiera in una logica di etica condivisa.</li>
            <li>
              Partecipa al network ETHI-Call per creare contaminazione positiva.
            </li>
            <li>
              Considera la certificazione etica avanzata e il bilancio EP&L.
            </li>
          </ul>
        )}
      </div>

      {/* Radar Chart */}
      <div className="flex justify-center mt-12" style={{ height: "400px" }}>
        <RadarChartEthic data={radarData} />
      </div>

      {/* Risultati singole sezioni */}
      <div className="space-y-8 mt-12">
        {Object.entries(scores).map(([section, score]) => (
          <div key={section}>
            <div className="text-lg font-bold">
              {section}: {Math.round(score * 10)}/100
            </div>
            {notes[section] && (
              <div className="mt-2 text-gray-700">
                <strong>Criticità rilevate:</strong>
                <br />
                {notes[section]}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Call to action */}
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

      {/* Margine vuoto grande */}
      <div style={{ height: "100px" }}></div>

      {/* Nota finale */}
      <div className="text-center text-xs text-gray-400 mt-10">
        Dashboard Eticaimprese © 2025 - Tutti i diritti riservati
      </div>

      {/* Pulsanti */}
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
