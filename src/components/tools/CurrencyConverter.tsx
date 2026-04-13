"use client";

import { useState, useEffect } from "react";
import ResultCard from "../shared/ResultCard";
import ToolLayout from "../shared/ToolLayout";
import { useDictionary } from "../i18n/I18nProvider";

export default function CurrencyConverter() {
  const dict = useDictionary();
  const cDict = dict.dashboard.currencyConverter;
  
  const [value, setValue] = useState<string>("1");
  const [inputType, setInputType] = useState<"usd" | "krw" | "jpy">("usd");
  const [results, setResults] = useState({ usd: "1.00", krw: "1350", jpy: "150" });
  const [rates, setRates] = useState({ KRW: 1350, JPY: 150 });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchRates() {
      try {
        const res = await fetch("https://api.exchangerate-api.com/v4/latest/USD");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setRates({
          KRW: data.rates.KRW,
          JPY: data.rates.JPY,
        });
      } catch (error) {
        console.error("Failed to fetch rates, fallback used:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchRates();
  }, []);

  useEffect(() => {
    if (!value || value === ".") {
      setResults({ usd: "0.00", krw: "0", jpy: "0" });
      return;
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      setResults({ usd: "0.00", krw: "0", jpy: "0" });
      return;
    }

    let usd = 0;
    if (inputType === "usd") {
      usd = num;
    } else if (inputType === "krw") {
      usd = num / rates.KRW;
    } else if (inputType === "jpy") {
      usd = num / rates.JPY;
    }

    setResults({
      usd: usd.toFixed(2),
      krw: Math.round(usd * rates.KRW).toLocaleString(),
      jpy: Math.round(usd * rates.JPY).toLocaleString(),
    });
  }, [value, inputType, rates]);

  const units = [
    { id: "jpy", label: cDict.jpyLabel, icon: "🇯🇵", short: cDict.jpy },
    { id: "krw", label: cDict.krwLabel, icon: "🇰🇷", short: cDict.krw },
    { id: "usd", label: cDict.usdLabel, icon: "🇺🇸", short: cDict.usd },
  ] as const;

  const subtitleContent = (
    <>
      {cDict.description}
      {isLoading ? (
        <span className="text-indigo-500 ml-2 animate-pulse font-medium">{cDict.loadingRates}</span>
      ) : (
        <span className="text-emerald-500 ml-2 font-medium">{cDict.ratesApplied}</span>
      )}
    </>
  );

  return (
    <ToolLayout title={cDict.title} subtitle={subtitleContent}>
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3">{cDict.baseCurrencyLabel}</label>
            <div className="grid grid-cols-3 gap-2">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setInputType(u.id)}
                  className={`py-3 px-1 rounded-[14px] border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1.5
                    ${inputType === u.id 
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md shadow-emerald-600/30 ring-2 ring-emerald-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50" 
                      : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"}`}
                >
                  <span className="text-xl">{u.icon}</span>
                  <span className="truncate w-full text-center px-1">{u.short}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="w-full md:w-2/3 relative group">
            <label className="block text-sm font-medium text-emerald-600 dark:text-emerald-400 mb-3 transition-colors">{cDict.inputLabel}</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder={cDict.inputPlaceholder}
              className="w-full h-full min-h-[74px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-emerald-500 dark:focus:border-emerald-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ResultCard 
            label={cDict.jpyLabel} 
            value={`¥${results.jpy}`} 
            active={inputType === "jpy"} 
            icon="🇯🇵" 
            desc={`100¥ ≈ ${Math.round(100 / rates.JPY * rates.KRW).toLocaleString()}${cDict.krw}`} 
            activeColor="emerald"
          />
          <ResultCard 
            label={cDict.krwLabel} 
            value={`₩${results.krw}`} 
            active={inputType === "krw"} 
            icon="🇰🇷" 
            desc={`${Math.round(rates.KRW).toLocaleString()}${cDict.krw} ≈ $1`} 
            activeColor="emerald"
          />
          <ResultCard 
            label={cDict.usdLabel} 
            value={`$${results.usd}`} 
            active={inputType === "usd"} 
            icon="🇺🇸" 
            desc={`$1 ≈ ${Math.round(rates.JPY).toLocaleString()}¥`} 
            activeColor="emerald"
          />
        </div>
    </ToolLayout>
  );
}
