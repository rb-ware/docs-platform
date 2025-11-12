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

let currentLang = getCurrentLang();
let currentSlug = null;

/**
 * Show landing page
 */
function showLanding() {
  const docContent = document.getElementById("docContent");
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  if (!docContent) return;

  // Completely hide sidebar (prevent flashing)
  if (sidebar) {
    sidebar.classList.add("hidden");
  }

  // Set landing page layout
  if (contentArea) {
    contentArea.className = "w-full bg-white";
  }

  // Render landing content
  docContent.innerHTML = LANDING_HTML;
}

/**
 * Show document page with sidebar
 */
function showDocumentPage() {
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  // Show sidebar
  if (sidebar) {
    sidebar.classList.remove("hidden");
  }

  // Set document page layout
  if (contentArea) {
    contentArea.className = "flex-1 has-sidebar";
  }
}

/**
 * Ensure sidebar is initialized (call once per language)
 */
async function ensureSidebarInitialized(lang) {
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu && sidebarMenu.children.length === 0) {
    await initSidebar(lang, (slug) => {
      navigateTo(lang, slug, handleNavigation);
    });
  }
}

/**
 * Handle navigation between pages
 */
async function handleNavigation(lang, slug) {
  currentLang = lang;
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
  await initSearch(currentLang);

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

  langSelect.value = currentLang;
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
  const langSelect = document.getElementById("langSelect");

  if (isProductionEnv()) {
    // Production: Handle popstate for clean URLs
    window.addEventListener("popstate", async () => {
      const route = parseRoute();
      await handleNavigation(route.lang, route.slug);
      if (langSelect) langSelect.value = route.lang;
    });
  } else {
    // Local dev: Handle hash changes
    window.addEventListener("hashchange", async () => {
      const route = parseRoute();
      await handleNavigation(route.lang, route.slug);
    });
  }
}

/**
 * Setup mobile sidebar toggle functionality
 */
function setupMobileSidebarToggle() {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      const isOpen = sidebar.classList.contains("translate-x-0");
      if (isOpen) {
        sidebar.classList.remove("translate-x-0");
        sidebar.classList.add("-translate-x-full");
        removeOverlay();
      } else {
        sidebar.classList.add("translate-x-0");
        sidebar.classList.remove("-translate-x-full");
        addOverlay();
      }
    });
  }
}

/**
 * Add overlay for mobile sidebar
 */
function addOverlay() {
  if (document.getElementById("sidebarOverlay")) return;

  const overlay = document.createElement("div");
  overlay.id = "sidebarOverlay";
  overlay.className = "fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 md:hidden transition-opacity duration-300 opacity-0";
  document.body.appendChild(overlay);

  overlay.addEventListener("click", () => {
    const sidebar = document.getElementById("sidebar");
    if (sidebar) {
      sidebar.classList.remove("translate-x-0");
      sidebar.classList.add("-translate-x-full");
    }
    removeOverlay();
  });
}

/**
 * Remove overlay
 */
function removeOverlay() {
  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");
    setTimeout(() => overlay.remove(), 300);
  }
}
