/**
 * App.js
 * Main application orchestrator
 * Clean Architecture - Core Layer
 */

import { parseRoute, navigateTo, getCurrentLang, isProductionEnv } from "./Router.js";
import { initHeader } from "../ui/Header.js";
import { initSidebar } from "../ui/Sidebar.js";
import { loadContent } from "../services/ContentService.js";
import { initSearch } from "../services/SearchService.js";
import { LANDING_HTML } from "../ui/LandingPage.js";

// Application state
let currentSlug = null;

/**
 * Show landing page
 * Responsibility: Layout structure only
 */
function showLanding() {
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

  // Render landing content
  docContent.innerHTML = LANDING_HTML;

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
  // Update state
  localStorage.setItem("lang", lang);
  currentSlug = slug;

  if (slug) {
    await ensureSidebarInitialized(lang);
    showDocumentPage();
    loadContent(slug, lang);
  } else {
    showLanding();
  }
}

/**
 * Initialize and start the application
 */
export async function startApp() {
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

  // Mobile sidebar toggle
  setupMobileSidebarToggle();
}

/**
 * Setup language switcher
 */
function setupLanguageSwitcher() {
  const langSelect = document.getElementById("langSelect");
  if (!langSelect) return;

  langSelect.value = getCurrentLang();
  langSelect.addEventListener("change", async (e) => {
    const newLang = e.target.value;

    // Re-initialize sidebar with new language if on document page
    if (currentSlug) {
      const sidebarMenu = document.getElementById("sidebarMenu");
      if (sidebarMenu) {
        sidebarMenu.innerHTML = ""; // Clear existing sidebar
      }
      await handleNavigation(newLang, currentSlug);
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
