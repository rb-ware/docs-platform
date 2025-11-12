/**
 * Tests for config.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  CONFIG,
  getBasePath,
  getAssetPath,
  isProductionEnv,
  getCurrentLang,
  isValidSlug,
  sanitizeHTML,
  buildDocumentUrl
} from '../js/config.js';

describe('Config Module', () => {
  describe('CONFIG object', () => {
    it('should have correct structure', () => {
      expect(CONFIG).toBeDefined();
      expect(CONFIG.environment).toBeDefined();
      expect(CONFIG.basePath).toBeDefined();
      expect(CONFIG.docVersion).toBe('v1.0');
      expect(CONFIG.languages.supported).toEqual(['ko', 'en']);
      expect(CONFIG.languages.default).toBe('ko');
    });

    it('should detect development environment', () => {
      expect(CONFIG.isProduction).toBe(false);
      expect(CONFIG.basePath).toBe('./');
    });
  });

  describe('getBasePath()', () => {
    it('should return correct base path for development', () => {
      expect(getBasePath()).toBe('./');
    });
  });

  describe('getAssetPath()', () => {
    it('should return absolute path for relative path', () => {
      const result = getAssetPath('assets/logo.png');
      expect(result).toBe('./assets/logo.png');
    });

    it('should return same path for external URL', () => {
      const url = 'https://example.com/image.png';
      expect(getAssetPath(url)).toBe(url);
    });

    it('should return same path for absolute path', () => {
      const path = '/assets/logo.png';
      expect(getAssetPath(path)).toBe(path);
    });

    it('should remove leading ./ from path', () => {
      const result = getAssetPath('./assets/logo.png');
      expect(result).toBe('./assets/logo.png');
    });
  });

  describe('isProductionEnv()', () => {
    it('should return false in test environment', () => {
      expect(isProductionEnv()).toBe(false);
    });
  });

  describe('getCurrentLang()', () => {
    beforeEach(() => {
      localStorage.clear();
      vi.clearAllMocks();
    });

    it('should return default language when not set', () => {
      localStorage.getItem.mockReturnValue(null);
      expect(getCurrentLang()).toBe('ko');
    });

    it('should return stored language if valid', () => {
      localStorage.getItem.mockReturnValue('en');
      expect(getCurrentLang()).toBe('en');
    });

    it('should return default language if stored language is invalid', () => {
      localStorage.getItem.mockReturnValue('fr');
      expect(getCurrentLang()).toBe('ko');
    });
  });

  describe('isValidSlug()', () => {
    it('should accept valid slugs', () => {
      expect(isValidSlug('setup/installation')).toBe(true);
      expect(isValidSlug('extension/jump')).toBe(true);
      expect(isValidSlug('setup/welding-set')).toBe(true);
      expect(isValidSlug('docs-123')).toBe(true);
      expect(isValidSlug('device_setup/device-installation')).toBe(true);
      expect(isValidSlug('device_setup/communication-setup')).toBe(true);
    });

    it('should reject slugs with path traversal', () => {
      expect(isValidSlug('../etc/passwd')).toBe(false);
      expect(isValidSlug('setup/../../etc/passwd')).toBe(false);
      expect(isValidSlug('docs/../admin')).toBe(false);
    });

    it('should reject slugs with invalid characters', () => {
      expect(isValidSlug('setup<script>')).toBe(false);
      expect(isValidSlug('docs;rm -rf /')).toBe(false);
      expect(isValidSlug('path with spaces')).toBe(false);
    });

    it('should reject empty or null slugs', () => {
      expect(isValidSlug('')).toBe(false);
      expect(isValidSlug(null)).toBe(false);
      expect(isValidSlug(undefined)).toBe(false);
    });

    it('should reject slugs that are too deep', () => {
      expect(isValidSlug('a/b/c/d')).toBe(false);
      expect(isValidSlug('level1/level2/level3/level4')).toBe(false);
    });

    it('should accept slugs up to max depth', () => {
      expect(isValidSlug('a/b/c')).toBe(true);
      expect(isValidSlug('category/subcategory/item')).toBe(true);
    });
  });

  describe('sanitizeHTML()', () => {
    it('should escape HTML tags', () => {
      const input = '<script>alert("xss")</script>';
      const result = sanitizeHTML(input);
      expect(result).toBe('&lt;script&gt;alert("xss")&lt;/script&gt;');
      expect(result).not.toContain('<script>');
    });

    it('should escape HTML entities', () => {
      expect(sanitizeHTML('<div>')).toBe('&lt;div&gt;');
      expect(sanitizeHTML('Test & Example')).toBe('Test &amp; Example');
    });

    it('should handle plain text', () => {
      expect(sanitizeHTML('Hello World')).toBe('Hello World');
    });

    it('should handle empty string', () => {
      expect(sanitizeHTML('')).toBe('');
    });
  });

  describe('buildDocumentUrl()', () => {
    it('should add cache busting parameter when enabled', () => {
      const path = './content/v1.0/ko/setup.md';
      const result = buildDocumentUrl(path);
      expect(result).toMatch(/\.\/content\/v1\.0\/ko\/setup\.md\?t=\d+/);
    });

    it('should not add parameter if cache busting is disabled', () => {
      // Temporarily disable cache busting
      const originalValue = CONFIG.cache.bustQueryParam;
      CONFIG.cache.bustQueryParam = false;

      const path = './content/v1.0/ko/setup.md';
      const result = buildDocumentUrl(path);
      expect(result).toBe(path);

      // Restore original value
      CONFIG.cache.bustQueryParam = originalValue;
    });
  });
});
