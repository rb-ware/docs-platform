/**
 * content.js
 * Fetches and renders markdown files dynamically using Marked.js
 * RBWare Docs — version + language + category 기반 Markdown 렌더링
 */
import { marked } from "https://cdn.jsdelivr.net/npm/marked/lib/marked.esm.js";

// 현재 사용 중인 문서 버전 (필요하면 나중에 manifest.json에서 가져오도록 변경 가능)
const DOC_VERSION = "v1.0";

/**
 * slug  예시: "extension/jump", "setup/welding-set"
 * lang  예시: "ko", "en"
 */
export async function loadContent(slug, lang = "ko") {
  const doc = document.getElementById("docContent");
  if (!doc) {
    console.error("docContent element not found");
    return;
  }

  // 실제 파일 경로: ./content/v1.0/ko/extension/jump.md
  const basePath = `./content/${DOC_VERSION}/${lang}/${slug}.md`;
  const url = `${basePath}?t=${Date.now()}`; // 캐시 무효화용 쿼리 추가

  try {
    console.log(`📄 Loading doc: ${url}`);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`No document found for slug "${slug}" (lang: ${lang})`);
    }

    const text = await res.text();

    // Markdown → HTML 렌더링
    let html = marked.parse(text);

    // GitHub Pages를 위한 이미지 경로 수정
    // 상대 경로(../../assets)를 절대 경로로 변환
    const basePath = window.location.pathname.endsWith('/')
      ? window.location.pathname
      : window.location.pathname + '/';
    html = html.replace(/src="\.\.\/\.\.\/(\.\.\/)?assets\//g, `src="${basePath}assets/`);

    doc.innerHTML = html;

    // 상단으로 스크롤
    const contentArea = document.getElementById("contentArea");
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (err) {
    console.error("loadContent error:", err);
    doc.innerHTML = `
      <p class="text-gray-500 text-sm">
        문서를 불러오는 중 오류가 발생했습니다.<br />
        <code>${DOC_VERSION}/${lang}/${slug}.md</code>
      </p>
    `;
  }
}
