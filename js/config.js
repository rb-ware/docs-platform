/**
 * config.js
 * Central configuration file for the documentation platform
 * Eliminates duplicate environment detection and hard-coded values
 */

/**
 * Environment detection
 */
const isProduction = window.location.hostname.includes('github.io');

/**
 * Application configuration
 */
export const CONFIG = {
  // Environment
  environment: isProduction ? 'production' : 'development',
  isProduction,

  // Base paths
  basePath: isProduction ? '/docs-platform/' : './',

  // GitHub Pages specific
  githubPages: {
    repoName: 'docs-platform',
    hostname: 'github.io'
  },

  // Documentation versioning
  docVersion: 'v1.0',

  // Supported languages
  languages: {
    supported: ['ko', 'en'],
    default: 'ko'
  },

  // Routes
  routes: {
    useCleanUrls: false, // 모든 환경에서 해시 라우팅 사용
    useHashRouting: true // GitHub Pages SPA 호환성
  },

  // Content paths
  paths: {
    content: './content',
    manifest: './manifest.json',
    searchIndex: './search_index.json',
    components: './components',
    assets: './assets'
  },

  // Cache settings
  cache: {
    bustQueryParam: true, // Add ?t=timestamp to prevent caching
    noStore: true // Use cache: "no-store" in fetch
  },

  // Security settings
  security: {
    // Allowed file extensions for content loading
    allowedExtensions: ['.md'],
    // Maximum slug path depth to prevent path traversal
    maxPathDepth: 3,
    // Pattern to validate slugs (alphanumeric, hyphens, underscores, forward slashes)
    slugPattern: /^[a-zA-Z0-9\-_\/]+$/
  },

  // UI settings
  ui: {
    mobileBreakpoint: 768, // pixels
    sidebarAnimation: 300, // milliseconds
    scrollBehavior: 'smooth'
  }
};

/**
 * Get base path for the current environment
 * @returns {string}
 */
export function getBasePath() {
  return CONFIG.basePath;
}

/**
 * Get asset path with proper base path
 * @param {string} relativePath - Relative path to asset
 * @returns {string} Full path to asset
 */
export function getAssetPath(relativePath) {
  // Already absolute or external URL
  if (relativePath.startsWith('http') || relativePath.startsWith('/')) {
    return relativePath;
  }
  // Remove leading ./
  const cleanPath = relativePath.replace(/^\.\//, '');
  return `${CONFIG.basePath}${cleanPath}`;
}

/**
 * Check if current environment is production
 * @returns {boolean}
 */
export function isProductionEnv() {
  return CONFIG.isProduction;
}

/**
 * Get current language from storage or default
 * @returns {string}
 */
export function getCurrentLang() {
  const stored = localStorage.getItem('lang');
  if (stored && CONFIG.languages.supported.includes(stored)) {
    return stored;
  }
  return CONFIG.languages.default;
}

/**
 * Validate slug for security (prevent path traversal)
 * @param {string} slug - Document slug to validate
 * @returns {boolean}
 */
export function isValidSlug(slug) {
  if (!slug || typeof slug !== 'string') {
    return false;
  }

  // Check pattern (alphanumeric, hyphens, underscores, slashes only)
  // Note: This pattern already blocks '..' since '.' is not allowed
  if (!CONFIG.security.slugPattern.test(slug)) {
    return false;
  }

  // Check path depth
  const depth = slug.split('/').length;
  if (depth > CONFIG.security.maxPathDepth) {
    return false;
  }

  return true;
}

/**
 * Sanitize HTML to prevent XSS
 * @param {string} html - HTML string to sanitize
 * @returns {string} Sanitized HTML
 */
export function sanitizeHTML(html) {
  const div = document.createElement('div');
  div.textContent = html;
  return div.innerHTML;
}

/**
 * Build document URL with cache busting if enabled
 * @param {string} path - Document path
 * @returns {string} URL with cache busting
 */
export function buildDocumentUrl(path) {
  if (CONFIG.cache.bustQueryParam) {
    return `${path}?t=${Date.now()}`;
  }
  return path;
}

export default CONFIG;
