/**
 * Router.js
 * Handles routing logic for the application
 * Clean Architecture - Core Layer
 */

// Check if we're on GitHub Pages
const isProduction = window.location.hostname.includes('github.io');

/**
 * Parse current route from URL
 * @returns {{lang: string, slug: string}}
 */
export function parseRoute() {
  const currentLang = localStorage.getItem("lang") || "ko";

  if (isProduction) {
    // Production: Clean URLs like /docs-platform/ko/setup/system-set
    let pathname = window.location.pathname;
    pathname = pathname.replace('/docs-platform/', '').replace(/^\/|\/$/g, '');
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length > 0 && ['ko', 'en'].includes(parts[0])) {
      return {
        lang: parts[0],
        slug: parts.slice(1).join('/')
      };
    }
    return { lang: currentLang, slug: '' };
  } else {
    // Local dev: Hash routing like #/setup/system-set
    const hash = window.location.hash.replace('#/', '');
    return { lang: currentLang, slug: hash };
  }
}

/**
 * Navigate to a specific route
 * @param {string} lang - Language code
 * @param {string} slug - Document slug
 * @param {Function} onNavigate - Callback function
 */
export function navigateTo(lang, slug, onNavigate) {
  localStorage.setItem("lang", lang);

  if (isProduction) {
    // Production: Use clean URLs
    const path = slug ? `/docs-platform/${lang}/${slug}` : `/docs-platform/${lang}`;
    window.history.pushState({ lang, slug }, '', path);
  } else {
    // Local dev: Use hash routing
    window.location.hash = slug ? `#/${slug}` : '';
  }

  if (onNavigate) {
    onNavigate(lang, slug);
  }
}

/**
 * Get current language from storage
 * @returns {string}
 */
export function getCurrentLang() {
  return localStorage.getItem("lang") || "ko";
}

/**
 * Check if running in production
 * @returns {boolean}
 */
export function isProductionEnv() {
  return isProduction;
}
