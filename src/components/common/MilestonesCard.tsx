import React from "react";
import { LucideIcon } from "lucide-react";

interface Milestone {
  title: string;
  achieved: boolean;
  color: string;
  icon: LucideIcon;
}

interface Props {
  milestones: Milestone[];
}

export const MilestonesCard = ({ milestones }: Props) => (
  <div className="bg-white p-6 rounded-2xl shadow-xl border border-pink-100 flex flex-col items-center justify-center">
    <h3 className="text-lg font-semibold text-gray-700 mb-4">Your Milestones</h3>
    <div className="flex gap-4">
      {milestones.map((m, idx) => (
        <div
          key={idx}
          className={`flex flex-col items-center ${m.achieved ? "" : "opacity-50"}`}
        >
          <m.icon className={`w-8 h-8 text-white p-2 rounded-full ${m.color}`} />
          <span className="text-xs mt-2 text-gray-600">{m.title}</span>
        </div>
      ))}
    </div>
  </div>
);
