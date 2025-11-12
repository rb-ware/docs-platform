/**
 * Tests for ContentService.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { loadContent } from '../js/services/ContentService.js';
import { Logger } from '../js/utils/Logger.js';
import { ErrorHandler } from '../js/utils/ErrorHandler.js';

describe('ContentService Module', () => {
  let mockDocElement;
  let mockContentArea;

  beforeEach(() => {
    // Setup DOM
    document.body.innerHTML = `
      <div id="docContent"></div>
      <div id="contentArea"></div>
    `;

    mockDocElement = document.getElementById('docContent');
    mockContentArea = document.getElementById('contentArea');
    mockContentArea.scrollTo = vi.fn();

    // Reset mocks
    vi.clearAllMocks();
    global.fetch = vi.fn();

    // Mock Logger and ErrorHandler
    vi.spyOn(Logger, 'error').mockImplementation(() => {});
    vi.spyOn(Logger, 'info').mockImplementation(() => {});
    vi.spyOn(ErrorHandler, 'capture').mockImplementation(() => {});
  });

  describe('loadContent()', () => {
    it('should reject invalid slugs', async () => {
      await loadContent('../../../etc/passwd', 'ko');

      expect(mockDocElement.innerHTML).toContain('Invalid document path');
      expect(Logger.error).toHaveBeenCalledWith(
        expect.stringContaining('Invalid slug')
      );
    });

    it('should reject slugs with special characters', async () => {
      await loadContent('setup<script>', 'ko');

      expect(mockDocElement.innerHTML).toContain('Invalid document path');
    });

    it('should load valid markdown content', async () => {
      const markdownContent = '# Test Document\n\nThis is a test.';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/installation', 'ko');

      expect(global.fetch).toHaveBeenCalled();
      const fetchUrl = global.fetch.mock.calls[0][0];
      expect(fetchUrl).toContain('./content/v1.0/ko/setup/installation.md');
      expect(mockDocElement.innerHTML).toContain('<h1>Test Document</h1>');
    });

    it('should handle fetch errors gracefully', async () => {
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404
      });

      await loadContent('nonexistent/doc', 'ko');

      expect(mockDocElement.innerHTML).toContain('문서를 불러오는 중 오류가 발생했습니다');
      expect(Logger.error).toHaveBeenCalled();
    });

    it('should validate and fix invalid language', async () => {
      const markdownContent = '# Test';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'invalid-lang');

      const fetchUrl = global.fetch.mock.calls[0][0];
      expect(fetchUrl).toContain('/ko/'); // Should fallback to default 'ko'
    });

    it('should apply proper CSS classes', async () => {
      const markdownContent = '# Test';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'ko');

      expect(mockDocElement.className).toContain('prose');
      expect(mockDocElement.className).toContain('max-w-4xl');
    });

    it('should scroll to top after loading', async () => {
      const markdownContent = '# Test';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'ko');

      expect(mockContentArea.scrollTo).toHaveBeenCalledWith({
        top: 0,
        behavior: 'smooth'
      });
    });

    it('should include footer in rendered content', async () => {
      const markdownContent = '# Test Document';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'ko');

      expect(mockDocElement.innerHTML).toContain('© 2025 RBWare Co., Ltd.');
      expect(mockDocElement.innerHTML).toContain('<footer');
    });

    it('should handle missing docContent element', async () => {
      document.body.innerHTML = ''; // Remove elements

      await loadContent('setup/guide', 'ko');

      // Should return early without error
      expect(global.fetch).not.toHaveBeenCalled();
    });

    it('should add cache busting parameter to fetch URL', async () => {
      const markdownContent = '# Test';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'ko');

      const fetchUrl = global.fetch.mock.calls[0][0];
      expect(fetchUrl).toMatch(/\?t=\d+/);
    });

    it('should process image paths correctly', async () => {
      const markdownContent = '![Logo](../../../assets/logo.png)';
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(markdownContent)
      });

      await loadContent('setup/guide', 'ko');

      expect(mockDocElement.innerHTML).toContain('src="./assets/logo.png"');
    });

    it('should handle network errors', async () => {
      global.fetch.mockRejectedValueOnce(new Error('Network error'));

      await loadContent('setup/guide', 'ko');

      expect(mockDocElement.innerHTML).toContain('문서를 불러오는 중 오류가 발생했습니다');
      expect(Logger.error).toHaveBeenCalled();
      expect(ErrorHandler.capture).toHaveBeenCalled();
    });
  });
});
