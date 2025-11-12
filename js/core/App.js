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
async function showDocumentPage() {
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  // Initialize sidebar if not already initialized
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu && sidebarMenu.children.length === 0) {
    await initSidebar(getCurrentLang(), (slug) => {
      navigateTo(getCurrentLang(), slug, handleNavigation);
    });
  }

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
 * Handle navigation between pages
 */
function handleNavigation(lang, slug) {
  currentLang = lang;
  currentSlug = slug;

  if (slug) {
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

  // Determine initial page type
  const initialRoute = parseRoute();
  const isDocumentPage = !!initialRoute.slug;

  // Only initialize sidebar if we're on a document page
  if (isDocumentPage) {
    await initSidebar(currentLang, (slug) => {
      navigateTo(getCurrentLang(), slug, handleNavigation);
    });
  }

  // Initialize search
  await initSearch(currentLang);

  // Language switcher
  const langSelect = document.getElementById("langSelect");
  if (langSelect) {
    langSelect.value = currentLang;
    langSelect.addEventListener("change", async (e) => {
      const newLang = e.target.value;

      // Only re-initialize sidebar if we're on a document page
      if (currentSlug) {
        await initSidebar(newLang, (slug) => navigateTo(newLang, slug, handleNavigation));
        navigateTo(newLang, currentSlug, handleNavigation);
      }
    });
  }

  // Route change handlers
  if (isProductionEnv()) {
    // Production: Handle popstate for clean URLs
    window.addEventListener("popstate", () => {
      const route = parseRoute();
      currentLang = route.lang;
      currentSlug = route.slug;
      localStorage.setItem("lang", route.lang);

      if (route.slug) {
        showDocumentPage();
        loadContent(route.slug, route.lang);
      } else {
        showLanding();
      }

      if (langSelect) langSelect.value = route.lang;
    });
  } else {
    // Local dev: Handle hash changes
    window.addEventListener("hashchange", () => {
      const route = parseRoute();
      currentSlug = route.slug;

      if (route.slug) {
        showDocumentPage();
        loadContent(route.slug, getCurrentLang());
      } else {
        showLanding();
      }
    });
  }

  // Initial page load
  if (isDocumentPage) {
    // Has route: show document page
    currentLang = initialRoute.lang;
    currentSlug = initialRoute.slug;
    localStorage.setItem("lang", initialRoute.lang);
    showDocumentPage();
    loadContent(initialRoute.slug, initialRoute.lang);
    if (langSelect) langSelect.value = initialRoute.lang;
  } else {
    // No route: show landing page
    showLanding();
  }

  // Mobile sidebar toggle
  setupMobileSidebarToggle();
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
