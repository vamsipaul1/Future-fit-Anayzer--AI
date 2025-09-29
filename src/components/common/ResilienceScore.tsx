import React from "react";

interface Props {
  score: number;
}

export const ResilienceScore: React.FC<Props> = ({ score }) => (
  <div className="text-center">
    <div className="relative inline-flex items-center justify-center w-28 h-28 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-600 text-white font-bold text-2xl shadow-lg">
      {score}%
    </div>
    <h3 className="mt-4 text-lg font-semibold text-gray-700">Resilience Score</h3>
    <p className="text-sm text-gray-500">Your adaptability level</p>
  </div>
);
