"use client";

import { useState, useEffect } from "react";

export default function CurrencyConverter() {
  const [value, setValue] = useState<string>("1");
  const [inputType, setInputType] = useState<"usd" | "krw" | "jpy">("usd");
  const [results, setResults] = useState({ usd: "1.00", krw: "1350", jpy: "150" });

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
      usd = num / 1350;
    } else if (inputType === "jpy") {
      usd = num / 150;
    }

    setResults({
      usd: usd.toFixed(2),
      krw: Math.round(usd * 1350).toLocaleString(),
      jpy: Math.round(usd * 150).toLocaleString(),
    });
  }, [value, inputType]);

  const units = [
    { id: "jpy", label: "일본 엔 (¥)", icon: "🇯🇵" },
    { id: "krw", label: "한국 원 (₩)", icon: "🇰🇷" },
    { id: "usd", label: "미국 달러 ($)", icon: "🇺🇸" },
  ] as const;

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">환율 계산기 (Currency Converter)</h2>
        <p className="text-gray-500 dark:text-gray-400">엔화, 원화, 달러를 손쉽게 상호 변환하세요. (참고용 환율)</p>
      </div>

      <div className="bg-white/40 dark:bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/20 dark:border-white/10 shadow-xl">
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-center">
          <div className="flex-1 w-full relative group">
            <label className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 transition-colors">변환 기준값</label>
            <input
              type="text"
              value={value}
              onChange={(e) => setValue(e.target.value.replace(/[^0-9.]/g, ''))}
              placeholder="숫자를 입력하세요"
              className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-blue-500 dark:focus:border-blue-500 rounded-xl px-4 py-4 text-xl outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
          
          <div className="flex-1 w-full">
            <label className="block text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">기준 통화</label>
            <div className="grid grid-cols-3 gap-2">
              {units.map((u) => (
                <button
                  key={u.id}
                  onClick={() => setInputType(u.id)}
                  className={`py-3 px-2 rounded-xl border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1
                    ${inputType === u.id 
                      ? "bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-600/30" 
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
          <ResultCard label="일본 엔 (JPY)" value={`¥${results.jpy}`} active={inputType === "jpy"} icon="🇯🇵" desc="100¥ ≈ 900₩" />
          <ResultCard label="한국 원 (KRW)" value={`₩${results.krw}`} active={inputType === "krw"} icon="🇰🇷" desc="1,350₩ ≈ $1" />
          <ResultCard label="미국 달러 (USD)" value={`$${results.usd}`} active={inputType === "usd"} icon="🇺🇸" desc="$1 ≈ 150¥" />
        </div>
      </div>
    </div>
  );
}

function ResultCard({ label, value, active, icon, desc }: { label: string, value: string, active: boolean, icon: string, desc: string }) {
  return (
    <div className={`p-5 rounded-2xl border transition-all duration-500 flex flex-col justify-between h-full bg-white dark:bg-gray-900 group hover:-translate-y-1 hover:shadow-lg
      ${active 
        ? "border-sky-500 shadow-[0_0_15px_-3px_rgba(14,165,233,0.3)] ring-1 ring-sky-500 dark:border-sky-500" 
        : "border-gray-100 dark:border-gray-800"}`}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-2xl mb-1 block">{icon}</span>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
        </div>
        {active && <span className="px-2 py-1 bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-400 text-xs font-bold rounded-full">입력 기준</span>}
      </div>
      <div>
        <p className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-white truncate" title={value}>{value}</p>
        <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">{desc}</p>
      </div>
    </div>
  );
}
