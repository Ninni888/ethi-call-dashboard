import React from "react";
import RadarChartEthic from "./RadarChartEthic";

interface AssessmentResultProps {
  scores: number[];
  onRestart: () => void;
}

const AssessmentResult: React.FC<AssessmentResultProps> = ({
  scores = [],
  onRestart,
}) => {
  const average =
    Array.isArray(scores) && scores.length > 0
      ? scores.reduce((sum, val) => sum + val, 0) / scores.length
      : 0;

  const getLevel = (score: number) => {
    if (score >= 8) return "ECCELLENTE";
    if (score >= 6) return "AVANZATO";
    if (score >= 4) return "INTERMEDIO";
    return "CRITICO";
  };

  const data = scores.map((score, index) => ({
    section: `Sezione ${index + 1}`,
    score: Math.round(score * 10), // base 100 per grafico
  }));

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "960px",
          width: "100%",
        }}
      >
        {/* Logo centrato */}
        <div style={{ textAlign: "center", marginBottom: "1rem" }}>
          <img
            src="/eticaimprese.svg"
            alt="EticaImprese Logo"
            style={{ width: "180px" }}
          />
        </div>

        {/* Titolo */}
        <h2
          style={{
            fontSize: "2rem",
            fontWeight: "bold",
            color: "#b69624",
            textAlign: "center",
            marginBottom: "1.5rem",
          }}
        >
          COMPLIMENTI! <br />
          Hai completato il percorso ETHI-Call.
        </h2>

        {/* Media punteggio */}
        <p style={{ fontSize: "1.25rem", textAlign: "center" }}>
          <strong>Punteggio Medio:</strong> {average.toFixed(1)}/10 <br />
          <strong>Livello Etico:</strong> {getLevel(average)}
        </p>

        {/* Radar Chart */}
        <div style={{ marginTop: "2rem", marginBottom: "2rem" }}>
          <RadarChartEthic data={data} />
        </div>

        {/* Punteggi sezione per sezione */}
        <div style={{ marginBottom: "2rem" }}>
          {data.map((d, i) => (
            <p key={i} style={{ fontSize: "1.125rem" }}>
              <strong>{d.section}:</strong> {d.score}/100
            </p>
          ))}
        </div>

        {/* Pulsanti */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <button
            onClick={() => window.print()}
            style={{
              backgroundColor: "#b69624",
              padding: "12px 24px",
              color: "white",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
              marginRight: "1rem",
            }}
          >
            Esporta PDF
          </button>
          <button
            onClick={onRestart}
            style={{
              backgroundColor: "#6b7280",
              padding: "12px 24px",
              color: "white",
              borderRadius: "8px",
              fontSize: "16px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
          >
            Riparti da Inizio
          </button>
        </div>

        {/* Footer */}
        <footer
          style={{
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
            marginTop: "2rem",
          }}
        >
          Dashboard Eticaimprese © 2025 – Tutti i diritti riservati
        </footer>
      </div>
    </div>
  );
};

export default AssessmentResult;
