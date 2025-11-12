/**
 * Tests for SearchService.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { initSearch } from '../js/services/SearchService.js';

describe('SearchService Module', () => {
  let mockDesktopInput;
  let mockResultsBox;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <input id="searchInput" type="text" />
      <input id="mobileSearchInput" type="text" />
      <div id="searchResults" class="hidden"></div>
      <div id="docContent"></div>
      <div id="contentArea"></div>
    `;

    mockDesktopInput = document.getElementById('searchInput');
    mockResultsBox = document.getElementById('searchResults');

    // Reset mocks
    vi.clearAllMocks();
    global.fetch = vi.fn();
    console.error = vi.fn();
  });

  describe('initSearch()', () => {
    const mockSearchIndex = [
      {
        slug: 'setup/installation',
        title: 'Installation Guide',
        desc: 'How to install the software'
      },
      {
        slug: 'setup/configuration',
        title: 'Configuration Guide',
        desc: 'How to configure your setup'
      },
      {
        slug: 'extension/jump',
        title: 'Jump Extension',
        desc: 'Quick navigation extension'
      }
    ];

    it('should fetch and cache search index', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      expect(global.fetch).toHaveBeenCalled();
      const fetchUrl = global.fetch.mock.calls[0][0];
      expect(fetchUrl).toContain('search_index.json');
    });

    it('should filter results based on title match', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      // Simulate user input
      mockDesktopInput.value = 'installation';
      mockDesktopInput.dispatchEvent(new Event('input'));

      // Wait for DOM update
      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.classList.contains('hidden')).toBe(false);
      // Check if result contains the title (may be highlighted with <mark> tags)
      expect(mockResultsBox.textContent).toContain('Installation Guide');
    });

    it('should filter results based on description match', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = 'configure';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.innerHTML).toContain('Configuration Guide');
    });

    it('should hide results when query is empty', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = '';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.classList.contains('hidden')).toBe(true);
    });

    it('should show "no results" message when nothing matches', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = 'nonexistent-query-xyz';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.innerHTML).toContain('검색 결과 없음');
    });

    it('should limit results to 5 items', async () => {
      const largeIndex = Array.from({ length: 20 }, (_, i) => ({
        slug: `doc${i}`,
        title: `Document ${i}`,
        desc: `Description for document ${i}`
      }));

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(largeIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = 'document';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      const resultItems = mockResultsBox.querySelectorAll('[data-slug]');
      expect(resultItems.length).toBeLessThanOrEqual(5);
    });

    it('should be case insensitive', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = 'INSTALLATION';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.textContent).toContain('Installation Guide');
    });

    it('should highlight search query in results', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = 'guide';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.innerHTML).toContain('<mark');
      expect(mockResultsBox.innerHTML).toContain('bg-yellow-200');
    });

    it('should sanitize HTML in search query to prevent XSS', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      mockDesktopInput.value = '<script>alert("xss")</script>';
      mockDesktopInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      // Should not contain executable script tag
      expect(mockResultsBox.innerHTML).not.toContain('<script>alert');
    });

    it('should handle missing search input elements gracefully', async () => {
      document.body.innerHTML = '<div></div>'; // Remove search elements

      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await expect(initSearch('ko')).resolves.not.toThrow();
    });

    it('should work with mobile search input', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockSearchIndex)
      });

      await initSearch('ko');

      const mobileInput = document.getElementById('mobileSearchInput');
      mobileInput.value = 'jump';
      mobileInput.dispatchEvent(new Event('input'));

      await new Promise(resolve => setTimeout(resolve, 0));

      expect(mockResultsBox.textContent).toContain('Jump Extension');
    });
  });
});
