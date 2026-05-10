"use client";

import { useMemo, useState } from "react";
import { ToolLayout, SegmentedControl, SectionLabel, ToolInput, ResultDisplay } from "../shared";
import { useDictionary } from "../i18n/I18nProvider";

export default function AgeCalculator() {
  const dict = useDictionary();
  const t = dict.dashboard.ageCalculator;

  // today's date in YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  const [ageType, setAgeType] = useState<string>("international");
  const [birthDate, setBirthDate] = useState<string>("");
  const [referenceDate, setReferenceDate] = useState<string>(today);

  const calculatedAge = useMemo(() => {
    if (!birthDate || !referenceDate) {
      return null;
    }

    const birth = new Date(birthDate);
    const ref = new Date(referenceDate);

    if (isNaN(birth.getTime()) || isNaN(ref.getTime())) {
      return null;
    }

    const birthYear = birth.getFullYear();
    const refYear = ref.getFullYear();

    if (ageType === "korean") {
      return refYear - birthYear + 1;
    }

    let age = refYear - birthYear;
    const m = ref.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && ref.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  }, [birthDate, referenceDate, ageType]);

  const ageTypes = [
    { id: "international", label: t.internationalAge || "만 나이", icon: "🌍" },
    { id: "korean", label: t.koreanAge || "세는 나이", icon: "🇰🇷" },
  ];

  return (
    <ToolLayout title={t.title || "나이 계산기"} subtitle={t.subtitle || "생년월일을 입력하여 기준일자의 나이를 확인하세요."}>
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
        {/* Age Type Selection */}
        <div className="w-full md:w-1/3">
          <SectionLabel accentColor="sky">
            {t.ageTypeLabel || "나이 종류"}
          </SectionLabel>
          <SegmentedControl
            items={ageTypes}
            value={ageType}
            onChange={setAgeType}
            accentColor="sky"
            columns={2}
          />
        </div>

        {/* Birth Date */}
        <div className="w-full md:w-1/3">
          <SectionLabel accentColor="sky">
            {t.birthDateLabel || "생년월일"}
          </SectionLabel>
          <ToolInput
            value={birthDate}
            onChange={setBirthDate}
            type="date"
            accentColor="sky"
            minHeight="74px"
          />
        </div>

        {/* Reference Date */}
        <div className="w-full md:w-1/3">
          <SectionLabel accentColor="sky">
            {t.referenceDateLabel || "기준일자"}
          </SectionLabel>
          <ToolInput
            value={referenceDate}
            onChange={setReferenceDate}
            type="date"
            accentColor="sky"
            minHeight="74px"
          />
        </div>
      </div>

      <ResultDisplay accentColor="sky">
        <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-4">
          {t.resultTitle || "당신의 나이는?"}
        </h3>
        <div className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-sky-600 to-indigo-600 dark:from-sky-400 dark:to-indigo-400 pb-2">
          {calculatedAge !== null 
            ? (t.resultAge || "{age} 살").replace("{age}", calculatedAge.toString())
            : "-"}
        </div>
      </ResultDisplay>
    </ToolLayout>
  );
}
