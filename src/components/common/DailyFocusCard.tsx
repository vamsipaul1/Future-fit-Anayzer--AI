import React from "react";
import { Zap } from "lucide-react";

interface Props {
  focus: {
    title: string;
    subtitle: string;
    icon: string;
    color: string;
    actionText: string;
  };
}

export const DailyFocusCard: React.FC<Props> = ({ focus }) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-yellow-100 flex flex-col items-center justify-center">
    <Zap className={`w-10 h-10 ${focus.color} text-white mb-2 p-1 rounded-full`} />
    <h3 className="text-lg font-semibold text-gray-800">{focus.title}</h3>
    <p className="text-sm text-gray-500 mt-1">{focus.subtitle}</p>
    <button className="mt-3 px-4 py-2 bg-yellow-500 text-white text-sm font-bold rounded-lg shadow hover:bg-yellow-600 transition">
      {focus.actionText}
    </button>
  </div>
);
