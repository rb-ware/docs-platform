/**
 * ErrorHandler.js
 * 중앙 집중식 에러 처리 유틸리티
 * 실무 방식: 모든 에러를 한 곳에서 처리
 */

import { Logger } from './Logger.js';
import { CONFIG } from '../config.js';

/**
 * 에러 심각도
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
 * ErrorHandler 클래스
 * 싱글톤 패턴으로 구현
 */
class ErrorHandlerClass {
  constructor() {
    this.errors = [];
    this.maxErrors = 100; // 메모리 관리
    this.initialized = false;
  }

  /**
   * 초기화
   */
  init() {
    if (this.initialized) return;

    // 전역 에러 핸들러
    window.addEventListener('error', (event) => {
      this.capture(event.error, {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.HIGH,
        context: {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      });
    });

    // Promise rejection 핸들러
    window.addEventListener('unhandledrejection', (event) => {
      this.capture(event.reason, {
        category: ErrorCategory.UNKNOWN,
        severity: ErrorSeverity.HIGH,
        context: {
          type: 'unhandledrejection'
        }
      });
    });

    this.initialized = true;
    Logger.info('ErrorHandler initialized');
  }

  /**
   * 에러 캡처 (메인 메서드)
   * @param {Error|string} error - 에러 객체 또는 메시지
   * @param {Object} options - 추가 옵션
   */
  capture(error, options = {}) {
    const {
      category = ErrorCategory.UNKNOWN,
      severity = ErrorSeverity.MEDIUM,
      context = {},
      showUser = false
    } = options;

    // 에러 객체 생성
    const errorData = this._buildErrorData(error, category, severity, context);

    // 저장 (메모리 관리)
    this._storeError(errorData);

    // 로깅
    this._logError(errorData);

    // 외부 서비스 전송 (프로덕션만)
    if (CONFIG.isProduction) {
      this._sendToExternal(errorData);
    }

    // 사용자에게 표시
    if (showUser) {
      this._showUserError(errorData);
    }

    return errorData.id;
  }

  /**
   * 에러 데이터 빌드
   * @private
   */
  _buildErrorData(error, category, severity, context) {
    const timestamp = new Date().toISOString();
    const id = this._generateId();

    // Error 객체 파싱
    const message = error instanceof Error ? error.message : String(error);
    const stack = error instanceof Error ? error.stack : undefined;

    return {
      id,
      timestamp,
      category,
      severity,
      message,
      stack,
      context: {
        ...context,
        url: window.location.href,
        userAgent: navigator.userAgent,
        viewport: {
          width: window.innerWidth,
          height: window.innerHeight
        },
        language: localStorage.getItem('lang') || 'ko'
      }
    };
  }

  /**
   * 에러 저장 (메모리)
   * @private
   */
  _storeError(errorData) {
    this.errors.push(errorData);

    // 최대 개수 초과 시 오래된 것 제거
    if (this.errors.length > this.maxErrors) {
      this.errors.shift();
    }

    // LocalStorage에 백업 (최근 10개만)
    try {
      const recentErrors = this.errors.slice(-10);
      localStorage.setItem('errors', JSON.stringify(recentErrors));
    } catch (e) {
      // LocalStorage 가득 참
      Logger.warn('Failed to save errors to localStorage', e);
    }
  }

  /**
   * 로깅
   * @private
   */
  _logError(errorData) {
    const { severity, message, category } = errorData;

    switch (severity) {
      case ErrorSeverity.CRITICAL:
      case ErrorSeverity.HIGH:
        Logger.error(`[${category}] ${message}`, errorData);
        break;
      case ErrorSeverity.MEDIUM:
        Logger.warn(`[${category}] ${message}`, errorData);
        break;
      default:
        Logger.debug(`[${category}] ${message}`, errorData);
    }
  }

  /**
   * 외부 서비스로 전송
   * @private
   */
  _sendToExternal(errorData) {
    // 실무: 여기서 Sentry, LogRocket 등으로 전송
    // 현재: 자체 endpoint로 전송 (나중에 구현 가능)

    // 예시: beacon API 사용 (페이지 종료 시에도 전송)
    if ('sendBeacon' in navigator) {
      const endpoint = `${CONFIG.basePath}api/errors`;
      const blob = new Blob([JSON.stringify(errorData)], {
        type: 'application/json'
      });

      // 실제로는 서버가 있어야 함
      // navigator.sendBeacon(endpoint, blob);

      Logger.debug('Error would be sent to external service', errorData);
    }
  }

  /**
   * 사용자에게 에러 표시
   * @private
   */
  _showUserError(errorData) {
    const { category, severity } = errorData;

    // 심각한 에러만 사용자에게 표시
    if (severity === ErrorSeverity.CRITICAL || severity === ErrorSeverity.HIGH) {
      this._createErrorToast(errorData);
    }
  }

  /**
   * 에러 토스트 생성
   * @private
   */
  _createErrorToast(errorData) {
    // 기존 토스트 제거
    const existing = document.getElementById('error-toast');
    if (existing) existing.remove();

    // 사용자 친화적 메시지
    const userMessage = this._getUserFriendlyMessage(errorData);

    const toast = document.createElement('div');
    toast.id = 'error-toast';
    toast.className = 'fixed bottom-4 right-4 bg-red-50 border border-red-200 rounded-lg shadow-lg p-4 max-w-sm z-50 animate-slide-up';
    toast.innerHTML = `
      <div class="flex items-start">
        <div class="flex-shrink-0">
          <svg class="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
          </svg>
        </div>
        <div class="ml-3 flex-1">
          <p class="text-sm font-medium text-red-800">
            ${userMessage}
          </p>
          <p class="mt-1 text-xs text-red-600">
            Error ID: ${errorData.id}
          </p>
        </div>
        <button onclick="this.parentElement.parentElement.remove()"
                class="ml-3 flex-shrink-0 text-red-400 hover:text-red-500">
          <span class="sr-only">Close</span>
          <svg class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"/>
          </svg>
        </button>
      </div>
    `;

    document.body.appendChild(toast);

    // 5초 후 자동 제거
    setTimeout(() => toast.remove(), 5000);
  }

  /**
   * 사용자 친화적 메시지 생성
   * @private
   */
  _getUserFriendlyMessage(errorData) {
    const { category } = errorData;
    const lang = localStorage.getItem('lang') || 'ko';

    const messages = {
      [ErrorCategory.NETWORK]: {
        ko: '네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요.',
        en: 'Network error occurred. Please check your internet connection.'
      },
      [ErrorCategory.CONTENT]: {
        ko: '콘텐츠를 불러오는 중 오류가 발생했습니다.',
        en: 'Failed to load content.'
      },
      [ErrorCategory.SEARCH]: {
        ko: '검색 중 오류가 발생했습니다.',
        en: 'Search error occurred.'
      },
      [ErrorCategory.NAVIGATION]: {
        ko: '페이지 이동 중 오류가 발생했습니다.',
        en: 'Navigation error occurred.'
      },
      default: {
        ko: '예기치 않은 오류가 발생했습니다.',
        en: 'An unexpected error occurred.'
      }
    };

    return (messages[category] || messages.default)[lang];
  }

  /**
   * ID 생성
   * @private
   */
  _generateId() {
    return `err_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * 저장된 에러 조회
   */
  getErrors(filter = {}) {
    let filtered = [...this.errors];

    if (filter.category) {
      filtered = filtered.filter(e => e.category === filter.category);
    }

    if (filter.severity) {
      filtered = filtered.filter(e => e.severity === filter.severity);
    }

    return filtered;
  }

  /**
   * 에러 통계
   */
  getStats() {
    const byCategory = {};
    const bySeverity = {};

    this.errors.forEach(error => {
      byCategory[error.category] = (byCategory[error.category] || 0) + 1;
      bySeverity[error.severity] = (bySeverity[error.severity] || 0) + 1;
    });

    return {
      total: this.errors.length,
      byCategory,
      bySeverity,
      recent: this.errors.slice(-5)
    };
  }

  /**
   * 에러 클리어
   */
  clear() {
    this.errors = [];
    localStorage.removeItem('errors');
    Logger.info('Errors cleared');
  }
}

// 싱글톤 인스턴스
export const ErrorHandler = new ErrorHandlerClass();

// 편의 메서드들
export const captureError = (error, options) => ErrorHandler.capture(error, options);
export const captureException = (error, context = {}) =>
  ErrorHandler.capture(error, {
    severity: ErrorSeverity.HIGH,
    context,
    showUser: true
  });
export const captureMessage = (message, options = {}) =>
  ErrorHandler.capture(new Error(message), options);
