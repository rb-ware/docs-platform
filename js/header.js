import { getAssetPath } from "./utils.js";

export async function initHeader() {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  const headerHTML = await fetch("./components/header.html").then((res) => res.text());
  headerContainer.innerHTML = headerHTML;

  // 환경에 맞게 로고 경로 동적 설정
  const logoImg = headerContainer.querySelector('img[alt="RBWare Logo"]');
  if (logoImg) {
    logoImg.src = getAssetPath('assets/images/components/rbw_logo_top.png');
  }

  // Mobile search toggle
  const searchToggle = document.getElementById("searchToggle");
  const mobileSearchBox = document.getElementById("mobileSearchBox");

  if (searchToggle && mobileSearchBox) {
    searchToggle.addEventListener("click", () => {
      mobileSearchBox.classList.toggle("hidden");
      const input = mobileSearchBox.querySelector("input");
      if (!mobileSearchBox.classList.contains("hidden")) {
        setTimeout(() => input.focus(), 100);
      }
    });
  }
}
