"use client";

import { useState, useEffect } from "react";
import ResultCard from "../shared/ResultCard";
import { useDictionary } from "../i18n/I18nProvider";

export default function EraConverter() {
  const dict = useDictionary();
  const t = dict.dashboard?.eraConverter || {};

  const eras = [
    { id: "western", name: t.westernYearLabel || "Western", start: 0, icon: "🌍" },
    { id: "reiwa", name: t.reiwa || "Reiwa", start: 2019, icon: "🌸" },
    { id: "heisei", name: t.heisei || "Heisei", start: 1989, icon: "🗼" },
    { id: "showa", name: t.showa || "Showa", start: 1926, icon: "📻" },
    { id: "taisho", name: t.taisho || "Taisho", start: 1912, icon: "🚂" },
    { id: "meiji", name: t.meiji || "Meiji", start: 1868, icon: "🏯" }
  ];

  const [value, setValue] = useState<string>("2024");
  const [inputType, setInputType] = useState<string>("western");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!value) {
      setResults({});
      return;
    }
    const num = parseInt(value, 10);
    if (isNaN(num)) {
      setResults({});
      return;
    }

    let wYear = num;
    if (inputType !== "western") {
      const selectedEra = eras.find(e => e.id === inputType);
      if (selectedEra) {
        wYear = selectedEra.start + num - 1;
      }
    }

    const newResults: Record<string, string> = {
      western: wYear.toString()
    };

    eras.slice(1).forEach(era => {
      const eraYear = wYear - era.start + 1;
      if (eraYear > 0) {
        newResults[era.id] = eraYear.toString();
      } else {
        newResults[era.id] = "---";
      }
    });

    setResults(newResults);
  }, [value, inputType]);

  const getFormattedResult = (id: string) => {
    const val = results[id];
    if (!val || val === "---") return "---";
    
    if (id === "western") {
      return t.westernYearStr ? t.westernYearStr.replace('{year}', val) : `${val}年`;
    }
    
    let yStr = val;
    if (val === "1" && t.westernYearLabel === "西暦") yStr = "元";
    
    const eraName = eras.find(e => e.id === id)?.name || "";
    if (t.eraYearStr) {
      return t.eraYearStr.replace('{era}', eraName).replace('{year}', yStr);
    }
    return `${eraName} ${yStr}年`;
  };

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="flex-1 w-full relative group">
            <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2 transition-colors">
              {inputType === "western" ? t.westernYearLabel : t.japaneseEraLabel}
            </label>
            <div className="relative">
              <input
                type="text"
                value={value}
                onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder={inputType === "western" ? t.yearInputPlaceholder : t.eraYearPlaceholder}
                className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-4 text-xl outline-none transition-all shadow-sm focus:shadow-md pr-12"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-medium select-none pointer-events-none">
                年
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-2">{t.japaneseEraLabel}</label>
            <div className="grid grid-cols-3 gap-2">
              {eras.slice(0, 6).map((u) => (
                <button
                  key={u.id}
                  onClick={() => setInputType(u.id)}
                  className={`py-2 px-1 rounded-xl border text-xs font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1
                    ${inputType === u.id 
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30" 
                      : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  <span className="text-base">{u.icon}</span>
                  <span className="truncate w-full text-center px-1">{u.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <ResultCard 
            label={t.westernYearLabel} 
            value={getFormattedResult("western")} 
            active={inputType === "western"} 
            icon="🌍" 
            desc="" 
            activeColor="indigo"
          />
          <ResultCard 
            label={t.reiwa} 
            value={getFormattedResult("reiwa")} 
            active={inputType === "reiwa"} 
            icon="🌸" 
            desc="2019 ~" 
            activeColor="indigo"
          />
          <ResultCard 
            label={t.heisei} 
            value={getFormattedResult("heisei")} 
            active={inputType === "heisei"} 
            icon="🗼" 
            desc="1989 ~ 2019" 
            activeColor="indigo"
          />
          <ResultCard 
            label={t.showa} 
            value={getFormattedResult("showa")} 
            active={inputType === "showa"} 
            icon="📻" 
            desc="1926 ~ 1989" 
            activeColor="indigo"
          />
        </div>
      </div>
    </div>
  );
}
