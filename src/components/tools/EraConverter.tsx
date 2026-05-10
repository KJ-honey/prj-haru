"use client";

import { useState } from "react";
import solarLunar, { type SolarLunarResult } from "solarlunar";
import { ResultCard, ToolLayout, SegmentedControl, SectionLabel, ToolInput, ToolSelect, InputGroup } from "../shared";
import { useDictionary } from "../i18n/I18nProvider";

type CalendarId = "western" | "japanese" | "lunar";
type EraId = "reiwa" | "heisei" | "showa" | "taisho" | "meiji";
type ConversionResults = { western: string; japanese: string; lunar: string };
type Era = { id: EraId; name: string; start: number; startM: number; startD: number; icon: string };

const isSolarLunarResult = (value: SolarLunarResult | -1): value is SolarLunarResult => value !== -1;

export default function EraConverter() {
  const dict = useDictionary();
  const t = dict.dashboard?.eraConverter || {};

  const eras: Era[] = [
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

  const [baseCalendar, setBaseCalendar] = useState<CalendarId>("western");
  const [year, setYear] = useState<string>("2024");
  const [month, setMonth] = useState<string>("12");
  const [day, setDay] = useState<string>("24");

  const [eraId, setEraId] = useState<EraId>("reiwa");

  const isJP = t.westernYearLabel === "西暦";
  const isEN = t.westernYearLabel === "Western";
  const yearSuffix = isEN ? "" : (isJP ? "年" : "년");

  const getMaxEraYear = (targetEraId: EraId) => {
    const eraIndex = eras.findIndex(e => e.id === targetEraId);
    if (eraIndex <= 0) return null;

    const currentEra = eras[eraIndex];
    const nextEra = eras[eraIndex - 1];
    return nextEra.start - currentEra.start + 1;
  };

  const clampJapaneseEraYear = (nextYear: string, targetEraId: EraId) => {
    const maxYear = getMaxEraYear(targetEraId);
    const inputYear = parseInt(nextYear, 10);
    if (!maxYear || isNaN(inputYear) || inputYear <= maxYear) {
      return nextYear;
    }

    return maxYear.toString();
  };

  const handleBaseCalendarChange = (nextCalendar: string) => {
    const calendar = nextCalendar as CalendarId;
    setBaseCalendar(calendar);
    if (calendar === "japanese") {
      setYear(clampJapaneseEraYear(year, eraId));
    }
  };

  const handleEraChange = (nextEraId: string) => {
    const selectedEraId = nextEraId as EraId;
    setEraId(selectedEraId);
    setYear(clampJapaneseEraYear(year, selectedEraId));
  };

  const handleYearChange = (nextYear: string) => {
    setYear(baseCalendar === "japanese" ? clampJapaneseEraYear(nextYear, eraId) : nextYear);
  };

  const getResults = (): ConversionResults => {
    if (!year) {
      return { western: "---", japanese: "---", lunar: "---" };
    }

    const y = parseInt(year, 10);
    const m = parseInt(month || "1", 10);
    const d = parseInt(day || "1", 10);

    if (isNaN(y) || isNaN(m) || isNaN(d) || m < 1 || m > 12 || d < 1 || d > 31) {
      const invalid = t.invalidDate || "Invalid Date";
      return { western: invalid, japanese: invalid, lunar: invalid };
    }

    let wYear = y;
    let wMonth = m;
    let wDay = d;

    if (baseCalendar === "japanese") {
      const selectedEra = eras.find(e => e.id === eraId);
      if (selectedEra) {
        wYear = selectedEra.start + y - 1;
      }
    } else if (baseCalendar === "lunar") {
      const converted = solarLunar.lunar2solar(y, m, d, false);
      if (!isSolarLunarResult(converted)) {
        const invalid = t.invalidDate || "Invalid Date";
        return { western: invalid, japanese: invalid, lunar: invalid };
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
      const e = eras[i];
      const sm = e.startM;
      const sd = e.startD;
      if (wYear > e.start || (wYear === e.start && wMonth > sm) || (wYear === e.start && wMonth === sm && wDay >= sd)) {
        selectedEra = e;
        break;
      }
    }
    const eYear = wYear - selectedEra.start + 1;
    let eYearStr = eYear.toString();
    if (eYear === 1 && isJP) eYearStr = "元";

    const jEraFullName = t.eraYearStr && t.eraYearStr.includes('{era}')
      ? t.eraYearStr.replace('{era}', selectedEra.name).replace('{year}', eYearStr)
      : `${selectedEra.name} ${eYearStr}${yearSuffix}`;

    const japaneseFormatted = isEN
      ? `${jEraFullName} ${wMonth}/${wDay}`
      : `${jEraFullName} ${wMonth}${t.month} ${wDay}${t.day}`;

    // 3. Lunar Formatting
    let lunarFormatted = "---";
    const lunarRes = solarLunar.solar2lunar(wYear, wMonth, wDay);
    if (isSolarLunarResult(lunarRes)) {
      const leapStr = lunarRes.isLeap ? (t.leap || "윤") : "";
      const defaultLunarStr = t.lunarStr || `음력 {year}-{month}-{day}`;
      lunarFormatted = defaultLunarStr
        .replace('{year}', lunarRes.lYear.toString())
        .replace('{month}', `${leapStr}${lunarRes.lMonth}`)
        .replace('{day}', lunarRes.lDay.toString());
    } else {
      lunarFormatted = t.invalidDate || "Invalid Date";
    }

    return { western: westernFormatted, japanese: japaneseFormatted, lunar: lunarFormatted };
  };

  const results = getResults();

  const eraOptions = eras.map(e => ({ value: e.id, label: e.name }));

  return (
    <ToolLayout title={t.title} subtitle={t.subtitle}>
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">

        {/* Base Calendar Selection */}
        <div className="w-full md:w-1/3">
          <SectionLabel accentColor="indigo">{t.baseCalendar || "기준 달력"}</SectionLabel>
            <SegmentedControl
              items={calendars}
              value={baseCalendar}
              onChange={handleBaseCalendarChange}
            accentColor="indigo"
            columns={3}
          />
        </div>

        {/* Date Inputs */}
        <div className="w-full md:w-2/3 relative">
          <SectionLabel accentColor="indigo">
            {calendars.find(c => c.id === baseCalendar)?.label}
          </SectionLabel>

          <div className="flex flex-col sm:flex-row gap-3 items-stretch">

            {/* Prefix (Japanese Era) */}
            {baseCalendar === "japanese" && (
              <ToolSelect
                value={eraId}
                onChange={handleEraChange}
                options={eraOptions}
                accentColor="indigo"
                className="sm:w-1/3"
              />
            )}

            {/* Date Fields */}
            <InputGroup>
              <ToolInput
                value={year}
                onChange={handleYearChange}
                placeholder={t.yearInputPlaceholder}
                accentColor="indigo"
                filter="number"
                suffix={yearSuffix}
                className="flex-1"
              />

              <ToolInput
                value={month}
                onChange={setMonth}
                placeholder={t.monthPlaceholder}
                accentColor="indigo"
                filter="number"
                suffix={t.month || '월'}
                className="w-1/3 hidden sm:block"
              />

              <ToolInput
                value={day}
                onChange={setDay}
                placeholder={t.dayPlaceholder}
                accentColor="indigo"
                filter="number"
                suffix={t.day || '일'}
                className="w-1/3 hidden sm:block"
              />
            </InputGroup>
          </div>

          {/* Mobile Month/Day Input Fallback Layout */}
          <div className="flex gap-2 sm:hidden mt-3">
            <ToolInput
              value={month}
              onChange={setMonth}
              placeholder={t.monthPlaceholder}
              accentColor="indigo"
              filter="number"
              suffix={t.month || '월'}
              className="flex-1"
            />

            <ToolInput
              value={day}
              onChange={setDay}
              placeholder={t.dayPlaceholder}
              accentColor="indigo"
              filter="number"
              suffix={t.day || '일'}
              className="flex-1"
            />
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
