"use client";

interface ResultCardProps {
  label: string;
  value: string;
  active: boolean;
  icon: string;
  desc: string;
  activeColor?: "emerald" | "sky" | "indigo";
}

export default function ResultCard({ 
  label, 
  value, 
  active, 
  icon, 
  desc, 
  activeColor = "emerald" 
}: ResultCardProps) {
  const colorMap = {
    emerald: {
      border: "border-emerald-500 ring-emerald-500 dark:border-emerald-500",
      bg: "bg-emerald-100 dark:bg-emerald-900/50",
      text: "text-emerald-700 dark:text-emerald-400",
      shadow: "shadow-[0_0_15px_-3px_rgba(16,185,129,0.3)]"
    },
    sky: {
      border: "border-sky-500 ring-sky-500 dark:border-sky-500",
      bg: "bg-sky-100 dark:bg-sky-900/50",
      text: "text-sky-700 dark:text-sky-400",
      shadow: "shadow-[0_0_15px_-3px_rgba(14,165,233,0.3)]"
    },
    indigo: {
      border: "border-indigo-500 ring-indigo-500 dark:border-indigo-500",
      bg: "bg-indigo-100 dark:bg-indigo-900/50",
      text: "text-indigo-700 dark:text-indigo-400",
      shadow: "shadow-[0_0_15px_-3px_rgba(99,102,241,0.3)]"
    }
  };

  const selectedColor = colorMap[activeColor];

  return (
    <div className={`p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-between h-full bg-white dark:bg-gray-900 group hover:-translate-y-1 hover:shadow-lg
      ${active 
        ? `${selectedColor.border} ${selectedColor.shadow} ring-1` 
        : "border-gray-100 dark:border-gray-800"}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-2xl mb-1 block">{icon}</span>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        </div>
        {active && (
          <span className={`px-2 py-1 ${selectedColor.bg} ${selectedColor.text} text-xs font-bold rounded-full`}>
            입력 기준
          </span>
        )}
      </div>
      <div>
        <p className="text-xl lg:text-2xl font-extrabold text-gray-900 dark:text-white break-words whitespace-normal line-clamp-2" title={value}>{value}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{desc}</p>
      </div>
    </div>
  );
}
