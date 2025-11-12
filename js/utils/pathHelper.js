/**
 * utils.js
 * 환경별 경로 처리 유틸리티
 *
 * DEPRECATED: This file is deprecated. Use js/config.js instead.
 * Kept for backwards compatibility.
 */

import { getBasePath as getBasePathFromConfig, getAssetPath as getAssetPathFromConfig } from '../config.js';

/**
 * 현재 환경에 맞는 base path 반환
 * @deprecated Use CONFIG.basePath from config.js instead
 * - GitHub Pages: /docs-platform/
 * - 로컬 환경: ./
 */
export function getBasePath() {
  return getBasePathFromConfig();
}

/**
 * 상대 경로를 절대 경로로 변환
 * @deprecated Use getAssetPath from config.js instead
 * @param {string} relativePath - 상대 경로 (예: "assets/images/logo.png")
 * @returns {string} 환경에 맞는 절대 경로
 */
export function getAssetPath(relativePath) {
  return getAssetPathFromConfig(relativePath);
}
