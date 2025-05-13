import React from "react";

interface CoverPageProps {
  onStart: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onStart }) => {
  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "960px",
          textAlign: "center",
        }}
      >
        {/* Logo Eticaimprese */}
        <img
          src="/eticaimprese.svg"
          alt="EticaImprese Logo"
          style={{ width: "400px", marginBottom: "12px" }}
        />

        {/* by ETHI-Call */}
        <div
          className="text-sm italic mb-6"
          style={{ color: "#b69624", fontStyle: "italic" }}
        >
          by <strong>ETHI-Call</strong>
        </div>

        {/* Titolo */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#b69624" }}
        >
          ETHI-Call Assessment
        </h1>

        {/* Claim su due righe */}
        <p className="text-lg mb-8 text-gray-700">
          Scopri quanto l’etica è integrata nella tua impresa e trasforma i tuoi
          valori in vantaggio competitivo.
          <br />
          Un viaggio tra coerenza, impatto e consapevolezza.
        </p>

        {/* Pulsante Inizia */}
        <button
          onClick={onStart}
          style={{
            marginTop: "20px",
            padding: "15px 40px",
            backgroundColor: "#b69624",
            border: "none",
            borderRadius: "10px",
            fontSize: "20px",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Inizia il Percorso Etico
        </button>
      </div>
    </div>
  );
};

export default CoverPage;
