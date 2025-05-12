"use client";

import { useEffect, useState } from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

// Supponiamo che tu riceva i punteggi dalla tua logica di dashboard
const scores = {
  visioneEtica: 85,
  governanceEtica: 78,
  espansioneEtica: 92,
  innovazioneEtica: 74,
  impattiEtici: 88,
  culturaEtica: 81,
  resilienzaEtica: 90,
};

export default function DashboardEthicRadar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const radarData = [
      { section: "Visione Etica", score: scores.visioneEtica },
      { section: "Governance Etica", score: scores.governanceEtica },
      { section: "Espansione Etica", score: scores.espansioneEtica },
      { section: "Innovazione Etica", score: scores.innovazioneEtica },
      { section: "Impatti Etici", score: scores.impattiEtici },
      { section: "Cultura Etica", score: scores.culturaEtica },
      { section: "Resilienza Etica", score: scores.resilienzaEtica },
    ];
    setData(radarData);
  }, []);

  return (
    <div className="w-full h-96 p-4">
      <h2 className="text-xl font-semibold text-center mb-4">Radar Etico</h2>
      <ResponsiveContainer>
        <RadarChart data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="section" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} />
          <Radar
            name="Punteggio Etico"
            dataKey="score"
            stroke="black"
            fill="black"
            fillOpacity={0.3}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
