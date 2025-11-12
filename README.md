
# RBWare Docs Platform

문서 사이트를 위한 정적 웹 애플리케이션입니다. Vanilla JS 기반이며 GitHub Pages로 배포됩니다. 다국어/버전 구조, 사이드바 구성, 검색 인덱스를 정적 자원으로 관리합니다.

## 핵심 특징
- TailwindCSS CDN 기반의 경량 정적 사이트
- 버전(`v1.0`)·언어(`ko`, `en`) 별 콘텐츠 디렉토리
- `manifest.json`으로 사이드바 트리 구성
- Hash 기반 라우팅(로컬) / 정적 경로(배포) 하이브리드
- `search_index.json`을 이용한 클라이언트 사이드 검색

## 디렉토리 구조
- `assets/` 이미지 및 동영상 에셋
  - `images/{components,extensions,setup,tools}/`
  - `Video/`
- `content/v1.0/{ko,en}/` 버전/언어별 마크다운 콘텐츠
  - `device_setup/`, `extension/`, `setup/`, `system/`, `tools/`, `etc/`
- `components/`
  - `header.html` 공통 헤더 조각
- `css/`
  - `theme.css` 전역 스타일
- `js/`
  - `app.js` 진입점(헤더/사이드바 초기화 및 라우팅)
  - `header.js` 헤더 로딩
  - `sidebar.js` 사이드바 생성/동작
  - `content.js` 콘텐츠 로더
  - `search.js` 검색 UI/로직
  - `utils.js` 공용 유틸리티
  - `landing-content.js` 랜딩 처리
- `index.html` 메인 엔트리(배포 시 base 경로 자동 설정)
- `manifest.json` 사이드바 및 라우팅 메타
- `search_index.json` 검색 인덱스(정적)

## 로컬 개발
정적 서버로 띄워 확인하면 됩니다. 가장 간단한 방법:
```bash
# Python 3
python3 -m http.server 8080
# 또는 Node (serve 설치 시)
npx serve .
```
브라우저에서 `http://localhost:8080` 접속.

로컬에서는 hash 라우팅을 사용합니다(`/#/slug` 형태). 배포 환경(GitHub Pages)에서는 `/<repo>/<lang>/<slug>` 정적 경로를 사용하도록 `index.html`에서 base 경로를 자동 처리합니다.

## 배포(프로덕션)
GitHub Pages 기준:
- `main` 브랜치에 머지되면 Pages가 정적 파일을 서빙
- `index.html`의 스크립트가 `github.io` 호스트에서 자동으로 `<base href="/docs-platform/">`를 주입
- 404 핸들링을 위해 쿼리 파라미터 `?p=`를 실제 경로로 치환하는 로직 포함

## 콘텐츠 작성 가이드
1. 위치
   - 한국어: `content/v1.0/ko/...`
   - 영어: `content/v1.0/en/...`
2. 형식
   - 마크다운(.md) 사용, 문서 내부에서 HTML 블록 사용 가능
   - 이미지 경로는 문서 위치 기준 상대 경로 사용 예)  
     `../../../assets/images/extensions/Jump_To.jpg`
3. 사이드바 등록
   - `manifest.json`에 카테고리/아이템을 추가
   - `slug`는 실제 파일 경로와 매핑되며, 로컬에서는 `/#/{slug}`, 배포에서는 `/{lang}/{slug}`로 접근
4. 파일/폴더 네이밍
   - 하이픈 소문자 권장(`multi-pass.md`)  
   - 카테고리 폴더는 고정: `device_setup`, `extension`, `setup`, `system`, `tools`, `etc`

## 검색 인덱스
- `search_index.json`은 정적 자원으로 로드됩니다.
- 신규 문서를 추가하면 검색에 반영하려면 해당 파일을 갱신해야 합니다.
- 현재 자동 생성 스크립트는 포함되어 있지 않습니다. 내부 도구 또는 수동 업데이트를 사용하세요.

## 프런트엔드 구성 요소
- 레이아웃: `index.html` + Tailwind CDN
- 고정 헤더: `components/header.html`을 `header.js`에서 주입
- 사이드바: `sidebar.js`가 `manifest.json`을 로드해 메뉴 생성
- 콘텐츠 로딩: `content.js`가 slug에 맞는 `.md`를 페치 후 렌더
- 검색: `search.js`가 `search_index.json` 기반으로 클라이언트 측 검색 제공

## 스타일 가이드
- 공통 스타일은 `css/theme.css`에서 관리
- 스크롤 동작은 유지하되, UI 스크롤바는 숨김 처리(`sidebar` 및 `sidebarMenu`)
- Tailwind 유틸리티 클래스와 커스텀 CSS를 병행

## 품질/검수 체크리스트
- 새 문서 추가 시:
  - [ ] 사이드바 노출 확인(`manifest.json`)
  - [ ] 로컬 hash 라우팅 및 배포 경로 모두 확인
  - [ ] 이미지 경로/대체 텍스트 확인
  - [ ] 검색 인덱스 반영 필요 시 `search_index.json` 업데이트
  - [ ] 한국어/영문 문서 동기화 여부 점검(해당 시)

## 라이선스
사내 전용 리포지토리입니다. 외부 배포/공개 금지.
