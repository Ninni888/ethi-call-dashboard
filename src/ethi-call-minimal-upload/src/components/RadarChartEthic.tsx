import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";

interface RadarChartEthicProps {
  data: { section: string; score: number }[];
}

const RadarChartEthic: React.FC<RadarChartEthicProps> = ({ data }) => {
  const sectionLabels = [
    "1. Responsabilità etica",
    "2. Diritti universali",
    "3. Diritti dei lavoratori",
    "4. Ambiente",
    "5. Famiglia scelta",
    "6. Comunicazione etica",
    "7. Innovazione etica",
  ];

  const labeledData = data.map((entry, index) => ({
    section: sectionLabels[index] || entry.section,
    score: Math.round(entry.score * 10),
  }));

  return (
    <>
      <h2
        className="text-3xl font-extrabold text-center"
        style={{ color: "#b69624" }}
      >
        Radar Etico – Sintesi delle 7 Sezioni
      </h2>

      <ResponsiveContainer width="100%" height={400}>
        <RadarChart data={labeledData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="section" />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tickCount={6} />
          <Radar
            name="Punteggio Etico"
            dataKey="score"
            stroke="#fbbf24"
            fill="#fbbf24"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>
    </>
  );
};

export default RadarChartEthic;
