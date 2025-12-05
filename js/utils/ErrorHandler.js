/**
 * ErrorHandler.js
 * 단순화된 에러 처리 유틸리티
 */

import { Logger } from './Logger.js';

/**
 * 에러 심각도 (단순화: 2단계)
 */
export const ErrorSeverity = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  CRITICAL: 'critical'
};

/**
 * 에러 카테고리
 */
export const ErrorCategory = {
  NETWORK: 'network',
  CONTENT: 'content',
  NAVIGATION: 'navigation',
  SEARCH: 'search',
  UI: 'ui',
  UNKNOWN: 'unknown'
};

/**
 * ErrorHandler 클래스 (단순화)
 */
class ErrorHandlerClass {
  constructor() {
    this.initialized = false;
  }

  /**
   * 초기화 - 전역 에러 핸들러 등록
   */
  init() {
    if (this.initialized) return;

    window.addEventListener('error', (event) => {
      this.capture(event.error, {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.HIGH
      });
    });

    window.addEventListener('unhandledrejection', (event) => {
      this.capture(event.reason, {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.HIGH
      });
    });

    this.initialized = true;
    Logger.info('ErrorHandler initialized');
  }

  /**
   * 에러 캡처
   * @param {Error|string} error - 에러 객체 또는 메시지
   * @param {Object} options - 옵션
   */
  capture(error, options = {}) {
    const {
      category = ErrorCategory.UNKNOWN,
      severity = ErrorSeverity.MEDIUM,
      showUser = false
    } = options;

    const message = error instanceof Error ? error.message : String(error);

    // 로깅
    if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH) {
      Logger.error(`[${category}] ${message}`);
    } else {
      Logger.warn(`[${category}] ${message}`);
    }

    // 사용자에게 표시
    if (showUser && (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH)) {
      this._showToast(category);
    }
  }

  /**
   * 에러 토스트 표시
   * @private
   */
  _showToast(category) {
    const existing = document.getElementById('error-toast');
    if (existing) existing.remove();

    const lang = localStorage.getItem('lang') || 'ko';
    const messages = {
      network: { ko: '네트워크 오류가 발생했습니다.', en: 'Network error occurred.' },
      content: { ko: '콘텐츠를 불러오는 중 오류가 발생했습니다.', en: 'Failed to load content.' },
      navigation: { ko: '페이지 이동 중 오류가 발생했습니다.', en: 'Navigation error occurred.' },
      default: { ko: '오류가 발생했습니다.', en: 'An error occurred.' }
    };
    const msg = (messages[category] || messages.default)[lang];

    const toast = document.createElement('div');
    toast.id = 'error-toast';
    toast.className = 'fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-sm z-50';
    toast.innerHTML = `
      <div class="flex items-start">
        <svg class="h-5 w-5 text-red-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
        </svg>
        <p class="ml-3 text-sm text-red-800">${msg}</p>
        <button onclick="this.parentElement.parentElement.remove()" class="ml-auto text-red-400 hover:text-red-500">
          <svg class="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
  }
}

export const ErrorHandler = new ErrorHandlerClass();
