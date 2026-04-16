"use client";

import { useState, useEffect } from "react";
import { ResultCard, ToolLayout, SegmentedControl, SectionLabel, ToolInput } from "../shared";
import { useDictionary } from "../i18n/I18nProvider";

export default function CurrencyConverter() {
  const dict = useDictionary();
  const cDict = dict.dashboard.currencyConverter;
  
  const [value, setValue] = useState<string>("1");
  const [inputType, setInputType] = useState<string>("usd");
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
    { id: "jpy", label: cDict.jpy, icon: "🇯🇵" },
    { id: "krw", label: cDict.krw, icon: "🇰🇷" },
    { id: "usd", label: cDict.usd, icon: "🇺🇸" },
  ];

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
            <SectionLabel accentColor="emerald">{cDict.baseCurrencyLabel}</SectionLabel>
            <SegmentedControl
              items={units}
              value={inputType}
              onChange={setInputType}
              accentColor="emerald"
              columns={3}
            />
          </div>

          <div className="w-full md:w-2/3">
            <SectionLabel accentColor="emerald">{cDict.inputLabel}</SectionLabel>
            <ToolInput
              value={value}
              onChange={setValue}
              placeholder={cDict.inputPlaceholder}
              accentColor="emerald"
              filter="decimal"
              minHeight="74px"
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
