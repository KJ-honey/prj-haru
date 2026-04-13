"use client";

import { useState, useEffect } from "react";
import ResultCard from "../shared/ResultCard";
import ToolLayout from "../shared/ToolLayout";
import { useDictionary } from "../i18n/I18nProvider";

export default function EraConverter() {
  const dict = useDictionary();
  const t = dict.dashboard?.eraConverter || {};

  const eras = [
    { id: "reiwa", name: t.reiwa || "Reiwa", start: 2019, startM: 5, startD: 1, icon: "🌸" },
    { id: "heisei", name: t.heisei || "Heisei", start: 1989, startM: 1, startD: 8, icon: "🗼" },
    { id: "showa", name: t.showa || "Showa", start: 1926, startM: 12, startD: 25, icon: "📻" },
    { id: "taisho", name: t.taisho || "Taisho", start: 1912, startM: 7, startD: 30, icon: "🚂" },
    { id: "meiji", name: t.meiji || "Meiji", start: 1868, startM: 10, startD: 23, icon: "🏯" }
  ];

  const calendars = [
    { id: "western", label: t.westernYearLabel || "Western", icon: "🌍" },
    { id: "japanese", label: t.japaneseEraLabel || "Japanese Era", icon: "🌸" },
    { id: "lunar", label: t.lunar || "Lunar", icon: "🌙" }
  ];

  const [baseCalendar, setBaseCalendar] = useState<string>("western");
  const [year, setYear] = useState<string>("2024");
  const [month, setMonth] = useState<string>("12");
  const [day, setDay] = useState<string>("24");

  const [eraId, setEraId] = useState<string>("reiwa");

  const [results, setResults] = useState<{ western: string, japanese: string, lunar: string }>({
    western: "---",
    japanese: "---",
    lunar: "---"
  });

  const isJP = t.westernYearLabel === "西暦";
  const isEN = t.westernYearLabel === "Western";
  const yearSuffix = isEN ? "" : (isJP ? "年" : "년");

  useEffect(() => {
    if (!year) {
      setResults({ western: "---", japanese: "---", lunar: "---" });
      return;
    }

    const y = parseInt(year, 10);
    const m = parseInt(month || "1", 10);
    const d = parseInt(day || "1", 10);

    if (isNaN(y) || isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) {
      const invalid = t.invalidDate || "Invalid Date";
      setResults({ western: invalid, japanese: invalid, lunar: invalid });
      return;
    }

    let wYear = y;
    let wMonth = m;
    let wDay = d;

    let sl: any = null;
    try {
      const reqSl = require("solarlunar");
      sl = reqSl.default || reqSl;
    } catch (e) {
      console.warn("solarlunar not loaded");
    }

    if (baseCalendar === "japanese") {
      const selectedEra = eras.find(e => e.id === eraId);
      if (selectedEra) {
        wYear = selectedEra.start + y - 1;
      }
    } else if (baseCalendar === "lunar" && sl) {
      const converted = sl.lunar2solar(y, m, d, false);
      if (typeof converted === "number" || !converted) {
        const invalid = t.invalidDate || "Invalid Date";
        setResults({ western: invalid, japanese: invalid, lunar: invalid });
        return;
      }
      wYear = converted.cYear;
      wMonth = converted.cMonth;
      wDay = converted.cDay;
    }

    // 1. Western Formatting
    const wYearStr = t.westernYearStr ? t.westernYearStr.replace('{year}', wYear.toString()) : `${wYear}년`;
    const westernFormatted = isEN
      ? `${wYearStr} ${wMonth}/${wDay}`
      : `${wYearStr} ${wMonth}${t.month} ${wDay}${t.day}`;

    // 2. Japanese Formatting
    let selectedEra = eras[eras.length - 1]; // Default to Meiji
    for (let i = 0; i < eras.length; i++) {
      const e = eras[i] as any;
      const sm = e.startM || 1;
      const sd = e.startD || 1;
      if (wYear > e.start || (wYear === e.start && wMonth > sm) || (wYear === e.start && wMonth === sm && wDay >= sd)) {
        selectedEra = e;
        break;
      }
    }
    const eYear = wYear - selectedEra.start + 1;
    let eYearStr = eYear.toString();
    if (eYear === 1 && isJP) eYearStr = "元";

    let jEraFullName = t.eraYearStr && t.eraYearStr.includes('{era}')
      ? t.eraYearStr.replace('{era}', selectedEra.name).replace('{year}', eYearStr)
      : `${selectedEra.name} ${eYearStr}${yearSuffix}`;

    // Add icon optionally, maybe skip inside pure text
    let japaneseFormatted = isEN
      ? `${jEraFullName} ${wMonth}/${wDay}`
      : `${jEraFullName} ${wMonth}${t.month} ${wDay}${t.day}`;

    // 3. Lunar Formatting
    let lunarFormatted = "---";
    if (sl) {
      const lunarRes = sl.solar2lunar(wYear, wMonth, wDay);
      if (typeof lunarRes !== "number" && lunarRes) {
        const leapStr = lunarRes.isLeap ? (t.leap || "윤") : "";
        let defaultLunarStr = t.lunarStr || `음력 {year}-{month}-{day}`;
        lunarFormatted = defaultLunarStr
          .replace('{year}', lunarRes.lYear.toString())
          .replace('{month}', `${leapStr}${lunarRes.lMonth}`)
          .replace('{day}', lunarRes.lDay.toString());
      } else {
        lunarFormatted = t.invalidDate || "Invalid Date";
      }
    }

    setResults({ western: westernFormatted, japanese: japaneseFormatted, lunar: lunarFormatted });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [baseCalendar, year, month, day, eraId, dict]);

  return (
    <ToolLayout title={t.title} subtitle={t.subtitle}>
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">

        {/* Base Calendar Selection */}
        <div className="w-full md:w-1/3">
          <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">{t.baseCalendar || "기준 달력"}</label>
          <div className="grid grid-cols-3 gap-2">
            {calendars.map((c) => (
              <button
                key={c.id}
                onClick={() => setBaseCalendar(c.id)}
                className={`py-3 px-1 rounded-[14px] border text-sm font-semibold transition-all duration-300 hover:scale-105 active:scale-95 flex flex-col items-center justify-center gap-1.5
                    ${baseCalendar === c.id
                    ? "bg-indigo-600 text-white border-indigo-600 shadow-md shadow-indigo-600/30 ring-2 ring-indigo-600/20 ring-offset-2 ring-offset-white/50 dark:ring-offset-black/50"
                    : "bg-white/60 dark:bg-gray-800/60 text-gray-700 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:bg-white dark:hover:bg-gray-700"}`}
              >
                <span className="text-xl">{c.icon}</span>
                <span className="truncate w-full text-center px-1">{c.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date Inputs */}
        <div className="w-full md:w-2/3 relative">
          <label className="block text-sm font-medium text-indigo-600 dark:text-indigo-400 mb-3">
            {calendars.find(c => c.id === baseCalendar)?.label}
          </label>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">

            {/* Prefix (Japanese Era / Lunar Leap) */}
            {baseCalendar === "japanese" && (
              <div className="sm:w-1/3 relative group">
                <select
                  value={eraId}
                  onChange={(e) => setEraId(e.target.value)}
                  className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-lg outline-none transition-all shadow-sm focus:shadow-md cursor-pointer appearance-none"
                >
                  {eras.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-indigo-500 group-hover:text-indigo-600 transition-colors">
                  ▼
                </div>
              </div>
            )}

            {/* Date Fields */}
            <div className="flex-1 flex gap-2">
              <div className="relative flex-1 group">
                <input
                  type="text"
                  value={year}
                  onChange={(e) => setYear(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t.yearInputPlaceholder}
                  className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md pr-10"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors group-focus-within:text-indigo-400">
                  {yearSuffix}
                </div>
              </div>

              <div className="relative w-1/3 group hidden sm:block">
                <input
                  type="text"
                  value={month}
                  onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t.monthPlaceholder}
                  className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md pr-10"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors group-focus-within:text-indigo-400">
                  {t.month || '월'}
                </div>
              </div>

              <div className="relative w-1/3 group hidden sm:block">
                <input
                  type="text"
                  value={day}
                  onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder={t.dayPlaceholder}
                  className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md pr-10"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors group-focus-within:text-indigo-400">
                  {t.day || '일'}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Month/Day Input Fallback Layout */}
          <div className="flex gap-2 sm:hidden mt-3">
            <div className="relative flex-1 group">
              <input
                type="text"
                value={month}
                onChange={(e) => setMonth(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder={t.monthPlaceholder}
                className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md pr-10"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors group-focus-within:text-indigo-400">
                {t.month || '월'}
              </div>
            </div>

            <div className="relative flex-1 group">
              <input
                type="text"
                value={day}
                onChange={(e) => setDay(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder={t.dayPlaceholder}
                className="w-full h-full min-h-[56px] bg-white/70 dark:bg-gray-900/50 text-gray-900 dark:text-white border-2 border-transparent focus:border-indigo-500 dark:focus:border-indigo-500 rounded-xl px-4 py-3 text-xl font-medium outline-none transition-all shadow-sm focus:shadow-md pr-10"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500 font-bold select-none pointer-events-none transition-colors group-focus-within:text-indigo-400">
                {t.day || '일'}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <ResultCard
          label={t.westernYearLabel}
          value={results.western}
          active={baseCalendar === "western"}
          icon="🌍"
          desc="Gregorian Calendar"
          activeColor="indigo"
        />
        <ResultCard
          label={t.japaneseEraLabel}
          value={results.japanese}
          active={baseCalendar === "japanese"}
          icon="🌸"
          desc="Japanese Era Calendar"
          activeColor="indigo"
        />
        <ResultCard
          label={t.lunar}
          value={results.lunar}
          active={baseCalendar === "lunar"}
          icon="🌙"
          desc="Traditional Lunar Calendar"
          activeColor="indigo"
        />
      </div>
    </ToolLayout>
  );
}
