import React, { useState } from "react";
import { useGemini } from "../../hooks/useGemini";
import { MOCK_CAREER_QUESTIONS } from "../../constants/mockData";
import { CAREER_SYSTEM_PROMPT } from "../../constants/systemPrompts";
import { CAREER_PATH_SCHEMA } from "../../constants/schemas";
import { CareerResult } from "../../types";
import { LoadingSpinner } from "../common/LoadingSpinner";

interface Props {
  onComplete: (result: CareerResult) => void;
}

export const CareerQuiz = ({ onComplete }: Props) => {
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const ai = useGemini({
    systemPrompt: CAREER_SYSTEM_PROMPT,
    responseSchema: CAREER_PATH_SCHEMA,
  });

  const handleSubmit = () => {
    ai.run("Analyze career answers").then((res) => {
      if (res) onComplete(res as CareerResult);
    });
  };

  if (ai.loading) {
    return <LoadingSpinner title="Analyzing your career path..." />;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-indigo-200">
      <h3 className="text-xl font-bold text-indigo-700 mb-6">
        Career Path Quiz
      </h3>

      {MOCK_CAREER_QUESTIONS.map((q) => (
        <div key={q.id} className="mb-6">
          <p className="font-semibold mb-3">{q.text}</p>
          <div className="flex gap-3">
            {q.options.map((opt) => (
              <button
                key={opt}
                onClick={() =>
                  setAnswers((prev) => ({ ...prev, [q.id]: opt }))
                }
                className={`px-4 py-2 rounded-lg border ${
                  answers[q.id] === opt
                    ? "bg-indigo-600 text-white border-indigo-600"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={Object.keys(answers).length < MOCK_CAREER_QUESTIONS.length}
        className="w-full bg-green-600 text-white py-3 rounded-xl font-bold disabled:opacity-50"
      >
        Submit Answers
      </button>
    </div>
  );
};
