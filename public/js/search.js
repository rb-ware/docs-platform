/**
 * RBWare Docs - Unified Search (Desktop + Mobile)
 */
import { loadContent } from "./content.js";

let indexCache = [];
let currentLang = "ko";

export async function initSearch(lang = "ko") {
  currentLang = lang;
  const res = await fetch("./search_index.json", { cache: "no-store" });
  indexCache = await res.json();

  const desktopInput = document.getElementById("searchInput");
  const mobileInput = document.getElementById("mobileSearchInput");
  const resultsBox = document.getElementById("searchResults");
  if (!desktopInput || !resultsBox) return;

  // 공통 검색 처리 함수
  const handleSearch = (query) => {
    const q = query.trim().toLowerCase();
    if (!q) {
      resultsBox.classList.add("hidden");
      return;
    }

    const filtered = indexCache
      .filter(
        (item) =>
          item.title.toLowerCase().includes(q) ||
          item.desc.toLowerCase().includes(q)
      )
      .slice(0, 5);

    resultsBox.innerHTML =
      filtered.length === 0
        ? `<div class='px-4 py-3 text-sm text-gray-500'>검색 결과 없음</div>`
        : filtered
            .map(
              (r) => `
              <div class="cursor-pointer px-4 py-2 border-b border-gray-100 hover:bg-gray-100 transition"
                   data-slug="${r.slug}">
                <div class="text-sm font-medium text-gray-800">${highlight(r.title, q)}</div>
                <div class="text-xs text-gray-500 line-clamp-2">${highlight(r.desc, q)}</div>
              </div>`
            )
            .join("");

    resultsBox.classList.remove("hidden");

    // 클릭 시 이동
    resultsBox.querySelectorAll("[data-slug]").forEach((el) => {
      el.addEventListener("click", (e) => {
        const slug = e.currentTarget.getAttribute("data-slug");
        loadContent(slug, currentLang);
        resultsBox.classList.add("hidden");
        if (desktopInput) desktopInput.value = "";
        if (mobileInput) mobileInput.value = "";
      });
    });
  };

  // 데스크탑용
  desktopInput.addEventListener("input", (e) => handleSearch(e.target.value));

  // 모바일용
  if (mobileInput) {
    mobileInput.addEventListener("input", (e) => handleSearch(e.target.value));
  }

  // 외부 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (!resultsBox.contains(e.target) && e.target !== desktopInput) {
      resultsBox.classList.add("hidden");
    }
  });
}

function highlight(text, q) {
  const regex = new RegExp(`(${q})`, "gi");
  return text.replace(regex, `<mark class='bg-yellow-200'>$1</mark>`);
}