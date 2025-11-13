/**
 * @fileoverview Content loading and rendering service for markdown documentation
 * @module services/ContentService
 *
 * Features:
 * - Fetches markdown files from content directory
 * - Renders markdown to HTML using Marked.js
 * - Dynamic asset path resolution (dev vs production)
 * - Security: slug validation to prevent path traversal
 * - Error handling with user-friendly messages
 *
 * @requires marked
 * @requires module:config
 * @requires module:utils/ErrorHandler
 * @requires module:utils/Logger
 */
import { marked } from "marked";
import { getAssetPath, CONFIG, isValidSlug, buildDocumentUrl } from "../config.js";
import { ErrorHandler, ErrorCategory, ErrorSeverity } from "../utils/ErrorHandler.js";
import { Logger } from "../utils/Logger.js";

/**
 * Load and render markdown content into the document area
 *
 * @async
 * @param {string} slug - Document path slug (e.g., "extension/jump", "setup/welding-set")
 * @param {string} [lang='ko'] - Language code (ko, en)
 * @returns {Promise<void>}
 *
 * @example
 * // Load Korean version of jump extension documentation
 * await loadContent('extension/jump', 'ko');
 *
 * @example
 * // Load English version with default language fallback
 * await loadContent('setup/welding-set');
 *
 * @security Validates slug format to prevent path traversal attacks
 */
export async function loadContent(slug, lang = "ko") {
  const doc = document.getElementById("docContent");

  if (!doc) return;

  // Security: Validate slug to prevent path traversal
  if (!isValidSlug(slug)) {
    const error = new Error(`Invalid slug: ${slug}`);
    ErrorHandler.capture(error, {
      category: ErrorCategory.CONTENT,
      severity: ErrorSeverity.MEDIUM,
      context: { slug, lang }
    });

    Logger.error(`Invalid slug: "${slug}"`);

    doc.innerHTML = `
      <p class="text-red-500 text-sm">
        Invalid document path.<br />
        <code>Invalid slug format</code>
      </p>
    `;
    return;
  }

  // Validate language
  if (!CONFIG.languages.supported.includes(lang)) {
    Logger.warn(`Invalid language: "${lang}", using default`);
    lang = CONFIG.languages.default;
  }

  // Set prose styling (don't touch contentArea - that's layout's responsibility)
  doc.className = "prose w-full max-w-4xl mx-auto px-6 md:px-12 py-8";

  // 실제 파일 경로: ./content/v1.0/ko/extension/jump.md
  const basePath = `${CONFIG.paths.content}/${CONFIG.docVersion}/${lang}/${slug}.md`;
  const url = buildDocumentUrl(basePath);

  try {
    Logger.info(`Loading doc: ${slug} (${lang})`);

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      throw new Error(`No document found for slug "${slug}" (lang: ${lang})`);
    }

    const text = await res.text();

    // Markdown → HTML 렌더링
    let html = marked.parse(text);

    // 환경에 맞게 이미지 경로 동적 변환
    // 상대 경로 (../assets/, ../../assets/) 및 절대 경로 (/assets/) 통합 처리
    html = html.replace(/src="(\.\.\/)*\/?assets\//g, () => {
      return `src="${getAssetPath('assets/')}`;
    });

    // Add footer to doc content
    const footer = `
      <footer class="py-8 mt-16 text-center text-xs text-gray-400 border-t border-gray-200">
        © 2025 RBWare Co., Ltd. All rights reserved.
      </footer>
    `;

    doc.innerHTML = html + footer;

    // 상단으로 스크롤
    const contentArea = document.getElementById("contentArea");
    if (contentArea) {
      contentArea.scrollTo({ top: 0, behavior: "smooth" });
    }
  } catch (err) {
    // Error tracking
    ErrorHandler.capture(err, {
      category: ErrorCategory.CONTENT,
      severity: ErrorSeverity.HIGH,
      context: { slug, lang, url },
      showUser: true
    });

    Logger.error('Failed to load content', { slug, lang, error: err.message });

    doc.innerHTML = `
      <p class="text-gray-500 text-sm">
        문서를 불러오는 중 오류가 발생했습니다.<br />
        <code>${CONFIG.docVersion}/${lang}/${slug}.md</code>
      </p>
    `;
  }
}
