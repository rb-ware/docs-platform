/**
 * Router.js
 * Handles routing logic for the application
 * Clean Architecture - Core Layer
 */

import { CONFIG, getCurrentLang } from "../config.js";

/**
 * Parse current route from URL
 * @returns {{lang: string, slug: string}}
 */
export function parseRoute() {
  const currentLang = getCurrentLang();

  if (CONFIG.routes.useCleanUrls) {
    // Production: Clean URLs like /docs-platform/ko/setup/system-set
    let pathname = window.location.pathname;
    pathname = pathname.replace(CONFIG.basePath, '').replace(/^\/|\/$/g, '');
    const parts = pathname.split('/').filter(Boolean);

    if (parts.length > 0 && CONFIG.languages.supported.includes(parts[0])) {
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
  // Validate language
  if (!CONFIG.languages.supported.includes(lang)) {
    console.warn(`Invalid language: ${lang}, using default`);
    lang = CONFIG.languages.default;
  }

  localStorage.setItem("lang", lang);

  if (CONFIG.routes.useCleanUrls) {
    // Production: Use clean URLs
    const repoPath = CONFIG.basePath.replace(/\/$/, ''); // Remove trailing slash
    const path = slug ? `${repoPath}/${lang}/${slug}` : `${repoPath}/${lang}`;
    window.history.pushState({ lang, slug }, '', path);
  } else {
    // Local dev: Use hash routing
    window.location.hash = slug ? `#/${slug}` : '';
  }

  if (onNavigate) {
    onNavigate(lang, slug);
  }
}
