import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number, note: string) => void;
}

const Section2: React.FC<SectionProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<{ [key: string]: number }>({});
  const [notes, setNotes] = useState("");

  const handleAnswer = (question: string, value: number) => {
    setAnswers((prev) => ({
      ...prev,
      [question]: value,
    }));
  };

  const handleSubmit = () => {
    const total = Object.values(answers).reduce((sum, val) => sum + val, 0);
    const average = total / Object.keys(answers).length || 0;
    const score = Math.round(average * 10) / 10;
    onComplete(score, notes);
  };

  const questions = [
    {
      id: "q1",
      domanda:
        "L’azienda si impegna attivamente per garantire il rispetto dei diritti umani lungo tutta la catena del valore?",
      note: "La domanda valuta se l’azienda applica i principi fondamentali dei diritti umani, inclusi quelli dei lavoratori, dei fornitori e delle comunità impattate.",
      verifiche:
        "Verificare se l’impresa ha aderito a codici internazionali (es. Global Compact) o ha adottato policy interne per i diritti umani.",
      indicatori:
        "Presenza di un codice di condotta fornitori, politiche di due diligence, audit sociali, formazione su diritti umani.",
    },
    {
      id: "q2",
      domanda:
        "Esistono misure specifiche contro ogni forma di discriminazione, abuso o violazione della dignità personale e professionale?",
      note: "La domanda esplora le politiche adottate per garantire pari opportunità, inclusività e rispetto in ogni ambito aziendale.",
      verifiche:
        "Verificare se esistono canali per segnalazioni anonime, codici di comportamento interni, protocolli antidiscriminazione.",
      indicatori:
        "Presenza di policy DEI (Diversità, Equità e Inclusione), adesione a standard esterni, iniziative per la parità.",
    },
    {
      id: "q3",
      domanda:
        "L’impresa comunica in modo trasparente il proprio impegno in materia di diritti universali?",
      note: "La domanda intende verificare la chiarezza, accessibilità e coerenza delle dichiarazioni aziendali sui diritti fondamentali.",
      verifiche:
        "Verificare la presenza di report, sezioni dedicate nel sito web, campagne di sensibilizzazione interna ed esterna.",
      indicatori:
        "Pubblicazione di bilanci sociali, ESG report, comunicazioni CSR, adesione a iniziative internazionali.",
    },
  ];

  const options = [
    { label: "Inesistente", value: 0 },
    { label: "Molto carente", value: 2.5 },
    { label: "Parzialmente presente", value: 5 },
    { label: "Generalmente soddisfacente", value: 7.5 },
    { label: "Pienamente soddisfacente", value: 10 },
  ];

  return (
    <div
      className="space-y-12 text-left"
      style={{
        paddingLeft: "2rem",
        paddingRight: "2rem",
        paddingTop: "2rem",
        paddingBottom: "2rem",
        maxWidth: "960px",
        margin: "0 auto",
        boxSizing: "border-box",
      }}
    >
      {/* Logo */}
      <div className="flex justify-center mb-2">
        <img
          src="/eticaimprese.svg"
          alt="EticaImprese Logo"
          style={{ width: "300px", marginBottom: "10px" }}
        />
      </div>

      <h2
        className="text-3xl font-extrabold mb-6 text-center"
        style={{ color: "#b69624" }}
      >
        Sezione 2 – Diritti Universali
      </h2>

      <div className="text-md text-gray-800 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-8">
        <p className="mb-2 font-semibold">🎯 Obiettivo della sezione:</p>
        <p className="mb-4">
          Esplorare l’impegno dell’azienda nel garantire il rispetto dei diritti
          umani fondamentali e promuovere inclusione, equità e non
          discriminazione.
        </p>
        <p className="text-sm italic text-gray-700">
          Le risposte non saranno utilizzate per fini certificativi, ma per
          comprendere i potenziali rischi e le aree di miglioramento nel
          rispetto dei diritti universali lungo tutta la catena di valore.
        </p>
      </div>

      <div className="space-y-12">
        {questions.map((q, index) => (
          <div
            key={q.id}
            className="border rounded-xl p-6 space-y-4 shadow-md transition hover:shadow-lg"
            style={{
              backgroundColor: index % 2 === 0 ? "#fffef8" : "#ffffff",
              borderColor: "#b69624",
              borderWidth: "1px",
            }}
          >
            <h3 className="text-lg font-bold" style={{ color: "#b69624" }}>
              Domanda {index + 1}
            </h3>
            <p className="text-xl font-semibold">{q.domanda}</p>
            <p className="text-gray-700 italic">Nota: {q.note}</p>
            <p className="text-gray-700">Verifiche: {q.verifiche}</p>
            <p className="text-gray-700">Indicatori: {q.indicatori}</p>
            <select
              className="w-full border p-3 rounded-lg"
              onChange={(e) => handleAnswer(q.id, parseFloat(e.target.value))}
            >
              <option value="">Seleziona una risposta</option>
              {options.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <p className="text-sm text-gray-500">
              Punteggio assegnato: {answers[q.id] ?? "—"}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <label className="block text-lg font-semibold mb-2">
          Indica i principali aspetti da migliorare per questa area:
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={5}
          placeholder="Scrivi qui eventuali criticità o miglioramenti..."
          className="w-full border p-4 rounded-lg"
        />
      </div>

      <div className="text-center mt-10">
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#b69624",
            padding: "15px 30px",
            color: "white",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Completa Sezione 2
        </button>
      </div>

      <div className="text-center mt-6 text-lg font-bold">
        Punteggio medio sezione:{" "}
        {Object.keys(answers).length > 0
          ? `${(
              Object.values(answers).reduce((a, b) => a + b, 0) /
              Object.keys(answers).length
            ).toFixed(1)} / 10`
          : "—"}
      </div>
    </div>
  );
};

export default Section2;
