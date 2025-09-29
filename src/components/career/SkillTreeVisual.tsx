import React from "react";
import { CareerResult } from "../../types";
import { ArrowRight } from "lucide-react";

interface Props {
  result: CareerResult;
  onRestart: () => void;
}

export const SkillTreeVisual = ({ result, onRestart }: Props) => (
  <div className="bg-white p-6 rounded-xl shadow-lg border border-green-200">
    <h3 className="text-xl font-bold text-green-700 mb-4">
      Career Recommendation
    </h3>

    <p className="mb-4">
      Based on your answers, we recommend the career path:{" "}
      <span className="font-bold">{result.career}</span> (
      <span className="italic">{result.domain}</span>)
    </p>

    <div className="mb-6">
      <h4 className="font-semibold mb-2">Key Skills:</h4>
      <ul className="list-disc pl-6">
        {result.skills.map((s, idx) => (
          <li key={idx}>{s}</li>
        ))}
      </ul>
    </div>

    <div className="mb-6">
      <h4 className="font-semibold mb-2">Skill Gap:</h4>
      <p>{result.gap}</p>
    </div>

    <p className="italic text-gray-600 mb-6">{result.rationale}</p>

    <button
      onClick={onRestart}
      className="flex items-center justify-center gap-2 w-full bg-indigo-600 text-white py-3 rounded-xl font-bold"
    >
      Restart Career Quiz <ArrowRight className="w-4 h-4" />
    </button>
  </div>
);
