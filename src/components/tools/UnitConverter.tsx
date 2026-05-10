"use client";

import { useMemo, useState } from "react";
import { ResultCard, ToolLayout, SegmentedControl, SectionLabel, ToolInput } from "../shared";
import { useDictionary } from "../i18n/I18nProvider";

export default function UnitConverter() {
  const dict = useDictionary();
  const t = dict.dashboard?.unitConverter || {};

  const [value, setValue] = useState<string>("1");
  const [inputType, setInputType] = useState<string>("jou");

  const results = useMemo(() => {
    if (!value || value === ".") {
      return { jou: "0.00", m2: "0.00", pyeong: "0.00" };
    }
    const num = parseFloat(value);
    if (isNaN(num)) {
      return { jou: "0.00", m2: "0.00", pyeong: "0.00" };
    }

    let m2 = 0;
    if (inputType === "jou") {
      m2 = num * 1.62;
    } else if (inputType === "m2") {
      m2 = num;
    } else if (inputType === "pyeong") {
      m2 = num * 3.305785;
    }

    return {
      jou: (m2 / 1.62).toFixed(2),
      m2: m2.toFixed(2),
      pyeong: (m2 / 3.305785).toFixed(2),
    };
  }, [value, inputType]);

  const units = [
    { id: "jou", label: t.jou ? t.jou.split(' ')[0] : "죠", icon: "🇯🇵" },
    { id: "m2", label: t.m2 ? t.m2.split(' ')[0] : "m²", icon: "📏" },
    { id: "pyeong", label: t.pyeong ? t.pyeong.split(' ')[0] : "평", icon: "🇰🇷" },
  ];

  return (
    <ToolLayout title={t.title} subtitle={t.subtitle}>
        <div className="flex flex-col md:flex-row gap-6 mb-8 items-start">
          <div className="w-full md:w-1/3">
            <SectionLabel accentColor="sky">{t.baseUnitLabel}</SectionLabel>
            <SegmentedControl
              items={units}
              value={inputType}
              onChange={setInputType}
              accentColor="sky"
              columns={3}
            />
          </div>

          <div className="w-full md:w-2/3">
            <SectionLabel accentColor="sky">{t.inputLabel}</SectionLabel>
            <ToolInput
              value={value}
              onChange={setValue}
              placeholder={t.inputPlaceholder}
              accentColor="sky"
              filter="decimal"
              minHeight="74px"
            />
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
    </ToolLayout>
  );
}
