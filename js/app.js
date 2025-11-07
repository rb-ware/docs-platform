/**
 * app.js
 * Main initialization for RBWare Docs
 * Handles language persistence, sidebar init, header events, and dynamic reload
 */
import { initHeader } from "./header.js";
import { initSidebar } from "./sidebar.js";
import { loadContent } from "./content.js";
import { initSearch } from "./search.js";


let currentLang = localStorage.getItem("lang") || "ko";
let currentSlug = null;

// Helper function to always get current language
function getCurrentLang() {
  return localStorage.getItem("lang") || "ko";
}

// Load header and sidebar
await initHeader();
await initSidebar(currentLang, (slug) => {
  currentSlug = slug;
  loadContent(slug, getCurrentLang());
});
await initSearch(currentLang);

// Sidebar toggle for mobile
document.addEventListener("click", (e) => {
  const menuToggle = document.getElementById("menuToggle");
  const sidebar = document.getElementById("sidebar");
  if (menuToggle && e.target === menuToggle) sidebar.classList.toggle("show");
});

// Language switcher event
const langSelect = document.getElementById("langSelect");
if (langSelect) {
  langSelect.value = currentLang;
  langSelect.addEventListener("change", async (e) => {
    currentLang = e.target.value;
    localStorage.setItem("lang", currentLang);

    // Refresh sidebar with new language
    await initSidebar(currentLang, (slug) => {
      currentSlug = slug;
      loadContent(slug, getCurrentLang());
    });

    // Reload current document in new language
    if (currentSlug) {
      await loadContent(currentSlug, currentLang);
    }
  });
} else {
  console.error("❌ langSelect element not found after initHeader");
}

// Hash router
window.addEventListener("hashchange", () => {
  const slug = location.hash.replace("#/", "");
  if (slug) {
    currentSlug = slug;
    loadContent(slug, getCurrentLang());
  }
});

// Initial load if hash exists
const initialHash = location.hash.replace("#/", "");
if (initialHash) {
  currentSlug = initialHash;
  loadContent(initialHash, getCurrentLang());
}

// Mobile sidebar toggle (already exists)
const menuToggle = document.getElementById("menuToggle");
const sidebar = document.getElementById("sidebar");
const contentArea = document.getElementById("contentArea");

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