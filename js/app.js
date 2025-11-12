/**
 * app.js
 * Main initialization for RBWare Docs
 * Hybrid routing: Hash for local dev, Clean URLs for production
 */
import { initHeader } from "./header.js";
import { initSidebar } from "./sidebar.js";
import { loadContent } from "./content.js";
import { initSearch } from "./search.js";
import { LANDING_HTML } from "./landing-content.js";

let currentLang = localStorage.getItem("lang") || "ko";
let currentSlug = null;

// Helper function to always get current language
function getCurrentLang() {
  return localStorage.getItem("lang") || "ko";
}

// Check if we're on GitHub Pages
const isProduction = window.location.hostname.includes('github.io');

// Parse route based on environment
function parseRoute() {
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
    return { lang: getCurrentLang(), slug: '' };
  } else {
    // Local dev: Hash routing like #/setup/system-set
    const hash = window.location.hash.replace('#/', '');
    return { lang: getCurrentLang(), slug: hash };
  }
}

// Navigate to a route
function navigateTo(lang, slug) {
  currentLang = lang;
  currentSlug = slug;
  localStorage.setItem("lang", lang);

  if (isProduction) {
    // Production: Use clean URLs
    const path = slug ? `/docs-platform/${lang}/${slug}` : `/docs-platform/${lang}`;
    window.history.pushState({ lang, slug }, '', path);
  } else {
    // Local dev: Use hash routing
    window.location.hash = slug ? `#/${slug}` : '';
  }

  if (slug) {
    showDocumentPage();
    loadContent(slug, lang);
  } else {
    showLanding();
  }
}

// Initialize app
await initHeader();

// Determine initial page type
const initialRoute = parseRoute();
const isDocumentPage = !!initialRoute.slug;

// Only initialize sidebar if we're on a document page
if (isDocumentPage) {
  await initSidebar(currentLang, (slug) => {
    navigateTo(getCurrentLang(), slug);
  });
}

await initSearch(currentLang);

// Language switcher
const langSelect = document.getElementById("langSelect");
if (langSelect) {
  langSelect.value = currentLang;
  langSelect.addEventListener("change", async (e) => {
    const newLang = e.target.value;

    // Only re-initialize sidebar if we're on a document page
    if (currentSlug) {
      await initSidebar(newLang, (slug) => navigateTo(newLang, slug));
      navigateTo(newLang, currentSlug);
    }
  });
}

// Route change handlers
if (isProduction) {
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

// Show landing page
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

// Show document page with sidebar
async function showDocumentPage() {
  const sidebar = document.getElementById("sidebar");
  const contentArea = document.getElementById("contentArea");

  // Initialize sidebar if not already initialized
  const sidebarMenu = document.getElementById("sidebarMenu");
  if (sidebarMenu && sidebarMenu.children.length === 0) {
    await initSidebar(getCurrentLang(), (slug) => {
      navigateTo(getCurrentLang(), slug);
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

// Initial page load (route already parsed above)
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

// Mobile sidebar toggle (already exists)
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");

if (menuToggle && sidebar) {
  // 열기 / 닫기 토글
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

// 배경 클릭 시 닫히는 오버레이
function addOverlay() {
  if (document.getElementById("sidebarOverlay")) return; // 중복 방지

  const overlay = document.createElement("div");
  overlay.id = "sidebarOverlay";
  overlay.className =
    "fixed inset-0 bg-black/40 backdrop-blur-[2px] z-30 md:hidden transition-opacity duration-300 opacity-0";
  document.body.appendChild(overlay);

  // // 살짝 페이드인
  // requestAnimationFrame(() => {
  //   overlay.classList.add("opacity-100");
  // });

  overlay.addEventListener("click", () => {
    sidebar.classList.remove("translate-x-0");
    sidebar.classList.add("-translate-x-full");
    removeOverlay();
  });
}

function removeOverlay() {
  const overlay = document.getElementById("sidebarOverlay");
  if (overlay) {
    overlay.classList.remove("opacity-100");
    overlay.classList.add("opacity-0");
    setTimeout(() => overlay.remove(), 300); // 부드럽게 사라지게
  }
}