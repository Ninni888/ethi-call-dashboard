import React, { useState } from "react";

interface SectionProps {
  onComplete: (score: number, note: string) => void;
}

const Section1: React.FC<SectionProps> = ({ onComplete }) => {
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
    onComplete(score, notes); // ✅ passa anche le note
  };

  const questions = [
    {
      id: "q1",
      domanda:
        "La reputazione aziendale è fondata sul principio della coerenza tra etica dichiarata e comportamenti?",
      note: "Quando si afferma che la reputazione aziendale è fondata sull’etica, si intende una reputazione costruita con coerenza, trasparenza, responsabilità e comportamenti allineati ai valori dichiarati.",
      verifiche:
        "Verificare se esiste un codice etico approvato e aggiornato. Verificare se la cultura aziendale viene comunicata all’esterno in modo coerente.",
      indicatori:
        "Esistenza di un codice etico approvato e aggiornato, linguaggio valoriale coerente nel sito, brochure, presentazioni istituzionali.",
    },
    {
      id: "q2",
      domanda:
        "L'azienda si impegna con costanza e determinazione nel rafforzare la propria cultura etica?",
      note: "Significa che l’impresa non agisce solo per sé ma lavora anche per l’interesse collettivo, promuovendo valori e coerenza nelle decisioni strategiche.",
      verifiche:
        "Verificare se esiste formalmente un referente o gruppo per l’etica aziendale o attività ricorrenti a supporto della cultura etica.",
      indicatori:
        "Nomina formale di una figura responsabile o di un comitato etico, documentazione di iniziative interne sulla cultura aziendale.",
    },
    {
      id: "q3",
      domanda:
        "L’azienda si pone come obiettivo formativo quello di diffondere la cultura della legalità, della trasparenza e del rispetto?",
      note: "Questa domanda valuta l’impegno dell’azienda nell’educare dipendenti, partner e stakeholder attraverso corsi, incontri, materiali divulgativi.",
      verifiche:
        "Verificare se i componenti del board, della direzione e i dipendenti seguono regolarmente percorsi formativi etici o valoriali.",
      indicatori:
        "Presenza di comunicazioni ufficiali o pubbliche sulle attività formative; registri di partecipazione a corsi etici o ESG.",
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
        Sezione 1 – Responsabilità etica (Governo e Trasparenza)
      </h2>

      <div className="text-md text-gray-800 bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded-md mb-8">
        <p className="mb-2 font-semibold">🎯 Obiettivo della sezione:</p>
        <p className="mb-4">
          Valutare il grado di coerenza tra i principi dichiarati dall’azienda e
          le sue pratiche di governance, trasparenza e responsabilità. La
          sezione aiuta a mettere in luce punti di forza e aree di miglioramento
          nella cultura organizzativa.
        </p>
        <p className="text-sm italic text-gray-700">
          Le informazioni fornite saranno utilizzate esclusivamente per
          supportare un percorso di consapevolezza strategica. Non si tratta di
          una certificazione, ma di un’analisi utile a identificare potenziali
          rischi e opportunità. È importante rispondere con autenticità e
          attenzione: ogni risposta è un’opportunità per crescere.
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
          Completa Sezione 1
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

export default Section1;
