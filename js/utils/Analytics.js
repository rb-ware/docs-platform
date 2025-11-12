/**
 * Analytics.js
 * Privacy-first 분석 유틸리티
 * 실무 방식: 개인정보 수집 없음, 쿠키 없음, GDPR 준수
 */

import { Logger } from './Logger.js';
import { CONFIG } from '../config.js';

/**
 * 이벤트 타입
 */
export const EventType = {
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
  LANGUAGE_CHANGE: 'language_change',
  ERROR: 'error',
  PERFORMANCE: 'performance'
};

/**
 * Analytics 클래스
 */
class AnalyticsClass {
  constructor() {
    this.events = [];
    this.maxEvents = 500;
    this.sessionId = this._generateSessionId();
    this.initialized = false;
  }

  /**
   * 초기화
   */
  init() {
    if (this.initialized) return;

    // 페이지 로드 추적
    this._trackPageLoad();

    // 페이지 visibility 추적
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        this._sendBeacon();
      }
    });

    // 언로드 시 데이터 전송
    window.addEventListener('beforeunload', () => {
      this._sendBeacon();
    });

    this.initialized = true;
    Logger.info('Analytics initialized');
  }

  /**
   * 이벤트 추적
   */
  track(eventType, data = {}) {
    const event = {
      type: eventType,
      timestamp: new Date().toISOString(),
      sessionId: this.sessionId,
      data: {
        ...data,
        url: window.location.pathname,
        referrer: document.referrer || 'direct',
        language: localStorage.getItem('lang') || 'ko'
      }
    };

    this._storeEvent(event);
    Logger.debug('Analytics event:', event);

    // 프로덕션에서는 서버로 전송
    if (CONFIG.isProduction) {
      this._sendEvent(event);
    }
  }

  /**
   * 페이지 뷰 추적
   */
  trackPageView(path) {
    this.track(EventType.PAGE_VIEW, {
      path: path || window.location.pathname,
      title: document.title
    });
  }

  /**
   * 네비게이션 추적
   */
  trackNavigation(from, to) {
    this.track(EventType.NAVIGATION, {
      from,
      to,
      method: 'spa' // Single Page Application
    });
  }

  /**
   * 검색 추적
   */
  trackSearch(query, resultsCount) {
    this.track(EventType.SEARCH, {
      query: query.toLowerCase(), // 개인정보 제거 (특수문자 등)
      resultsCount,
      hasResults: resultsCount > 0
    });
  }

  /**
   * 언어 변경 추적
   */
  trackLanguageChange(from, to) {
    this.track(EventType.LANGUAGE_CHANGE, {
      from,
      to
    });
  }

  /**
   * 성능 추적
   */
  trackPerformance() {
    if (!('performance' in window)) return;

    const perfData = window.performance.getEntriesByType('navigation')[0];
    if (!perfData) return;

    this.track(EventType.PERFORMANCE, {
      loadTime: Math.round(perfData.loadEventEnd - perfData.fetchStart),
      domContentLoaded: Math.round(perfData.domContentLoadedEventEnd - perfData.fetchStart),
      firstPaint: this._getFirstPaint(),
      timeToInteractive: Math.round(perfData.domInteractive - perfData.fetchStart)
    });
  }

  /**
   * 페이지 로드 추적
   * @private
   */
  _trackPageLoad() {
    if (document.readyState === 'complete') {
      this.trackPerformance();
    } else {
      window.addEventListener('load', () => {
        setTimeout(() => this.trackPerformance(), 0);
      });
    }
  }

  /**
   * First Paint 시간
   * @private
   */
  _getFirstPaint() {
    if (!('performance' in window)) return null;

    const paintEntries = window.performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-paint');

    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }

  /**
   * 이벤트 저장
   * @private
   */
  _storeEvent(event) {
    this.events.push(event);

    // 최대 개수 초과 시 오래된 것 제거
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // LocalStorage에 백업
    try {
      const recent = this.events.slice(-100);
      localStorage.setItem('analytics_events', JSON.stringify(recent));
    } catch (e) {
      Logger.warn('Failed to save analytics to localStorage');
    }
  }

  /**
   * 이벤트 전송 (서버)
   * @private
   */
  _sendEvent(event) {
    // 실무: 여기서 Google Analytics, Plausible 등으로 전송
    // 현재: 자체 endpoint로 전송 (나중에 구현 가능)

    const endpoint = `${CONFIG.basePath}api/analytics`;

    // Beacon API 사용 (비동기, 페이지 언로드에도 작동)
    if ('sendBeacon' in navigator) {
      const blob = new Blob([JSON.stringify(event)], {
        type: 'application/json'
      });

      // 실제로는 서버가 있어야 함
      // navigator.sendBeacon(endpoint, blob);

      Logger.debug('Analytics event would be sent', event);
    }
  }

  /**
   * 모든 이벤트 전송 (페이지 종료 시)
   * @private
   */
  _sendBeacon() {
    if (this.events.length === 0) return;

    const stats = this.getStats();
    Logger.debug('Sending analytics beacon', stats);

    // 실제로는 서버로 전송
    // navigator.sendBeacon(endpoint, JSON.stringify(stats));
  }

  /**
   * Session ID 생성
   * @private
   */
  _generateSessionId() {
    // 기존 세션 확인 (30분 유효)
    const stored = sessionStorage.getItem('sessionId');
    const storedTime = sessionStorage.getItem('sessionTime');

    if (stored && storedTime) {
      const elapsed = Date.now() - parseInt(storedTime);
      if (elapsed < 30 * 60 * 1000) { // 30분
        return stored;
      }
    }

    // 새 세션 생성
    const newId = `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('sessionId', newId);
    sessionStorage.setItem('sessionTime', Date.now().toString());

    return newId;
  }

  /**
   * 통계 조회
   */
  getStats() {
    const byType = {};
    const byHour = {};
    const byUrl = {};

    this.events.forEach(event => {
      // 타입별
      byType[event.type] = (byType[event.type] || 0) + 1;

      // 시간대별
      const hour = new Date(event.timestamp).getHours();
      byHour[hour] = (byHour[hour] || 0) + 1;

      // URL별
      if (event.data.url) {
        byUrl[event.data.url] = (byUrl[event.data.url] || 0) + 1;
      }
    });

    // 검색 키워드 Top 10
    const searches = this.events
      .filter(e => e.type === EventType.SEARCH)
      .map(e => e.data.query);

    const searchCounts = {};
    searches.forEach(q => {
      searchCounts[q] = (searchCounts[q] || 0) + 1;
    });

    const topSearches = Object.entries(searchCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([query, count]) => ({ query, count }));

    return {
      sessionId: this.sessionId,
      totalEvents: this.events.length,
      byType,
      byHour,
      topPages: Object.entries(byUrl)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10)
        .map(([url, count]) => ({ url, count })),
      topSearches,
      averageSessionTime: this._getSessionDuration()
    };
  }

  /**
   * 세션 시간 계산
   * @private
   */
  _getSessionDuration() {
    if (this.events.length < 2) return 0;

    const first = new Date(this.events[0].timestamp);
    const last = new Date(this.events[this.events.length - 1].timestamp);

    return Math.round((last - first) / 1000); // 초 단위
  }

  /**
   * 이벤트 클리어
   */
  clear() {
    this.events = [];
    localStorage.removeItem('analytics_events');
    Logger.info('Analytics cleared');
  }

  /**
   * 통계 다운로드 (디버깅용)
   */
  downloadStats() {
    const stats = this.getStats();
    const data = JSON.stringify(stats, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `analytics_${new Date().toISOString()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }
}

// 싱글톤 인스턴스
export const Analytics = new AnalyticsClass();

// 전역 접근 (디버깅용)
if (!CONFIG.isProduction) {
  window.__analytics = Analytics;
}
