/**
 * App.js
 * Main application orchestrator
 * Clean Architecture - Core Layer
 */

import { parseRoute, navigateTo } from "./Router.js";
import { getCurrentLang, isProductionEnv } from "../config.js";
import { initHeader } from "../ui/Header.js";
import { initSidebar } from "../ui/Sidebar.js";
import { loadContent } from "../services/ContentService.js";
import { initSearch } from "../services/SearchService.js";
import { generateLandingHTML } from "../ui/LandingPage.js";

// Error tracking & Analytics
import { ErrorHandler, ErrorCategory, ErrorSeverity } from "../utils/ErrorHandler.js";
import { Logger } from "../utils/Logger.js";
import { Analytics, EventType } from "../utils/Analytics.js";
import { initImageOptimization } from "../utils/ImageOptimizer.js";

// Application state
let currentSlug = null;
let landingContentCache = {}; // Cache for landing page content

/**
 * Load landing page content for specific language
 * @param {string} lang - Language code (ko, en, etc.)
 */
async function loadLandingContent(lang) {
  if (landingContentCache[lang]) {
    return landingContentCache[lang];
  }

  try {
    const res = await fetch(`./content/landing/${lang}.json`, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`Landing content not found for language: ${lang}`);
    }
    const content = await res.json();
    landingContentCache[lang] = content;
    return content;
  } catch (err) {
    console.error("Failed to load landing content:", err);
    // Fallback to English
    if (lang !== "en") {
      return loadLandingContent("en");
    }
    throw err;
  }
}

/**
 * Show landing page
 * Responsibility: Layout structure only
 */
async function showLanding() {
  const docContent = document.getElementById("docContent");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  if (!docContent) return;

  // Hide sidebar completely on landing page (remove visibility state)
  if (sidebar) {
    sidebar.classList.remove("sidebar-visible", "translate-x-0");
    sidebar.classList.add("-translate-x-full");
  }

  // Landing page layout: full width, no sidebar margin
  if (contentArea) {
    contentArea.className = "w-full bg-white";
  }

  // Load and render landing content with current language
  const currentLang = getCurrentLang();
  const content = await loadLandingContent(currentLang);
  docContent.innerHTML = generateLandingHTML(content);

  // Remove overlay if exists
  removeOverlay();
}

/**
 * Show document page with sidebar
 * Responsibility: Layout structure only
 */
function showDocumentPage() {
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  // Enable sidebar visibility (desktop: auto-show, mobile: hidden until toggle)
  if (sidebar) {
    sidebar.classList.add("sidebar-visible");
  }

  // Document page layout: sidebar margin + padding
  if (contentArea) {
    contentArea.className = "flex-1 has-sidebar bg-white";
  }
}

/**
 * Ensure sidebar is initialized (call once per language)
 */
async function ensureSidebarInitialized(lang) {
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu && sidebarMenu.children.length === 0) {
    await initSidebar(lang, (slug) => {
      // Close sidebar on mobile after menu selection
      if (window.innerWidth < 768) {
        toggleSidebar(true);
      }
      navigateTo(lang, slug, handleNavigation);
    });
  }
}

/**
 * Handle navigation between pages
 */
async function handleNavigation(lang, slug) {
  try {
    // Update state
    const previousSlug = currentSlug;
    localStorage.setItem("lang", lang);
    currentSlug = slug;

    // Track navigation
    if (previousSlug !== slug) {
      Analytics.trackNavigation(previousSlug || '/', slug || '/');
    }

    if (slug) {
      await ensureSidebarInitialized(lang);
      showDocumentPage();
      loadContent(slug, lang);
    } else {
      showLanding();
    }

    Logger.debug(`Navigate to: ${slug || 'landing'} (${lang})`);
  } catch (error) {
    ErrorHandler.capture(error, {
      category: ErrorCategory.NAVIGATION,
      severity: ErrorSeverity.HIGH,
      context: { lang, slug },
      showUser: true
    });
  }
}

/**
 * Initialize and start the application
 */
export async function startApp() {
  try {
    // Initialize error tracking & analytics
    ErrorHandler.init();
    Analytics.init();

    Logger.info('🚀 Application starting...');

    // Initialize header
    await initHeader();

    // Initialize search
    await initSearch(getCurrentLang());

    // Language switcher
    setupLanguageSwitcher();

    // Route change handlers
    setupRouteHandlers();

    // Initial page load
    const initialRoute = parseRoute();
    await handleNavigation(initialRoute.lang, initialRoute.slug);

    // Track initial page view
    Analytics.trackPageView(initialRoute.slug || '/');

    // Mobile sidebar toggle
    setupMobileSidebarToggle();

    // Initialize image optimization
    initImageOptimization();

    Logger.info('✅ Application started successfully');
  } catch (error) {
    // Critical error - app failed to start
    ErrorHandler.capture(error, {
      category: ErrorCategory.UNKNOWN,
      severity: ErrorSeverity.CRITICAL,
      context: { location: 'startApp' },
      showUser: true
    });

    Logger.error('❌ Application failed to start', error);
  }
}

/**
 * Setup language switcher
 */
function setupLanguageSwitcher() {
  const langSelect = document.getElementById("langSelect");
  if (!langSelect) return;

  const currentLang = getCurrentLang();
  langSelect.value = currentLang;

  langSelect.addEventListener("change", async (e) => {
    const newLang = e.target.value;
    const oldLang = currentLang;

    // Track language change
    Analytics.trackLanguageChange(oldLang, newLang);
    Logger.info(`Language changed: ${oldLang} → ${newLang}`);

    if (currentSlug) {
      // Document page: re-initialize sidebar with new language
      const sidebarMenu = document.getElementById("sidebarMenu");
      if (sidebarMenu) {
        sidebarMenu.innerHTML = ""; // Clear existing sidebar
      }
      await handleNavigation(newLang, currentSlug);
    } else {
      // Landing page: reload with new language
      await handleNavigation(newLang, null);
    }
  });
}

/**
 * Setup route change handlers
 */
function setupRouteHandlers() {
  // Unified route change handler
  const handleRouteChange = async () => {
    const route = parseRoute();
    await handleNavigation(route.lang, route.slug);

    // Update language selector if present
    const langSelect = document.getElementById("langSelect");
    if (langSelect && langSelect.value !== route.lang) {
      langSelect.value = route.lang;
    }
  };

  // Listen to appropriate event based on environment
  const eventName = isProductionEnv() ? "popstate" : "hashchange";
  window.addEventListener(eventName, handleRouteChange);
}

/**
 * Setup mobile sidebar toggle functionality
 */
function setupMobileSidebarToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      toggleSidebar();
    });
  }
}

/**
 * Toggle sidebar open/close (used by mobile toggle and menu selection)
 */
function toggleSidebar(forceClose = false) {
  const sidebar = document.getElementById("sidebar");
  if (!sidebar) return;

  const isOpen = sidebar.classList.contains("translate-x-0");

  if (forceClose || isOpen) {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");
    removeOverlay();
  } else {
    sidebar.classList.add("translate-x-0");
    sidebar.classList.remove("-translate-x-full");
    addOverlay();
  }
}

/**
 * Add overlay for mobile sidebar
 */
function addOverlay() {
  if (document.getElementById("sidebarOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "sidebarOverlay";
  overlay.className = "fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 md:hidden";
  document.body.appendChild(overlay);

  // Close sidebar when overlay is clicked
  overlay.addEventListener("click", () => {
    toggleSidebar(true);
  });
}

/**
 * Remove overlay
 */
function removeOverlay() {
  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) {
    overlay.remove();
  }
}
