/**
 * sidebar.js
 * -----------------------------------
 * - Default: all categories expanded
 * - Collapsible categories with chevrons (light gray)
 * - Smooth scrollbar for long menus
 */

export async function initSidebar(currentLang = "ko", onSelect) {
  const isProduction = window.location.hostname.includes('github.io');
  try {
    const res = await fetch("./manifest.json", { cache: "no-store" });
    const data = await res.json();

    const menu = document.getElementById("sidebarMenu");
    if (!menu) {
      console.error("❌ sidebarMenu element not found.");
      return;
    }

    // Sidebar container setup
    menu.innerHTML = "";
    menu.classList.add(
      "h-full",
      "overflow-y-auto",
      "pr-2"
    );

    data.categories
      .sort((a, b) => a.order - b.order)
      .forEach((cat) => {
        const catWrapper = document.createElement("div");
        catWrapper.className = "category-block";

        // Category header
        const header = document.createElement("button");
        header.className =
          "flex items-center justify-between w-full text-left font-semibold text-gray-800 text-sm uppercase tracking-wide mt-3 mb-1 px-2 py-1.5 rounded hover:bg-gray-100 transition select-none";
        header.innerHTML = `
          <span>${cat.title[currentLang] || cat.title.en}</span>
          <span class="chevron text-gray-400 text-sm transition-transform duration-200">▼</span>
        `;

        // Sublist (default: open)
        const subList = document.createElement("div");
        subList.className =
          "ml-3 border-l border-gray-200 pl-3 space-y-1 overflow-hidden transition-all duration-300 ease-in-out";
        subList.style.maxHeight = "none"; // default: expanded

        cat.items.forEach((item) => {
          const link = document.createElement("a");

          // Hybrid routing: hash for local, clean URL for production
          if (isProduction) {
            link.href = `/docs-platform/${currentLang}/${item.slug}`;
          } else {
            link.href = `#/${item.slug}`;
          }

          link.textContent = item.title[currentLang] || item.title.en;
          link.className =
            "block px-2 py-1.5 rounded-md text-gray-600 hover:bg-[#f5f5f5] hover:text-[#ff2e2e] transition-colors duration-150";

          link.addEventListener("click", (e) => {
            e.preventDefault();

            document
              .querySelectorAll(".sidebar-active")
              .forEach((el) =>
                el.classList.remove(
                  "sidebar-active",
                  "bg-[#fff0f0]",
                  "text-[#ff2e2e]",
                  "font-medium"
                )
              );

            link.classList.add(
              "sidebar-active",
              "bg-[#fff0f0]",
              "text-[#ff2e2e]",
              "font-medium"
            );

            if (typeof onSelect === "function") {
              onSelect(item.slug);
            }
          });

          subList.appendChild(link);
        });

        // Collapse/Expand behavior
        header.addEventListener("click", () => {
          const chevron = header.querySelector(".chevron");
          const isOpen = subList.style.maxHeight === "none" || parseInt(subList.style.maxHeight) > 0;

          if (isOpen) {
            subList.style.maxHeight = "0px";
            chevron.style.transform = "rotate(-90deg)";
          } else {
            subList.style.maxHeight = "none";
            chevron.style.transform = "rotate(0deg)";
          }
        });

        catWrapper.appendChild(header);
        catWrapper.appendChild(subList);
        menu.appendChild(catWrapper);
      });

    console.log("✅ Sidebar initialized (default expanded, collapsible ready).");
  } catch (err) {
    console.error("Sidebar init failed:", err);
  }
}
