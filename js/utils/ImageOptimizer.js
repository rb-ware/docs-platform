/**
 * ImageOptimizer.js
 * 이미지 최적화 유틸리티
 * - Lazy loading
 * - Responsive images
 * - WebP fallback
 */

import { Logger } from './Logger.js';

/**
 * 이미지 Lazy Loading 초기화
 */
export function initLazyLoading() {
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;

          // data-src를 src로 교체
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          // data-srcset를 srcset으로 교체
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          // 로딩 완료 후 클래스 추가
          img.onload = () => {
            img.classList.add('loaded');
            Logger.debug(`Image loaded: ${img.src}`);
          };

          // 더 이상 관찰하지 않음
          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px', // 뷰포트에서 50px 전에 로딩 시작
      threshold: 0.01
    });

    // data-src를 가진 모든 이미지 관찰
    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    Logger.info('Lazy loading initialized');
  } else {
    // IntersectionObserver 미지원 브라우저는 즉시 로딩
    document.querySelectorAll('img[data-src]').forEach(img => {
      if (img.dataset.src) {
        img.src = img.dataset.src;
      }
      if (img.dataset.srcset) {
        img.srcset = img.dataset.srcset;
      }
    });

    Logger.warn('IntersectionObserver not supported, images loaded immediately');
  }
}

/**
 * 이미지를 WebP 포맷으로 변환 (지원하는 경우)
 */
export function convertToWebP(imagePath) {
  // WebP 지원 확인
  const supportsWebP = document.createElement('canvas')
    .toDataURL('image/webp')
    .indexOf('data:image/webp') === 0;

  if (supportsWebP && !imagePath.endsWith('.webp')) {
    // 확장자를 .webp로 변경
    const webpPath = imagePath.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    return webpPath;
  }

  return imagePath;
}

/**
 * Responsive 이미지 srcset 생성
 * @param {string} imagePath - 원본 이미지 경로
 * @param {number[]} widths - 생성할 이미지 너비 배열
 * @returns {string} srcset 문자열
 */
export function generateSrcset(imagePath, widths = [320, 640, 960, 1280, 1920]) {
  const ext = imagePath.match(/\.(jpg|jpeg|png|webp)$/i)?.[0] || '';
  const basePath = imagePath.replace(ext, '');

  return widths
    .map(width => `${basePath}-${width}w${ext} ${width}w`)
    .join(', ');
}

/**
 * 이미지 프리로드
 * @param {string[]} imagePaths - 프리로드할 이미지 경로 배열
 */
export function preloadImages(imagePaths) {
  imagePaths.forEach(path => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = path;
    document.head.appendChild(link);
  });

  Logger.debug(`Preloaded ${imagePaths.length} images`);
}

/**
 * 이미지 로딩 에러 처리
 */
export function handleImageError(imgElement, fallbackSrc) {
  imgElement.onerror = () => {
    if (imgElement.src !== fallbackSrc) {
      Logger.warn(`Image failed to load: ${imgElement.src}, using fallback`);
      imgElement.src = fallbackSrc;
    } else {
      Logger.error(`Fallback image also failed: ${fallbackSrc}`);
      imgElement.style.display = 'none';
    }
  };
}

/**
 * 이미지 최적화 초기화 (자동 실행)
 */
export function initImageOptimization() {
  // Lazy loading 초기화
  initLazyLoading();

  // 콘텐츠 변경 시 다시 초기화 (SPA)
  const contentArea = document.getElementById('docContent');
  if (contentArea) {
    const observer = new MutationObserver(() => {
      initLazyLoading();
    });

    observer.observe(contentArea, {
      childList: true,
      subtree: true
    });
  }

  Logger.info('Image optimization initialized');
}
