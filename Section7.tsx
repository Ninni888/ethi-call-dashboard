import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number, note: string) => void;
}

const Section7: React.FC<SectionProps> = ({ onComplete }) => {
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
        "L’azienda integra l’etica come leva strategica nei processi di innovazione e trasformazione?",
      note: "La domanda valuta quanto l’impresa considera i valori etici come motore dell’innovazione, anche in ambito digitale o tecnologico.",
      verifiche:
        "Verificare se i progetti innovativi sono guidati da finalità etiche, inclusione, sostenibilità o impatto positivo.",
      indicatori:
        "Progetti a impatto sociale/ambientale, use case in cui l’etica guida le scelte tecnologiche o digitali.",
    },
    {
      id: "q2",
      domanda:
        "L’azienda coltiva una visione generativa che va oltre il profitto immediato?",
      note: "Questa domanda analizza se l’impresa persegue obiettivi ispirati a senso, impatto e costruzione di valore duraturo.",
      verifiche:
        "Verificare esistenza di dichiarazioni valoriali a lungo termine, reinvestimenti strategici in progetti sostenibili.",
      indicatori:
        "Percentuale reinvestita, programmi di impatto, partnership generative, filosofia open innovation.",
    },
    {
      id: "q3",
      domanda:
        "L’impresa promuove forme di collaborazione etica con start-up, enti di ricerca o istituzioni?",
      note: "Questa domanda riguarda la costruzione di ecosistemi etici per accelerare il cambiamento positivo.",
      verifiche:
        "Verificare la partecipazione a reti di innovazione sostenibile, co-progettazione, bandi etici, living lab.",
      indicatori:
        "Progetti con Università/CSR Lab/start-up B Corp, presenza in hub etici o filiere sostenibili.",
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
        Sezione 7 – Innovazione e Visione Etica
      </h2>

      <div className="text-md text-gray-800 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-8">
        <p className="mb-2 font-semibold">🎯 Obiettivo della sezione:</p>
        <p className="mb-4">
          Analizzare la capacità dell’impresa di orientare il proprio sviluppo
          futuro secondo criteri etici, sostenibili e generativi.
        </p>
        <p className="text-sm italic text-gray-700">
          Innovazione ed etica non sono in contraddizione: questa sezione aiuta
          a valutare come l’azienda possa guidare il cambiamento mantenendo fede
          ai propri valori.
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
          Completa Sezione 7
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

export default Section7;
