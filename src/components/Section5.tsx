import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number) => void;
}

const Section5: React.FC<SectionProps> = ({ onComplete }) => {
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
    onComplete(score);
  };

  const questions = [
    {
      id: "q1",
      domanda:
        "L’azienda promuove un senso di appartenenza costruito su valori condivisi (“famiglia scelta”)?",
      note: "Il concetto di 'famiglia scelta' si riferisce a un legame profondo costruito su valori comuni, non solo su relazioni formali.",
      verifiche:
        "Presenza di iniziative che rafforzano la coesione, il senso di comunità e la visione comune.",
      indicatori:
        "Eventi aziendali simbolici, reti di coinvolgimento interno, comunicazione trasversale.",
    },
    {
      id: "q2",
      domanda:
        "Esistono processi per garantire una transizione generazionale etica e sostenibile?",
      note: "La continuità non è solo successione legale ma trasmissione di visione, saperi e valori.",
      verifiche:
        "Presenza di piani di successione e percorsi strutturati per il passaggio generazionale.",
      indicatori:
        "Documento strategico sul passaggio generazionale, testimonianze documentate, percorsi interni di crescita.",
    },
    {
      id: "q3",
      domanda: "La leadership è diffusa, inclusiva, orientata al bene comune?",
      note: "ETHI-Call promuove modelli di leadership partecipativa, corresponsabile e orientata all’ascolto.",
      verifiche:
        "Struttura organizzativa non gerarchica; spazi per il confronto e la co-decisione.",
      indicatori:
        "Presenza di leadership distribuita, sistemi di feedback, iniziative condivise.",
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
      <div className="flex justify-center mb-2">
        <img
          src="/eticaimprese.svg"
          alt="EticaImprese Logo"
          style={{ width: "234px", marginBottom: "10px" }}
        />
      </div>

      <h2
        className="text-3xl font-extrabold mb-6 text-center"
        style={{ color: "#b69624" }}
      >
        Sezione 5 – Continuità Etica e Famiglia Scelta
      </h2>

      <div className="space-y-12">
        {questions.map((q) => (
          <div key={q.id} className="border rounded-lg p-6 space-y-4 shadow-sm">
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
          Completa Sezione 5
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

export default Section5;
