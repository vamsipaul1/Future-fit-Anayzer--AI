import React from "react";
import { Home, Target, Briefcase, Upload } from "lucide-react";

interface Props {
  onNavigate: (page: string) => void;
  currentPage: string;
}

export const Sidebar: React.FC<Props> = ({ onNavigate, currentPage }) => {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "analyze", label: "Analyze Skills", icon: Target },
    { id: "career", label: "Career Path", icon: Briefcase },
    { id: "resume", label: "Resume Scan", icon: Upload },
  ];

  return (
    <aside className="w-64 bg-indigo-700 text-white flex flex-col min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-8">SkillHQ</h1>
      <nav className="flex flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              currentPage === item.id
                ? "bg-indigo-500 font-bold"
                : "hover:bg-indigo-600"
            }`}
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </button>
        ))}
      </nav>
    </aside>
  );
};
