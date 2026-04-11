<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:project-prompt -->
## 🚀 프로젝트: "Multi-Tool Web App" 구축 계획

### 1. 프로젝트 개요
- **목표:** 개인용 유틸리티 도구 모음 웹 앱 제작
- **핵심 기능:**
  1. **단위 환산기:** 일본의 '죠(畳)' 단위를 평방미터(m²) 및 한국의 '평'으로 상호 변환
  2. **QR 코드 생성기:** 텍스트나 URL을 입력받아 즉석에서 QR 코드 생성 및 다운로드
  3. **대시보드 레이아웃:** 탭(Tab) 기반 UI로 여러 도구를 한 페이지에서 전환하며 사용
- **디자인 컨셉:** 깔끔하고 모던한 대시보드 스타일 (Dark/Light 모드 지원)

### 2. 개발 환경 및 에이전트 주의사항 (Session Log)
- **터미널 환경 문제:** AI 에이전트가 `npm` 등의 명령어를 실행할 때, 비대화형 셸(non-interactive shell)의 기본 `$PATH`에 `/usr/local/bin`이 포함되어 있지 않아 `command not found` 에러가 발생합니다.
- **해결 방식:** 명령어를 실행할 때 `export PATH=$PATH:/usr/local/bin`을 접두어로 추가하여 실행하면 `node` 및 `npm`을 정상적으로 사용할 수 있습니다.
- **향후 작업 시 고려사항:** 이제 `npm` 명령어를 사용할 수 있으므로, 필요한 경우 라이브러리 설치(`npm install`)가 가능합니다. 단, 패키지 설치나 스크립트 실행 시 반드시 위와 같이 `$PATH`를 업데이트하는 명령어를 함께 사용해야 합니다.

<!-- END:project-prompt -->