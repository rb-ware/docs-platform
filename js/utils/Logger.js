/**
 * Logger.js
 * 구조화된 로깅 유틸리티
 * 실무 방식: 개발/프로덕션 환경 분리, 로그 레벨 관리
 */

import { CONFIG } from '../config.js';

/**
 * 로그 레벨
 */
export const LogLevel = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
  NONE: 4
};

/**
 * Logger 클래스
 */
class LoggerClass {
  constructor() {
    // 프로덕션에서는 INFO 이상만 로깅
    this.level = CONFIG.isProduction ? LogLevel.INFO : LogLevel.DEBUG;
    this.logs = [];
    this.maxLogs = 1000;
  }

  /**
   * 로그 레벨 설정
   */
  setLevel(level) {
    this.level = level;
  }

  /**
   * DEBUG 로그
   */
  debug(message, ...args) {
    this._log(LogLevel.DEBUG, 'DEBUG', message, args);
  }

  /**
   * INFO 로그
   */
  info(message, ...args) {
    this._log(LogLevel.INFO, 'INFO', message, args);
  }

  /**
   * WARN 로그
   */
  warn(message, ...args) {
    this._log(LogLevel.WARN, 'WARN', message, args);
  }

  /**
   * ERROR 로그
   */
  error(message, ...args) {
    this._log(LogLevel.ERROR, 'ERROR', message, args);
  }

  /**
   * 내부 로그 메서드
   * @private
   */
  _log(level, levelName, message, args) {
    // 현재 레벨보다 낮으면 무시
    if (level < this.level) return;

    const timestamp = new Date().toISOString();
    const logEntry = {
      timestamp,
      level: levelName,
      message,
      data: args.length > 0 ? args : undefined
    };

    // 메모리에 저장
    this._storeLog(logEntry);

    // 콘솔 출력 (개발 환경만)
    if (!CONFIG.isProduction) {
      this._consoleLog(level, levelName, message, args);
    }

    // 프로덕션: 중요한 로그만 저장
    if (CONFIG.isProduction && level >= LogLevel.WARN) {
      this._persistLog(logEntry);
    }
  }

  /**
   * 콘솔 출력 (개발 환경)
   * @private
   */
  _consoleLog(level, levelName, message, args) {
    const styles = {
      [LogLevel.DEBUG]: 'color: #666',
      [LogLevel.INFO]: 'color: #2563eb',
      [LogLevel.WARN]: 'color: #d97706',
      [LogLevel.ERROR]: 'color: #dc2626; font-weight: bold'
    };

    const style = styles[level] || '';
    const prefix = `[${levelName}]`;

    if (args.length > 0) {
      console.log(`%c${prefix}`, style, message, ...args);
    } else {
      console.log(`%c${prefix}`, style, message);
    }
  }

  /**
   * 로그 저장 (메모리)
   * @private
   */
  _storeLog(logEntry) {
    this.logs.push(logEntry);

    // 최대 개수 초과 시 오래된 것 제거
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }
  }

  /**
   * 로그 영구 저장 (LocalStorage)
   * @private
   */
  _persistLog(logEntry) {
    try {
      const key = 'app_logs';
      const existing = JSON.parse(localStorage.getItem(key) || '[]');
      existing.push(logEntry);

      // 최근 50개만 유지
      const recent = existing.slice(-50);
      localStorage.setItem(key, JSON.stringify(recent));
    } catch (e) {
      // LocalStorage 가득 참 - 무시
    }
  }

  /**
   * 로그 조회
   */
  getLogs(filter = {}) {
    let filtered = [...this.logs];

    if (filter.level) {
      filtered = filtered.filter(log => log.level === filter.level);
    }

    if (filter.since) {
      const since = new Date(filter.since);
      filtered = filtered.filter(log => new Date(log.timestamp) >= since);
    }

    return filtered;
  }

  /**
   * 로그 다운로드 (디버깅용)
   */
  downloadLogs() {
    const data = JSON.stringify(this.logs, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `logs_${new Date().toISOString()}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  /**
   * 로그 클리어
   */
  clear() {
    this.logs = [];
    localStorage.removeItem('app_logs');
  }

  /**
   * 로그 통계
   */
  getStats() {
    const byLevel = {};
    this.logs.forEach(log => {
      byLevel[log.level] = (byLevel[log.level] || 0) + 1;
    });

    return {
      total: this.logs.length,
      byLevel,
      recent: this.logs.slice(-10)
    };
  }
}

// 싱글톤 인스턴스
export const Logger = new LoggerClass();

// 전역 접근 (디버깅용)
if (!CONFIG.isProduction) {
  window.__logger = Logger;
}
