import React, { useState } from "react";
import CoverPage from "./components/CoverPage";
import Section1 from "./components/Section1";
import Section2 from "./components/Section2";
import Section3 from "./components/Section3";
import Section4 from "./components/Section4";
import Section5 from "./components/Section5";
import Section6 from "./components/Section6";
import Section7 from "./components/Section7";
import FinalPage from "./components/FinalPage"; // Import FinalPage

// ✅ Componente interno: ProgressBar (con colore oro)
const ProgressBar: React.FC<{ currentStep: number }> = ({ currentStep }) => {
  const percentage = (currentStep / 7) * 100;

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-semibold">
          Sezione {currentStep} di 7
        </span>
        <span className="text-gray-500">{percentage.toFixed(0)}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="h-3 rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: "#b69624", // colore oro
          }}
        ></div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0); // 0 = Cover Page
  const [scores, setScores] = useState<{ [section: string]: number }>({});
  const [notes, setNotes] = useState<{ [section: string]: string }>({});

  const handleSectionComplete = (
    sectionName: string,
    score: number,
    note: string
  ) => {
    setScores((prevScores) => ({
      ...prevScores,
      [sectionName]: score,
    }));
    setNotes((prevNotes) => ({
      ...prevNotes,
      [sectionName]: note,
    }));
    setCurrentStep((prevStep) => prevStep + 1);
  };

  const handleRestart = () => {
    setScores({});
    setNotes({});
    setCurrentStep(0); // Torna alla CoverPage
  };

  const handleStart = () => {
    setCurrentStep(1); // Inizia da Section1
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Blocco principale */}
      <div className="transition-opacity duration-700 ease-in-out opacity-100">
        {/* CoverPage */}
        {currentStep === 0 && <CoverPage onStart={handleStart} />}

        {/* ProgressBar solo per le sezioni */}
        {currentStep >= 1 && currentStep <= 7 && (
          <ProgressBar currentStep={currentStep} />
        )}

        {/* Sezioni 1-7 */}
        {currentStep === 1 && (
          <Section1
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 1", score, note)
            }
          />
        )}
        {currentStep === 2 && (
          <Section2
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 2", score, note)
            }
          />
        )}
        {currentStep === 3 && (
          <Section3
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 3", score, note)
            }
          />
        )}
        {currentStep === 4 && (
          <Section4
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 4", score, note)
            }
          />
        )}
        {currentStep === 5 && (
          <Section5
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 5", score, note)
            }
          />
        )}
        {currentStep === 6 && (
          <Section6
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 6", score, note)
            }
          />
        )}
        {currentStep === 7 && (
          <Section7
            onComplete={(score, note) =>
              handleSectionComplete("Sezione 7", score, note)
            }
          />
        )}

        {/* FinalPage dopo tutte le sezioni */}
        {currentStep > 7 && (
          <FinalPage scores={scores} notes={notes} onRestart={handleRestart} />
        )}
      </div>
    </div>
  );
};

export default App;
