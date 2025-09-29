import React from "react";
import { Cpu } from "lucide-react";

interface Props {
  title?: string;
  subtitle?: string;
}

export const LoadingSpinner: React.FC<Props> = ({
  title = "AI is hard at work...",
  subtitle = "Generating your personalized data insights.",
}) => (
  <div className="flex flex-col items-center justify-center p-12 text-indigo-600 bg-indigo-50/50 rounded-xl shadow-inner border border-indigo-300 animate-bounce-slow">
    <Cpu className="w-10 h-10 animate-pulse mb-3" />
    <p className="text-lg font-semibold">{title}</p>
    <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
  </div>
);
