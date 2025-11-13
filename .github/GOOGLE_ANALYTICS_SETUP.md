# Google Analytics 설정 가이드

## 1. Google Analytics 계정 생성

### 단계별 가이드:

1. **Google Analytics 사이트 접속**
   - https://analytics.google.com/ 방문
   - Google 계정으로 로그인

2. **계정 생성**
   - "측정 시작" 버튼 클릭
   - 계정 이름 입력: `RBWare`
   - 계정 데이터 공유 설정 선택
   - "다음" 클릭

3. **속성 생성**
   - 속성 이름: `RBWare Docs Platform`
   - 보고 시간대: `대한민국`
   - 통화: `대한민국 원 (₩)`
   - "다음" 클릭

4. **비즈니스 정보 입력**
   - 업종: `소프트웨어 개발`
   - 비즈니스 규모: `소규모(직원 1~10명)`
   - 용도: `웹사이트 사용자 행동 파악`
   - "만들기" 클릭

5. **데이터 스트림 설정**
   - "웹" 선택
   - 웹사이트 URL: `https://rb-ware.github.io/docs-platform/`
   - 스트림 이름: `RBWare Docs Production`
   - "스트림 만들기" 클릭

---

## 2. 측정 ID 확인

생성 완료 후 다음과 같은 형식의 **측정 ID**가 표시됩니다:

```
G-XXXXXXXXXX
```

예시: `G-1234567890`

이 ID를 복사하세요.

---

## 3. 프로젝트에 적용

### 3.1 index.html 수정

`index.html` 파일을 열고 **9번째와 16번째 줄**의 `G-XXXXXXXXXX`를 실제 측정 ID로 교체:

```html
<!-- Google Analytics (GA4) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR-ACTUAL-ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  // GA4 추적 ID 설정
  gtag('config', 'G-YOUR-ACTUAL-ID', {
    'send_page_view': false // SPA이므로 수동 페이지뷰 추적
  });
</script>
```

### 3.2 커밋 및 배포

```bash
git add index.html
git commit -m "feat: add Google Analytics tracking ID"
git push origin main
```

---

## 4. 추적 확인

### 실시간 데이터 확인:

1. Google Analytics 대시보드 접속
2. 왼쪽 메뉴 → **보고서** → **실시간**
3. 배포 완료 후 5-10분 뒤 사이트 방문
4. 실시간 사용자 수 확인

### 추적되는 이벤트:

#### 자동 추적:
- ✅ **페이지뷰**: 페이지 탐색 시
- ✅ **검색**: 문서 검색 시
- ✅ **언어 변경**: 한국어 ↔ 영어 전환 시

#### 이벤트 확인 방법:
1. Google Analytics → **보고서** → **이벤트**
2. 다음 커스텀 이벤트 확인:
   - `page_view`
   - `search` (검색어, 결과 수 포함)
   - `language_change` (이전/새 언어 포함)

---

## 5. 데이터 분석

### 주요 메트릭:

#### 사용자 행동:
- **활성 사용자**: 실시간/일간/주간/월간
- **페이지뷰**: 가장 많이 본 문서
- **검색 키워드**: 사용자가 찾는 내용
- **언어 선호도**: 한국어 vs 영어 비율

#### 트래픽 소스:
- **직접 유입**: URL 직접 입력
- **검색 엔진**: Google, Naver 등
- **참조 사이트**: 링크를 통한 유입

#### 사용자 인구통계:
- **지역**: 국가/도시별 분포
- **기기**: 데스크톱/모바일/태블릿
- **브라우저**: Chrome, Safari, Edge 등

---

## 6. 고급 설정 (선택사항)

### 6.1 커스텀 이벤트 추가

필요한 경우 `js/utils/Analytics.js`에 추가 이벤트를 정의할 수 있습니다:

```javascript
// 예시: PDF 다운로드 추적
trackDownload(fileName) {
  this.track('download', { fileName });

  if (typeof gtag === 'function') {
    gtag('event', 'file_download', {
      file_name: fileName,
      file_type: 'pdf'
    });
  }
}
```

### 6.2 목표 설정

특정 행동을 목표로 설정:

1. Google Analytics → **관리** → **목표**
2. "새 목표" 클릭
3. 예시 목표:
   - **문서 검색**: `search` 이벤트 발생 시
   - **언어 변경**: `language_change` 이벤트 발생 시
   - **체류 시간**: 3분 이상 체류

### 6.3 맞춤 보고서

자주 확인하는 데이터를 맞춤 보고서로 저장:

1. **탐색** 메뉴 선택
2. **자유 형식 탐색** 생성
3. 차원/측정항목 추가:
   - 차원: 페이지 경로, 검색어, 언어
   - 측정항목: 페이지뷰, 이벤트 수, 평균 시간

---

## 7. 개인정보 보호 (GDPR 준수)

현재 설정은 **쿠키 없이** 작동하며 GDPR을 준수합니다:

- ❌ 개인 식별 정보 수집 안 함
- ❌ IP 주소 익명화
- ✅ 집계된 통계 데이터만 수집
- ✅ 사용자 동의 없이 사용 가능

**추가 조치 불필요** (EU 사용자 대상 서비스가 아닌 경우)

---

## 8. 트러블슈팅

### 데이터가 표시되지 않을 때:

1. **측정 ID 확인**
   - `index.html`의 ID가 정확한지 확인
   - Google Analytics 대시보드에서 ID 재확인

2. **배포 확인**
   - GitHub Pages 배포 완료 확인
   - 브라우저 개발자 도구 → 네트워크 탭
   - `gtag/js` 요청이 성공(200)하는지 확인

3. **AdBlock 해제**
   - 광고 차단 프로그램이 GA를 차단할 수 있음
   - 테스트 시 AdBlock 비활성화

4. **실시간 보고서 대기**
   - 데이터가 표시되기까지 5-10분 소요
   - 히스토리 데이터는 24시간 후 반영

### 콘솔 오류 발생 시:

```javascript
// 브라우저 콘솔에서 확인
console.log(typeof gtag); // 'function'이어야 함
```

`undefined`가 출력되면 스크립트 로드 실패 → ID 확인 필요

---

## 9. 비용

**무료 플랜**으로 충분합니다:

- ✅ 월 1천만 이벤트까지 무료
- ✅ 데이터 보관 기간: 14개월
- ✅ 모든 기본 기능 사용 가능

**업그레이드 불필요** (중소규모 문서 사이트)

---

## 10. 참고 자료

- [Google Analytics 공식 문서](https://support.google.com/analytics)
- [GA4 설정 가이드](https://developers.google.com/analytics/devguides/collection/ga4)
- [이벤트 추적 참고](https://developers.google.com/analytics/devguides/collection/ga4/events)

---

**설정 완료 후 확인사항:**
- [ ] 측정 ID 적용 완료
- [ ] 배포 완료
- [ ] 실시간 데이터 확인
- [ ] 이벤트 추적 동작 확인

**문제 발생 시**: `rbware.dev@gmail.com`으로 문의
