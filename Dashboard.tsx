import React, { useState, useEffect } from "react";
import RadarChartEthic from "./RadarChartEthic";

const sections = [
  "Visione Etica",
  "Governance Etica",
  "Espansione Etica",
  "Innovazione Etica",
  "Impatti Etici",
  "Cultura Etica",
  "Resilienza Etica",
];

const questions = {
  "Visione Etica": [
    {
      id: "q1",
      label: "La tua azienda ha una dichiarazione di visione etica?",
      type: "yesno",
    },
    {
      id: "q2",
      label: "Quante iniziative etiche sono in corso?",
      type: "number",
    },
  ],
  "Governance Etica": [
    { id: "q3", label: "Esiste un Codice Etico aziendale?", type: "yesno" },
    { id: "q4", label: "È adottato un Modello 231?", type: "yesno" },
    {
      id: "q5",
      label: "Presenza di un comitato etico interno?",
      type: "yesno",
    },
  ],
  "Espansione Etica": [
    { id: "q6", label: "Quante partnership etiche attive?", type: "number" },
    {
      id: "q7",
      label: "Iniziative di sviluppo etico in corso?",
      type: "yesno",
    },
  ],
  "Innovazione Etica": [
    {
      id: "q8",
      label: "Sono presenti progetti di innovazione etica?",
      type: "yesno",
    },
    { id: "q9", label: "Percentuale di investimenti etici?", type: "percent" },
  ],
  "Impatti Etici": [
    { id: "q10", label: "Misurazione degli impatti sociali?", type: "yesno" },
    {
      id: "q11",
      label: "Misurazione degli impatti ambientali?",
      type: "yesno",
    },
  ],
  "Cultura Etica": [
    {
      id: "q12",
      label: "Corsi di formazione etica organizzati?",
      type: "yesno",
    },
    { id: "q13", label: "Ore medie di formazione etica?", type: "number" },
  ],
  "Resilienza Etica": [
    { id: "q14", label: "Policy etiche in crisi?", type: "yesno" },
    { id: "q15", label: "Numero procedure aggiornate?", type: "number" },
  ],
};

const initialAnswers = Object.entries(questions).reduce(
  (acc, [section, list]) => {
    list.forEach((q) => {
      acc[q.id] = "";
    });
    return acc;
  },
  {} as Record<string, string>
);

const Dashboard = () => {
  const [answers, setAnswers] = useState(initialAnswers);
  const [radarData, setRadarData] = useState<
    { section: string; score: number }[]
  >([]);

  useEffect(() => {
    const updatedData = sections.map((section) => {
      let score = 0;
      questions[section].forEach((q) => {
        const answer = answers[q.id];
        if (q.type === "yesno" && answer === "yes") score += 10;
        if (q.type === "number") score += Math.min(Number(answer) || 0, 10);
        if (q.type === "percent") score += Math.min(Number(answer) / 10, 10);
      });
      return { section, score };
    });
    setRadarData(updatedData);
  }, [answers]);

  const handleChange = (id: string, value: any) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  };

  const handleReset = () => {
    setAnswers(initialAnswers);
  };

  const totalScore = radarData.reduce((sum, s) => sum + s.score, 0);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Dashboard ETHI-Call</h1>

      <button
        onClick={handleReset}
        style={{
          marginBottom: "20px",
          padding: "10px 20px",
          backgroundColor: "#fbbf24",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Riparti dall'inizio
      </button>

      {sections.map((section) => (
        <div
          key={section}
          style={{
            marginBottom: "30px",
            padding: "1rem",
            border: "1px solid #ccc",
            borderRadius: "10px",
          }}
        >
          <h2>{section}</h2>
          {questions[section].map((q) => (
            <div key={q.id} style={{ marginBottom: "10px" }}>
              <label>{q.label}</label>
              <br />
              {q.type === "yesno" && (
                <select
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                >
                  <option value="">Seleziona</option>
                  <option value="yes">Sì</option>
                  <option value="no">No</option>
                </select>
              )}
              {q.type === "number" && (
                <input
                  type="number"
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                />
              )}
              {q.type === "percent" && (
                <input
                  type="number"
                  value={answers[q.id]}
                  onChange={(e) => handleChange(q.id, e.target.value)}
                  max="100"
                  min="0"
                />
              )}
            </div>
          ))}
        </div>
      ))}

      <div
        style={{
          marginTop: "2rem",
          padding: "1rem",
          background: "#f0f0f0",
          borderRadius: "10px",
        }}
      >
        <h2>Punteggio Totale: {totalScore}</h2>
      </div>

      <RadarChartEthic data={radarData} />
    </div>
  );
};

export default Dashboard;
