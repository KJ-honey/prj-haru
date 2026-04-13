"use client";

import { useState, useEffect } from "react";
import ResultCard from "../shared/ResultCard";
import { useDictionary } from "../i18n/I18nProvider";

export default function UnitConverter() {
  const dict = useDictionary();
  const t = dict.dashboard?.unitConverter || {};

  const [value, setValue] = useState<string>("1");
  const [inputType, setInputType] = useState<"jou" | "m2" | "pyeong">("jou");
  const [results, setResults] = useState({ jou: "1.00", m2: "1.62", pyeong: "0.49" });

  useEffect(() => {
    if (!value || value === ".") {
      setResults({ jou: "0.00", m2: "0.00", pyeong: "0.00" });
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResults({ jou: "0.00", m2: "0.00", pyeong: "0.00" });
      return;
    }

    let m2 = 0;
    if (inputType === "jou") {
      m2 = num * 1.62;
    } else if (inputType === "m2") {
      m2 = num;
    } else if (inputType === "pyeong") {
      m2 = num * 3.305785;
    }

    setResults({
      jou: (m2 / 1.62).toFixed(2),
      m2: m2.toFixed(2),
      pyeong: (m2 / 3.305785).toFixed(2),
    });
  }, [value, inputType]);

  const units = [
    { id: "jou", label: t.jou || "일본식 죠 (畳)", icon: "🇯🇵" },
    { id: "m2", label: t.m2 || "평방미터 (m²)", icon: "📏" },
    { id: "pyeong", label: t.pyeong || "한국식 평 (坪)", icon: "🇰🇷" },
  ] as const;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">{t.title}</h2>
        <p className="text-gray-500 dark:text-gray-400">{t.subtitle}</p>
      </div>

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="flex-1 w-full relative group">
            <label className="block text-sm font-medium text-sky-600 dark:text-sky-400 mb-2 transition-colors">{t.inputLabel}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder={t.inputPlaceholder}
              className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-sky-500 dark:focus:border-sky-500 rounded-xl px-4 py-4 text-xl outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-sky-600 dark:text-sky-400 mb-2">{t.baseUnitLabel}</label>
            <div className="grid grid-cols-3 gap-2">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setInputType(u.id)}
                  className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1
                    ${inputType === u.id 
                      ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30" 
                      : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"}`}
                >
                  <span className="text-lg">{u.icon}</span>
                  <span>{u.label.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard 
            label={t.jou || "일본식 죠 (畳)"} 
            value={results.jou} 
            active={inputType === "jou"} 
            icon="🇯🇵" 
            desc="1畳 ≈ 1.62m²" 
            activeColor="sky"
          />
          <ResultCard 
            label={t.m2 || "평방미터 (m²)"} 
            value={results.m2} 
            active={inputType === "m2"} 
            icon="📏" 
            desc="" 
            activeColor="sky"
          />
          <ResultCard 
            label={t.pyeong || "한국식 평 (坪)"} 
            value={results.pyeong} 
            active={inputType === "pyeong"} 
            icon="🇰🇷" 
            desc="1평 ≈ 3.305m²" 
            activeColor="sky"
          />
        </div>
      </div>
    </div>
  );
}
