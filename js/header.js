export async function initHeader() {
  const headerContainer = document.getElementById("header");
  if (!headerContainer) return;

  const headerHTML = await fetch("./components/header.html").then((res) => res.text());
  headerContainer.innerHTML = headerHTML;

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
