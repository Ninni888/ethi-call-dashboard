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
          style={{ width: "180px", marginBottom: "10px" }}
        />

        {/* by ETHI-Call sotto il logo */}
        <div className="text-sm mb-6" style={{ color: "#b69624" }}>
          by <strong>ETHI-Call</strong>
        </div>

        {/* Testo di benvenuto */}
        <h1
          className="text-3xl md:text-4xl font-bold mb-4"
          style={{ color: "#b69624" }}
        >
          BENVENUTI IN ETICAIMPRESE
        </h1>

        <p className="text-lg mb-6" style={{ color: "#b69624" }}>
          Il primo assessment etico per la tua organizzazione
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
          Inizia
        </button>
      </div>
    </div>
  );
};

export default CoverPage;
