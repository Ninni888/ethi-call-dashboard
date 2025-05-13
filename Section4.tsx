import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number, note: string) => void;
}

const Section4: React.FC<SectionProps> = ({ onComplete }) => {
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
        "L’azienda misura e monitora costantemente il proprio impatto ambientale?",
      note: "Questa domanda riguarda la capacità dell’azienda di misurare consumi, emissioni e sprechi, con strumenti strutturati e documentabili.",
      verifiche:
        "Verificare la presenza di sistemi di misurazione (es. carbon footprint, indicatori ambientali, bilanci ambientali).",
      indicatori:
        "Monitoraggi periodici, report ambientali, tool di calcolo, certificazioni ambientali volontarie.",
    },
    {
      id: "q2",
      domanda:
        "Sono attive politiche aziendali per la riduzione dell’impatto ambientale?",
      note: "Riguarda l’effettiva implementazione di misure concrete per ridurre consumi, sprechi, emissioni e per favorire la transizione ecologica.",
      verifiche:
        "Verificare se esistono policy di efficientamento, piani energetici, gestione rifiuti, utilizzo materiali sostenibili.",
      indicatori:
        "Adozione energie rinnovabili, riduzione carta/plastica, certificazioni ISO 14001 o EMAS, gestione ciclo di vita prodotto.",
    },
    {
      id: "q3",
      domanda:
        "L’azienda promuove la sensibilizzazione ambientale interna ed esterna?",
      note: "Questa domanda valuta l’impegno culturale e formativo dell’impresa sul tema ambientale, verso dipendenti e stakeholder.",
      verifiche:
        "Verificare presenza di iniziative interne, eventi, campagne educative, partnership con realtà green.",
      indicatori:
        "Piani formativi, campagne social, eventi aziendali su temi ambientali, partecipazione a reti o progetti territoriali.",
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
        Sezione 4 – Rispetto per l’ambiente
      </h2>

      <div className="text-md text-gray-800 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-8">
        <p className="mb-2 font-semibold">🎯 Obiettivo della sezione:</p>
        <p className="mb-4">
          Valutare la capacità dell’impresa di ridurre il proprio impatto
          ambientale attraverso misurazioni, politiche interne e iniziative di
          sensibilizzazione.
        </p>
        <p className="text-sm italic text-gray-700">
          Questa sezione contribuisce a individuare azioni prioritarie per
          integrare i criteri ambientali nelle strategie aziendali e nelle
          relazioni con gli stakeholder.
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
          Completa Sezione 4
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

export default Section4;
