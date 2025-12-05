/**
 * ImageOptimizer.js
 * 이미지 Lazy Loading 유틸리티
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

          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }

          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }

          img.onload = () => {
            img.classList.add('loaded');
            Logger.debug(`Image loaded: ${img.src}`);
          };

          observer.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
      imageObserver.observe(img);
    });

    Logger.info('Lazy loading initialized');
  } else {
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
 * 이미지 최적화 초기화
 */
export function initImageOptimization() {
  initLazyLoading();

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
