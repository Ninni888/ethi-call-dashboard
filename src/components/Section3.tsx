import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number) => void;
}

const Section3: React.FC<SectionProps> = ({ onComplete }) => {
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
        "Esistono politiche o pratiche per garantire condizioni di lavoro eque, sicure e dignitose?",
      note: "L’etica aziendale inizia dalla garanzia di un contesto sicuro e dignitoso.",
      verifiche:
        "Verificare l’esistenza di politiche aziendali per la salute, la sicurezza e l’equilibrio tra vita e lavoro.",
      indicatori:
        "Politica di salute e sicurezza accessibile e aggiornata; iniziative a favore del benessere psico-fisico.",
    },
    {
      id: "q2",
      domanda:
        "Esistono strumenti per raccogliere e monitorare il benessere dei lavoratori e il clima aziendale?",
      note: "Ascoltare il clima aziendale, i livelli di stress e di soddisfazione interna è un atto etico e strategico.",
      verifiche:
        "Verificare se esistono pratiche sistematiche per l’ascolto dei dipendenti.",
      indicatori:
        "Presenza di sondaggi, sportelli d’ascolto, verbali o altri strumenti di rilevazione interna.",
    },
    {
      id: "q3",
      domanda:
        "L’azienda promuove attivamente il principio del rispetto e della non discriminazione?",
      note: "Il rispetto della dignità individuale è il fondamento della giustizia organizzativa.",
      verifiche:
        "Verificare l’esistenza di politiche formali di inclusione e non discriminazione.",
      indicatori:
        "Politica inclusiva, iniziative di sensibilizzazione, canali interni per segnalare violazioni.",
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
        Sezione 3 – Rispetto e tutela dei diritti dei lavoratori
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
          Completa Sezione 3
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

export default Section3;
