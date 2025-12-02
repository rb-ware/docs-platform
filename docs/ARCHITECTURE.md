# RBWare Docs Platform - Architecture Guide

> **목적**: Claude 또는 다른 AI 어시스턴트가 이 프로젝트를 빠르게 이해하고 작업할 수 있도록 작성된 문서

---

## 1. 프로젝트 개요

RBWare 용접 로봇 제품의 기술 문서 플랫폼. Vite 기반 SPA로 마크다운 콘텐츠를 렌더링하며, GitHub Pages에 배포됨.

| 항목 | 값 |
|------|-----|
| 프레임워크 | Vanilla JS + Vite |
| 스타일링 | Tailwind CSS (PostCSS 빌드) |
| 마크다운 | Marked.js |
| 배포 | GitHub Pages |
| URL | https://rb-ware.github.io/docs-platform/ |

---

## 2. 디렉토리 구조

```
docs-platform/
├── index.html                 # SPA 진입점
├── package.json               # 의존성 및 스크립트
├── vite.config.js             # Vite 빌드 설정
├── tailwind.config.js         # Tailwind 설정 (커스텀 색상)
├── postcss.config.js          # PostCSS 파이프라인
│
├── js/                        # JavaScript 모듈
│   ├── app.js                 # 앱 진입점
│   ├── config.js              # 전역 설정 (환경, 경로, 보안)
│   ├── core/
│   │   ├── App.js             # 메인 오케스트레이터 (라우팅, 네비게이션)
│   │   └── Router.js          # URL 파싱 및 네비게이션
│   ├── services/
│   │   ├── ContentService.js  # 마크다운 로딩 및 렌더링
│   │   └── SearchService.js   # 검색 인덱스 및 쿼리
│   ├── ui/
│   │   ├── Header.js          # 헤더 컴포넌트
│   │   ├── LandingPage.js     # 랜딩 페이지 생성
│   │   └── Sidebar.js         # 사이드바 네비게이션
│   └── utils/
│       ├── ErrorHandler.js    # 에러 추적
│       ├── Analytics.js       # GA4 이벤트 트래킹
│       ├── Logger.js          # 구조화된 로깅
│       └── ImageOptimizer.js  # 이미지 지연 로딩
│
├── css/                       # 스타일시트
│   ├── main.css               # Tailwind 임포트 + prose 스타일
│   └── theme.css              # 전역 레이아웃 (헤더, 사이드바)
│
├── public/                    # 정적 파일 (빌드 시 복사됨)
│   ├── manifest.json          # 사이드바 메뉴 구조
│   ├── search_index.json      # 검색 인덱스
│   ├── favicon.svg
│   ├── components/
│   │   └── header.html        # 헤더 HTML 템플릿
│   ├── assets/
│   │   └── images/            # 이미지 파일
│   └── content/
│       ├── landing/
│       │   ├── ko.json        # 랜딩 페이지 (한글)
│       │   └── en.json        # 랜딩 페이지 (영문)
│       └── v1.0/
│           ├── ko/            # 한글 마크다운
│           │   ├── device_setup/
│           │   ├── setup/
│           │   ├── welding-machine/
│           │   ├── extension/
│           │   ├── tools/
│           │   └── etc/
│           └── en/            # 영문 마크다운 (동일 구조)
│
└── dist/                      # 빌드 결과물 (gitignore)
```

### 중요: 콘텐츠 경로

- **유일한 콘텐츠 위치**: `/public/content/`
- 빌드 시 `/dist/content/`로 복사됨
- 개발 서버: `http://localhost:3000/content/...`
- 프로덕션: `https://rb-ware.github.io/docs-platform/content/...`

---

## 3. 스타일링 아키텍처

### 3.1 전역 스타일 (css/theme.css)

| 요소 | 스타일 |
|------|--------|
| 헤더 | `position: fixed`, `height: 64px`, `z-index: 1000` |
| 사이드바 | 모바일: 슬라이드 인/아웃, 데스크톱: 항상 표시 (≥768px) |
| 콘텐츠 영역 | 사이드바 있을 때 `margin-left: 256px` |

### 3.2 마크다운 스타일 (css/main.css)

`.prose` 클래스 내부에 마크다운 렌더링 스타일 정의:
- 타이포그래피 (h1-h4, p, a, strong)
- 코드 블록 (인라인, pre)
- 테이블 (기본 + feature-table 커스텀)
- 블록쿼트 (빨간 왼쪽 테두리)
- 리스트, 이미지

### 3.3 컴포넌트별 스타일

**Feature Support Table** (css/main.css 하단):
```css
.prose .feature-table { ... }      /* 테이블 기본 */
.prose .feature-table .app { ... } /* App 셀 (초록) */
.prose .feature-table .pc { ... }  /* PC 셀 (노랑) */
.prose .feature-table .none { ... } /* 미지원 셀 (회색) */
```

### 3.4 스타일 우선순위

1. Tailwind 유틸리티 클래스 (인라인)
2. `.prose` 마크다운 스타일
3. `theme.css` 전역 레이아웃
4. 컴포넌트별 CSS (`.feature-table` 등)

**주의**: 마크다운 내 `<style>` 태그는 작동하지 않음. 커스텀 스타일은 반드시 `css/main.css`에 추가.

---

## 4. 라우팅 시스템

### 4.1 URL 구조

| 환경 | 방식 | 예시 |
|------|------|------|
| 개발 | Hash | `http://localhost:3000/#/extension/jump` |
| 프로덕션 | Hash | `https://rb-ware.github.io/docs-platform/#/extension/jump` |

### 4.2 네비게이션 플로우

```
URL 변경 → Router.parseRoute() → App.handleNavigation()
         → ContentService.loadContent() → 마크다운 렌더링
         → Sidebar 활성 상태 업데이트
```

### 4.3 언어 관리

- 저장: `localStorage.lang`
- 기본값: `'ko'`
- URL에 포함되지 않음
- 변경 시: 사이드바 재초기화 + 콘텐츠 리로드

---

## 5. 콘텐츠 관리

### 5.1 manifest.json 구조

```json
{
  "version": "v1.0",
  "languages": ["ko", "en"],
  "categories": [
    {
      "id": "etc",
      "key": "etc",
      "order": 5,
      "title": { "ko": "기타", "en": "Etc" },
      "items": [
        {
          "key": "feature_support",
          "slug": "etc/feature-support",
          "title": { "ko": "용접기 기능 지원 목록", "en": "Feature Support List" }
        }
      ]
    }
  ]
}
```

### 5.2 카테고리 (order 순)

| Order | ID | 한글 | 영문 |
|-------|-----|------|------|
| 0 | device_setup | 장비 세팅 | Device Setup |
| 1 | setup | 설정 | Setup |
| 2 | welding_machine | 용접기 | Welding Machine |
| 3 | extension | 확장 기능 | Extension |
| 4 | tools | Tool | Tools |
| 5 | etc | 기타 | Etc |

### 5.3 새 문서 추가 방법

1. 마크다운 파일 생성:
   - `/public/content/v1.0/ko/{category}/{slug}.md`
   - `/public/content/v1.0/en/{category}/{slug}.md`

2. manifest.json에 항목 추가:
   ```json
   {
     "key": "new_doc",
     "slug": "category/new-doc",
     "title": { "ko": "새 문서", "en": "New Document" }
   }
   ```

---

## 6. Git 워크플로우

### 6.1 브랜치 전략

| 브랜치 | 용도 |
|--------|------|
| `main` | 프로덕션 (직접 push) |
| `dev` | 개발 (선택적 사용) |

### 6.2 커밋 규칙 (Claude 표시 없이)

```bash
# 1. 변경 사항 확인
git status
git diff

# 2. 스테이징
git add <files>

# 3. 커밋 (Claude 표시 없이)
git commit -m "feat: add new feature

- Detail 1
- Detail 2"

# 4. 푸시
git push origin main
```

**커밋 메시지 타입:**
- `feat:` 새 기능
- `fix:` 버그 수정
- `docs:` 문서
- `style:` 스타일 (기능 변경 없음)
- `refactor:` 리팩토링
- `chore:` 기타

### 6.3 주의사항

- Co-Authored-By 줄 포함하지 않음
- 이모지 사용하지 않음
- 한 줄 요약 + 상세 내용 형식

---

## 7. 개발 명령어

```bash
# 개발 서버 (http://localhost:3000)
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 번들 분석
npm run build:analyze

# 테스트
npm test
```

---

## 8. 주요 서비스

### 8.1 ContentService.js

```javascript
// 마크다운 로딩
loadContent(slug, lang)
// 예: loadContent('extension/jump', 'ko')
// → /public/content/v1.0/ko/extension/jump.md 로드
```

**기능:**
- 슬러그 유효성 검사 (경로 탈출 방지)
- 마크다운 → HTML 변환 (Marked.js)
- 이미지 경로 동적 변환
- 푸터 자동 추가

### 8.2 SearchService.js

```javascript
// 검색 초기화
initSearch(lang)
```

**기능:**
- `search_index.json` 로드
- 타이틀/설명 기반 검색
- XSS 방지 (입력 새니타이징)
- 검색어 하이라이팅

### 8.3 Sidebar.js

```javascript
// 사이드바 초기화
initSidebar(lang, onSelectCallback)
```

**기능:**
- manifest.json 기반 메뉴 생성
- 카테고리 접기/펼치기
- 활성 항목 하이라이팅

---

## 9. 환경 설정 (config.js)

### 9.1 환경 감지

```javascript
isProduction = window.location.hostname.includes('github.io')
```

### 9.2 주요 설정

| 설정 | 개발 | 프로덕션 |
|------|------|----------|
| basePath | `./` | `/docs-platform/` |
| useHashRouting | true | true |
| logLevel | DEBUG | INFO |

### 9.3 보안 설정

```javascript
security: {
  slugPattern: /^[a-zA-Z0-9\-_\/]+$/,
  maxPathDepth: 3
}
```

---

## 10. 커스텀 테이블 스타일 (Feature Support Table)

### 10.1 사용법

마크다운 파일에서:
```html
<div class="table-container">
<table class="feature-table">
  <thead>...</thead>
  <tbody>
    <tr>
      <td class="menu-col">메뉴명</td>
      <td class="feature-col">기능명</td>
      <td class="app">App</td>
      <td class="pc">PC</td>
      <td class="none" title="툴팁 메시지">-</td>
    </tr>
  </tbody>
</table>
</div>
```

### 10.2 CSS 클래스

| 클래스 | 용도 | 색상 |
|--------|------|------|
| `.table-container` | 스크롤 컨테이너 (max-height: 70vh) | - |
| `.feature-table` | 테이블 기본 스타일 | - |
| `.header-mig` | MIG 헤더 | 파랑 (#0369a1) |
| `.header-laser` | Laser 헤더 | 보라 (#7c3aed) |
| `.menu-col` | 메뉴 열 | 진회색 (#334155) |
| `.feature-col` | 기능 열 | 연회색 (#f8fafc) |
| `.app` | App 지원 | 연두색 (#dcfce7) |
| `.pc` | PC 전용 | 노랑 (#fef3c7) |
| `.none` | 미지원 | 회색 (#f1f5f9) |

### 10.3 Sticky 헤더

- 첫 번째 헤더 행: `top: 0`
- 두 번째 헤더 행: `top: 27px`
- `border-collapse: separate` 필수 (collapse는 sticky와 충돌)

---

## 11. 트러블슈팅

### 11.1 스타일이 적용되지 않음

**원인**: 마크다운 내 `<style>` 태그는 무시됨
**해결**: `css/main.css`에 스타일 추가

### 11.2 테이블 레이아웃 깨짐

**원인**: `.prose table`에 `display: block` 적용됨
**해결**: `.prose .feature-table { display: table !important; }`

### 11.3 Sticky 헤더 작동 안함

**원인**: `border-collapse: collapse` 사용
**해결**: `border-collapse: separate; border-spacing: 0;`

### 11.4 이미지 경로 오류

**원인**: 상대 경로가 환경별로 다름
**해결**: ContentService에서 자동 변환됨. 마크다운에서는 `../assets/images/...` 사용

---

## 12. 체크리스트

### 새 문서 추가 시

- [ ] 한글 마크다운 생성 (`/public/content/v1.0/ko/...`)
- [ ] 영문 마크다운 생성 (`/public/content/v1.0/en/...`)
- [ ] manifest.json에 항목 추가
- [ ] 개발 서버에서 확인
- [ ] 커밋 및 푸시

### 스타일 추가 시

- [ ] `css/main.css`에 추가 (마크다운 내 style 태그 X)
- [ ] `.prose` 선택자 사용 (마크다운 콘텐츠 내)
- [ ] 기존 스타일과 충돌 확인
- [ ] 반응형 확인 (768px 브레이크포인트)

### 배포 전

- [ ] `npm run build` 성공 확인
- [ ] 로컬 프리뷰 확인 (`npm run preview`)
- [ ] Git 커밋 (Claude 표시 없이)
- [ ] `git push origin main`

---

## 13. 유틸리티 시스템

### 13.1 에러 트래킹 (ErrorHandler.js)

```javascript
import { ErrorHandler, ErrorCategory, ErrorSeverity } from './utils/ErrorHandler.js';

ErrorHandler.capture(error, {
  category: ErrorCategory.NETWORK,  // NETWORK, CONTENT, NAVIGATION, SEARCH, UI
  severity: ErrorSeverity.HIGH,     // LOW, MEDIUM, HIGH, CRITICAL
  context: { url },
  showUser: true
});

// 디버깅: __errorHandler.getStats()
```

### 13.2 로깅 (Logger.js)

```javascript
import { Logger } from './utils/Logger.js';

Logger.debug('Debug message');  // 개발 환경만
Logger.info('Info message');
Logger.warn('Warning');
Logger.error('Error');

// 디버깅: __logger.getLogs()
```

### 13.3 이미지 최적화 (ImageOptimizer.js)

- Lazy Loading: `data-src` 속성 사용
- 빌드 시 자동 압축 (vite-plugin-imagemin)

```html
<img data-src="path/to/image.png" alt="설명" loading="lazy" />
```

---

## 14. CI/CD 파이프라인

### 워크플로우 파일 (.github/workflows/)

| 파일 | 트리거 | 역할 |
|------|--------|------|
| test.yml | PR | 테스트 + 번들 사이즈 체크 |
| deploy.yml | main push | 빌드 → GitHub Pages 배포 |
| lighthouse.yml | PR/main | 성능 점수 체크 |

### 배포 플로우

```
git push origin main
  → test.yml (테스트)
  → deploy.yml (빌드 + 배포)
  → GitHub Pages 업데이트
```

---

## 15. 연락처

- **Repository**: https://github.com/rb-ware/docs-platform
- **Issues**: https://github.com/rb-ware/docs-platform/issues

---

*최종 업데이트: 2025.12.02*
