/**
 * utils.js
 * 환경별 경로 처리 유틸리티
 */

/**
 * 현재 환경에 맞는 base path 반환
 * - GitHub Pages: /docs-platform/
 * - 로컬 환경: ./
 */
export function getBasePath() {
  const isGitHubPages = window.location.hostname.includes('github.io');
  return isGitHubPages ? '/docs-platform/' : './';
}

/**
 * 상대 경로를 절대 경로로 변환
 * @param {string} relativePath - 상대 경로 (예: "assets/images/logo.png")
 * @returns {string} 환경에 맞는 절대 경로
 */
export function getAssetPath(relativePath) {
  const basePath = getBasePath();
  // 이미 절대 경로거나 외부 URL이면 그대로 반환
  if (relativePath.startsWith('http') || relativePath.startsWith('/')) {
    return relativePath;
  }
  // ./ 제거
  const cleanPath = relativePath.replace(/^\.\//, '');
  return `${basePath}${cleanPath}`;
}
