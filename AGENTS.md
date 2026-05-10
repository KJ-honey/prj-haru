<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-prompt -->
## 🚀 프로젝트: "prj-haru" 구축 계획

### 1. 프로젝트 개요
- **목표:** 개인용 유틸리티 도구 모음 웹 앱 제작
- **핵심 기능:**
  1. **단위 환산기:** 일본의 '죠(畳)' 단위를 평방미터(m²) 및 한국의 '평'으로 상호 변환
  2. **대시보드 레이아웃:** 탭(Tab) 기반 UI로 여러 도구를 한 페이지에서 전환하며 사용
- **디자인 컨셉:** 깔끔하고 모던한 대시보드 스타일 (Dark/Light 모드 지원)

### 2. 개발 환경 및 에이전트 주의사항 (Session Log)
- **터미널 환경 문제:** AI 에이전트가 `npm` 등의 명령어를 실행할 때, 비대화형 셸(non-interactive shell)의 기본 `$PATH`에 `/usr/local/bin`이 포함되어 있지 않아 `command not found` 에러가 발생합니다.
- **해결 방식:** 명령어를 실행할 때 `export PATH=$PATH:/usr/local/bin`을 접두어로 추가하여 실행하면 `node` 및 `npm`을 정상적으로 사용할 수 있습니다.
- **향후 작업 시 고려사항:** 이제 `npm` 명령어를 사용할 수 있으므로, 필요한 경우 라이브러리 설치(`npm install`)가 가능합니다. 단, 패키지 설치나 스크립트 실행 시 반드시 위와 같이 `$PATH`를 업데이트하는 명령어를 함께 사용해야 합니다.
- **UI 구현 사항:** 새 툴을 추가할 때 **반드시** `src/components/shared/`의 공용 컴포넌트를 사용해야 합니다. 인라인으로 동일한 UI를 재구현하는 것을 금지합니다. 아래 "공용 UI 컴포넌트 가이드" 섹션을 필수적으로 참고하세요.
- **브라우저 영속화 관리 (Persistence Session Log):**
  - **테마:** `next-themes`를 통해 `localStorage`에 자동 영속화됨 (Key: `theme`).
  - **언어:** URL Path (`/[lang]/...`)를 통해 상태가 유지됨.
  - **참고:** 현재 탭 상태 및 사용자 입력값은 영속화되지 않으며, 필요 시 `localStorage` 기반의 추가 구현이 필요함.

### 3. 공용 UI 컴포넌트 가이드 (필수)

> **⚠️ 중요: 새 툴을 추가하거나 기존 툴을 수정할 때, 아래 공용 컴포넌트를 반드시 사용해야 합니다.**
> **인라인으로 버튼, 입력 필드, 라벨 등을 직접 구현하는 것을 금지합니다.**

모든 공용 컴포넌트는 `src/components/shared/`에 위치하며, 배럴 export(`src/components/shared/index.ts`)를 통해 임포트합니다.

```tsx
import { ToolLayout, SegmentedControl, SectionLabel, ToolInput, ToolSelect, InputGroup, ResultCard, ResultDisplay } from "../shared";
```

#### 컴포넌트 목록 및 용도

| 컴포넌트 | 파일 | 용도 | 필수 여부 |
|---|---|---|---|
| `ToolLayout` | `ToolLayout.tsx` | 모든 툴의 최상위 래퍼. 제목/부제목 + 컨텐츠 영역 | **필수** |
| `SegmentedControl` | `SegmentedControl.tsx` | Base 선택 버튼 그룹 (icon 위 + label 아래 카드형) | 선택 항목이 있으면 **필수** |
| `SectionLabel` | `SectionLabel.tsx` | 입력 필드 위의 섹션 라벨 | **필수** |
| `ToolInput` | `ToolInput.tsx` | 텍스트/날짜 입력 필드 (suffix, filter 지원) | 입력이 있으면 **필수** |
| `ToolSelect` | `ToolSelect.tsx` | 드롭다운 셀렉트 | 드롭다운이 있으면 **필수** |
| `InputGroup` | `InputGroup.tsx` | 여러 입력 필드를 가로 배치하는 wrapper | 복수 입력 배치 시 사용 |
| `ResultCard` | `ResultCard.tsx` | 결과 표시 카드 (icon + label + value + desc) | 복수 결과 표시 시 **필수** |
| `ResultDisplay` | `ResultDisplay.tsx` | 히어로 스타일 단일 결과 패널 | 단일 큰 결과 표시 시 사용 |

#### 공통 Props: `accentColor`

모든 컴포넌트는 `accentColor` prop을 지원합니다. 값: `"sky"` | `"emerald"` | `"indigo"`
- 하나의 툴 안에서는 **동일한 accentColor**를 사용해야 합니다.

#### SegmentedControl 사용 규칙

```tsx
<SegmentedControl
  items={[{ id: "option1", label: "옵션1", icon: "🌍" }, ...]}
  value={selectedValue}
  onChange={setValue}
  accentColor="sky"
  columns={3}  // 2, 3, 4 지원
/>
```

- `columns`: 항목 수에 맞게 지정 (2개 → `columns={2}`, 3개 → `columns={3}`)
- 모든 선택 버튼은 이 컴포넌트를 사용해야 합니다. 자체 버튼을 만들지 마세요.

#### ToolInput 사용 규칙

```tsx
<ToolInput
  value={value}
  onChange={setValue}
  placeholder="입력하세요"
  accentColor="sky"
  type="text"       // "text" | "date"
  suffix="년"       // 입력 필드 우측 suffix (선택)
  filter="number"   // "number" | "decimal" | "none"
  minHeight="56px"  // 기본값 56px
/>
```

#### 새 툴 추가 시 체크리스트
1. `ToolLayout`으로 전체 감싸기
2. 선택 항목이 있으면 `SegmentedControl` 사용
3. 모든 라벨은 `SectionLabel` 사용
4. 모든 입력은 `ToolInput` 또는 `ToolSelect` 사용
5. 결과 표시는 `ResultCard` 또는 `ResultDisplay` 사용
6. 다국어 지원: `useDictionary()` 훅으로 번역 문자열 사용

<!-- END:project-prompt -->