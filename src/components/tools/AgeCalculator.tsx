"use client";

import { useMemo, useState } from "react";
import { ToolLayout, ToolForm, ToolField, SegmentedControl, ToolInput, ResultDisplay } from "../shared";
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
      <ToolForm>
        <ToolField label={t.ageTypeLabel || "나이 종류"} accentColor="sky">
          <SegmentedControl
            items={ageTypes}
            value={ageType}
            onChange={setAgeType}
            accentColor="sky"
            columns={2}
          />
        </ToolField>

        <ToolField label={t.birthDateLabel || "생년월일"} accentColor="sky">
          <ToolInput
            value={birthDate}
            onChange={setBirthDate}
            type="date"
            accentColor="sky"
            minHeight="74px"
          />
        </ToolField>

        <ToolField label={t.referenceDateLabel || "기준일자"} accentColor="sky">
          <ToolInput
            value={referenceDate}
            onChange={setReferenceDate}
            type="date"
            accentColor="sky"
            minHeight="74px"
          />
        </ToolField>
      </ToolForm>

      <ResultDisplay
        title={t.resultTitle || "당신의 나이는?"}
        value={
          calculatedAge !== null
            ? (t.resultAge || "{age} 살").replace("{age}", calculatedAge.toString())
            : "-"
        }
        accentColor="sky"
      />
    </ToolLayout>
  );
}
