"use client";

import { useState, useEffect } from "react";
import ToolLayout from "../shared/ToolLayout";
import { useDictionary } from "../i18n/I18nProvider";

export default function AgeCalculator() {
  const dict = useDictionary();
  const t = (dict.dashboard as any)?.ageCalculator || {};

  // today's date in YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const [ageType, setAgeType] = useState<"international" | "korean">("international");
  const [birthDate, setBirthDate] = useState<string>("");
  const [referenceDate, setReferenceDate] = useState<string>(today);
  const [calculatedAge, setCalculatedAge] = useState<number | null>(null);

  useEffect(() => {
    if (!birthDate || !referenceDate) {
      setCalculatedAge(null);
      return;
    }

    const birth = new Date(birthDate);
    const ref = new Date(referenceDate);

    if (isNaN(birth.getTime()) || isNaN(ref.getTime())) {
      setCalculatedAge(null);
      return;
    }

    const birthYear = birth.getFullYear();
    const refYear = ref.getFullYear();

    if (ageType === "korean") {
      setCalculatedAge(refYear - birthYear + 1);
    } else {
      let age = refYear - birthYear;
      const m = ref.getMonth() - birth.getMonth();
      if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
        age--;
      }
      setCalculatedAge(age);
    }
  }, [birthDate, referenceDate, ageType]);

  const ageTypes = [
    { id: "international", label: t.internationalAge || "만 나이", icon: "🌍" },
    { id: "korean", label: t.koreanAge || "세는 나이", icon: "🇰🇷" },
  ] as const;

  return (
    <ToolLayout title={t.title || "나이 계산기"} subtitle={t.subtitle || "생년월일을 입력하여 기준일자의 나이를 확인하세요."}>
      <div className="flex flex-col gap-6 mb-8 items-center justify-center max-w-2xl mx-auto w-full">
        <div className="w-full">
          <label className="block text-sm font-medium text-sky-600 dark:text-sky-400 mb-3 text-center transition-colors">
            {t.ageTypeLabel || "나이 종류"}
          </label>
          <div className="flex justify-center gap-4">
            {ageTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setAgeType(type.id as any)}
                className={`py-3 px-6 rounded-xl border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2
                  ${ageType === type.id 
                    ? "bg-sky-600 text-white border-sky-600 shadow-md shadow-sky-600/30 ring-2 ring-sky-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50" 
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"}
                `}
              >
                <span className="text-xl">{type.icon}</span>
                <span>{type.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row w-full gap-6 mt-4">
          <div className="w-full md:w-1/2 group">
            <label className="block text-sm font-medium text-sky-600 dark:text-sky-400 mb-2 transition-colors">
              {t.birthDateLabel || "생년월일"}
            </label>
            <input
              type="date"
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-sky-500 dark:focus:border-sky-500 rounded-xl px-4 py-3 text-lg font-medium outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
          <div className="w-full md:w-1/2 group">
            <label className="block text-sm font-medium text-sky-600 dark:text-sky-400 mb-2 transition-colors">
              {t.referenceDateLabel || "기준일자"}
            </label>
            <input
              type="date"
              value={referenceDate}
              onChange={(e) => setReferenceDate(e.target.value)}
              className="w-full bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-sky-500 dark:focus:border-sky-500 rounded-xl px-4 py-3 text-lg font-medium outline-none transition-all shadow-sm focus:shadow-md"
            />
          </div>
        </div>

        <div className="w-full mt-8 p-8 rounded-2xl bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-sky-900/20 dark:to-indigo-900/20 border border-sky-100 dark:border-sky-800/30 flex flex-col items-center justify-center min-h-[200px] shadow-sm transform transition-all duration-500 hover:shadow-md">
          <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
            {t.resultTitle || "당신의 나이는?"}
          </h3>
          <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 pb-2">
            {calculatedAge !== null 
              ? (t.resultAge || "{age} 살").replace("{age}", calculatedAge.toString())
              : "-"}
          </div>
        </div>
      </div>
    </ToolLayout>
  );
}
