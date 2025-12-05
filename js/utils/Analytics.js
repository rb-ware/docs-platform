/**
 * Analytics.js
 * GA4 래퍼 - Google Analytics로 이벤트 전송
 */

import { Logger } from './Logger.js';

/**
 * 이벤트 타입 (호환성 유지)
 */
export const EventType = {
  PAGE_VIEW: 'page_view',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
  LANGUAGE_CHANGE: 'language_change'
};

/**
 * Analytics 클래스 (GA4 래퍼)
 */
class AnalyticsClass {
  constructor() {
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;
    Logger.info('Analytics initialized');
  }

  /**
   * 페이지뷰 추적
   */
  trackPageView(path) {
    if (typeof gtag !== 'function') return;

    gtag('event', 'page_view', {
      page_path: path || window.location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });

    Logger.debug(`[Analytics] page_view: ${path}`);
  }

  /**
   * 네비게이션 추적
   */
  trackNavigation(from, to) {
    if (typeof gtag !== 'function') return;

    gtag('event', 'navigation', {
      from_page: from,
      to_page: to
    });

    Logger.debug(`[Analytics] navigation: ${from} → ${to}`);
  }

  /**
   * 검색 추적
   */
  trackSearch(query, resultsCount) {
    if (typeof gtag !== 'function') return;

    gtag('event', 'search', {
      search_term: query,
      results_count: resultsCount
    });

    Logger.debug(`[Analytics] search: "${query}" → ${resultsCount} results`);
  }

  /**
   * 언어 변경 추적
   */
  trackLanguageChange(from, to) {
    if (typeof gtag !== 'function') return;

    gtag('event', 'language_change', {
      previous_language: from,
      new_language: to
    });

    Logger.debug(`[Analytics] language: ${from} → ${to}`);
  }
}

export const Analytics = new AnalyticsClass();
