# 📊 에러 트래킹 & 분석 가이드

RBWare Docs Platform의 에러 트래킹 및 사용자 분석 시스템 가이드입니다.

## 🎯 시스템 개요

### 핵심 특징
- ✅ **외부 의존성 없음** - 순수 자체 구축
- ✅ **Privacy-first** - 개인정보 수집 안함, 쿠키 없음
- ✅ **GDPR 준수** - 익명 데이터만 수집
- ✅ **무료** - 외부 서비스 비용 없음
- ✅ **실무 표준** - 중앙 집중식 아키텍처

---

## 📁 구조

```
js/utils/
├── ErrorHandler.js   # 에러 트래킹 시스템
├── Logger.js         # 구조화된 로깅
└── Analytics.js      # 사용자 행동 분석
```

---

## 1️⃣ ErrorHandler (에러 트래킹)

### 기능
- 전역 에러 캡처 (window.error, unhandledrejection)
- 에러 분류 (카테고리, 심각도)
- 에러 저장 (메모리 + LocalStorage)
- 사용자 친화적 에러 메시지
- 실시간 에러 통계

### 사용법

#### 기본 사용
```javascript
import { ErrorHandler, ErrorCategory, ErrorSeverity } from './utils/ErrorHandler.js';

// 에러 캡처
try {
  // 위험한 작업
  await fetchData();
} catch (error) {
  ErrorHandler.capture(error, {
    category: ErrorCategory.NETWORK,
    severity: ErrorSeverity.HIGH,
    context: { url: '/api/data' },
    showUser: true  // 사용자에게 토스트 표시
  });
}
```

#### 에러 카테고리
```javascript
ErrorCategory = {
  NETWORK: 'network',     // 네트워크 오류
  CONTENT: 'content',     // 콘텐츠 로딩 오류
  NAVIGATION: 'navigation', // 네비게이션 오류
  SEARCH: 'search',       // 검색 오류
  UI: 'ui',               // UI 오류
  UNKNOWN: 'unknown'      // 알 수 없음
}
```

#### 에러 심각도
```javascript
ErrorSeverity = {
  LOW: 'low',           // 낮음 (무시 가능)
  MEDIUM: 'medium',     // 중간 (주의)
  HIGH: 'high',         // 높음 (즉시 확인)
  CRITICAL: 'critical'  // 치명적 (앱 중단)
}
```

#### 편의 메서드
```javascript
import { captureException, captureMessage } from './utils/ErrorHandler.js';

// Exception 캡처 (자동으로 HIGH + showUser)
captureException(error, { url: '/api/users' });

// 메시지 캡처
captureMessage('Unexpected state', {
  severity: ErrorSeverity.MEDIUM,
  context: { state: currentState }
});
```

### 에러 조회

```javascript
// 모든 에러
const errors = ErrorHandler.getErrors();

// 필터링
const networkErrors = ErrorHandler.getErrors({
  category: ErrorCategory.NETWORK
});

const criticalErrors = ErrorHandler.getErrors({
  severity: ErrorSeverity.CRITICAL
});

// 통계
const stats = ErrorHandler.getStats();
console.log(stats);
// {
//   total: 42,
//   byCategory: { network: 10, content: 32 },
//   bySeverity: { high: 5, medium: 37 },
//   recent: [...]
// }
```

### 디버깅 (개발 환경)

```javascript
// 브라우저 콘솔에서
window.__errorHandler = ErrorHandler;

// 모든 에러 보기
__errorHandler.getErrors();

// 통계
__errorHandler.getStats();

// 클리어
__errorHandler.clear();
```

---

## 2️⃣ Logger (구조화된 로깅)

### 기능
- 로그 레벨 관리 (DEBUG, INFO, WARN, ERROR)
- 개발/프로덕션 환경 분리
- 컬러 코딩 (개발 환경)
- 로그 저장 및 다운로드

### 사용법

#### 기본 로깅
```javascript
import { Logger } from './utils/Logger.js';

// DEBUG (개발 환경만)
Logger.debug('User clicked button', { button: 'submit' });

// INFO
Logger.info('Page loaded', { path: window.location.pathname });

// WARN
Logger.warn('Slow API response', { duration: 3000 });

// ERROR
Logger.error('Failed to save', { error: error.message });
```

#### 로그 레벨 설정
```javascript
import { LogLevel } from './utils/Logger.js';

// 개발: 모든 로그 표시
Logger.setLevel(LogLevel.DEBUG);

// 프로덕션: INFO 이상만
Logger.setLevel(LogLevel.INFO);

// 로그 완전 비활성화
Logger.setLevel(LogLevel.NONE);
```

#### 로그 조회

```javascript
// 최근 로그
const logs = Logger.getLogs();

// 에러만
const errors = Logger.getLogs({ level: 'ERROR' });

// 특정 시간 이후
const recent = Logger.getLogs({
  since: new Date('2025-01-01')
});

// 통계
const stats = Logger.getStats();
```

#### 로그 다운로드 (디버깅)

```javascript
// JSON 파일로 다운로드
Logger.downloadLogs();
// → logs_2025-01-12T12:34:56.789Z.json
```

### 프로덕션 동작

```javascript
// 개발 환경
Logger.debug('Test');  // ✅ 콘솔 출력
Logger.info('Info');   // ✅ 콘솔 출력
Logger.warn('Warn');   // ✅ 콘솔 출력

// 프로덕션 환경
Logger.debug('Test');  // ❌ 무시
Logger.info('Info');   // ✅ 메모리 저장만
Logger.warn('Warn');   // ✅ 메모리 + LocalStorage
Logger.error('Error'); // ✅ 메모리 + LocalStorage
```

---

## 3️⃣ Analytics (사용자 행동 분석)

### 기능
- 페이지 뷰 추적
- 검색 쿼리 분석
- 사용자 네비게이션 패턴
- 성능 메트릭
- **Privacy-first**: 개인정보 없음, 쿠키 없음

### 사용법

#### 페이지 뷰
```javascript
import { Analytics } from './utils/Analytics.js';

// 자동 초기화 (App.js에서)
Analytics.init();

// 페이지 뷰 추적
Analytics.trackPageView('/ko/setup/installation');
```

#### 검색 추적
```javascript
// 검색 쿼리와 결과 수
Analytics.trackSearch('welding', 5);
```

#### 네비게이션 추적
```javascript
// 페이지 이동
Analytics.trackNavigation('/ko', '/ko/setup/guide');
```

#### 언어 변경 추적
```javascript
Analytics.trackLanguageChange('ko', 'en');
```

#### 커스텀 이벤트
```javascript
Analytics.track('custom_event', {
  action: 'click',
  target: 'download_button'
});
```

### 통계 조회

```javascript
const stats = Analytics.getStats();

console.log(stats);
// {
//   sessionId: 'sess_1234567890_abc123',
//   totalEvents: 150,
//   byType: {
//     page_view: 45,
//     search: 30,
//     navigation: 75
//   },
//   topPages: [
//     { url: '/ko/setup/installation', count: 20 },
//     { url: '/ko/extension/weaving', count: 15 }
//   ],
//   topSearches: [
//     { query: 'welding', count: 10 },
//     { query: 'setup', count: 8 }
//   ],
//   averageSessionTime: 245 // 초
// }
```

### 데이터 다운로드

```javascript
// JSON 파일로 다운로드
Analytics.downloadStats();
// → analytics_2025-01-12T12:34:56.789Z.json
```

### Privacy 보장

```javascript
// ✅ 수집하는 것
- 페이지 URL
- 검색 키워드 (소문자 변환)
- 세션 시간
- 브라우저 언어

// ❌ 수집 안하는 것
- IP 주소
- 사용자 이름
- 이메일
- 쿠키
- 개인 식별 정보
```

---

## 🛠️ 실무 사용 패턴

### 1. 네트워크 요청

```javascript
async function fetchData(url) {
  try {
    Logger.info(`Fetching: ${url}`);

    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    Logger.debug('Fetch successful', { url, status: res.status });
    return await res.json();

  } catch (error) {
    ErrorHandler.capture(error, {
      category: ErrorCategory.NETWORK,
      severity: ErrorSeverity.HIGH,
      context: { url },
      showUser: true
    });

    throw error;
  }
}
```

### 2. 사용자 액션

```javascript
function handleButtonClick() {
  Logger.debug('Button clicked', { button: 'submit' });

  try {
    // 비즈니스 로직
    submitForm();

    Analytics.track('form_submit', {
      formId: 'contact'
    });

  } catch (error) {
    ErrorHandler.capture(error, {
      category: ErrorCategory.UI,
      severity: ErrorSeverity.MEDIUM,
      showUser: true
    });
  }
}
```

### 3. 페이지 네비게이션

```javascript
async function navigateTo(path) {
  const previousPath = window.location.pathname;

  try {
    Logger.info(`Navigating: ${previousPath} → ${path}`);

    // 네비게이션 로직
    await loadPage(path);

    // 추적
    Analytics.trackNavigation(previousPath, path);
    Analytics.trackPageView(path);

  } catch (error) {
    ErrorHandler.capture(error, {
      category: ErrorCategory.NAVIGATION,
      severity: ErrorSeverity.HIGH,
      context: { from: previousPath, to: path },
      showUser: true
    });
  }
}
```

---

## 📈 대시보드 (개발 환경)

브라우저 콘솔에서 사용 가능:

```javascript
// 에러 대시보드
console.table(__errorHandler.getStats().byCategory);

// 최근 에러
__errorHandler.getErrors().slice(-5);

// 로그 대시보드
console.table(__logger.getStats().byLevel);

// 최근 로그
__logger.getLogs().slice(-10);

// 분석 대시보드
console.table(__analytics.getStats().topPages);
console.table(__analytics.getStats().topSearches);
```

---

## 🔔 에러 알림 (사용자)

심각한 에러 발생 시 자동으로 토스트 표시:

```javascript
ErrorHandler.capture(error, {
  severity: ErrorSeverity.CRITICAL,
  showUser: true  // 토스트 표시
});
```

토스트 메시지는 자동으로 한국어/영어로 표시:
- ✅ 네트워크 오류
- ✅ 콘텐츠 로딩 실패
- ✅ 예기치 않은 오류

---

## 🚀 확장하기

### 외부 서비스 연동

#### Sentry 추가
```javascript
// ErrorHandler.js의 _sendToExternal()
_sendToExternal(errorData) {
  if (window.Sentry) {
    Sentry.captureException(new Error(errorData.message), {
      tags: {
        category: errorData.category,
        severity: errorData.severity
      },
      extra: errorData.context
    });
  }
}
```

#### Google Analytics 추가
```javascript
// Analytics.js의 _sendEvent()
_sendEvent(event) {
  if (window.gtag) {
    gtag('event', event.type, {
      event_category: event.data.category,
      event_label: event.data.label
    });
  }
}
```

---

## 📊 성능 영향

### 메모리 사용
- ErrorHandler: 최대 100개 에러 저장 (~100KB)
- Logger: 최대 1000개 로그 저장 (~1MB)
- Analytics: 최대 500개 이벤트 저장 (~500KB)

**총계**: ~1.6MB (미미함)

### CPU 영향
- 에러 캡처: <1ms
- 로깅: <1ms
- 분석 추적: <1ms

**영향 없음** ✅

---

## 🔒 보안

### 민감 정보 보호
```javascript
// ❌ 나쁜 예
Logger.error('Login failed', {
  password: user.password  // 절대 안됨!
});

// ✅ 좋은 예
Logger.error('Login failed', {
  username: user.username,
  reason: 'invalid_credentials'
});
```

### LocalStorage 관리
- 자동으로 오래된 데이터 삭제
- 최대 용량 초과 시 무시 (에러 없음)
- 사용자가 직접 클리어 가능

---

## 💡 팁

### 1. 개발 중 로그 다운로드
```javascript
// 버그 리포트에 첨부
Logger.downloadLogs();
ErrorHandler.downloadErrors(); // 구현 필요 시
```

### 2. 프로덕션 모니터링
```javascript
// 주기적으로 서버로 전송
setInterval(() => {
  const errors = ErrorHandler.getErrors();
  if (errors.length > 0) {
    sendToServer(errors);
    ErrorHandler.clear();
  }
}, 60000); // 1분마다
```

### 3. A/B 테스트
```javascript
Analytics.track('experiment_view', {
  variant: isTestGroup ? 'B' : 'A'
});
```

---

## 🎓 실무 표준 준수

이 시스템은 다음 실무 표준을 따릅니다:

✅ 중앙 집중식 에러 처리
✅ 구조화된 로깅
✅ Privacy-first 분석
✅ GDPR 준수
✅ 메모리 관리
✅ 성능 최적화
✅ 확장 가능한 아키텍처

---

## 문의

문제가 발생하면:
1. 브라우저 콘솔에서 `__errorHandler.getStats()` 확인
2. `Logger.downloadLogs()` 실행
3. Issue에 첨부

**Happy Monitoring! 📊**
