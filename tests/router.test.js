/**
 * Tests for Router.js
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';
import { parseRoute, navigateTo } from '../js/core/Router.js';

describe('Router Module', () => {
  beforeEach(() => {
    // Reset window.location
    window.location.pathname = '/';
    window.location.hash = '';
    localStorage.clear();
    vi.clearAllMocks();
  });

  describe('parseRoute()', () => {
    it('should parse hash route in development', () => {
      window.location.hash = '#/setup/installation';
      localStorage.getItem.mockReturnValue('ko');

      const route = parseRoute();
      expect(route.lang).toBe('ko');
      expect(route.slug).toBe('setup/installation');
    });

    it('should return empty slug for hash #/', () => {
      window.location.hash = '#/';
      localStorage.getItem.mockReturnValue('en');

      const route = parseRoute();
      expect(route.lang).toBe('en');
      expect(route.slug).toBe('');
    });

    it('should use default language when not stored', () => {
      window.location.hash = '#/docs/guide';
      localStorage.getItem.mockReturnValue(null);

      const route = parseRoute();
      expect(route.lang).toBe('ko');
    });

    it('should handle empty hash', () => {
      window.location.hash = '';
      localStorage.getItem.mockReturnValue('ko');

      const route = parseRoute();
      expect(route.lang).toBe('ko');
      expect(route.slug).toBe('');
    });
  });

  describe('navigateTo()', () => {
    it('should save language to localStorage', () => {
      const callback = vi.fn();
      navigateTo('en', 'setup/guide', callback);

      expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
    });

    it('should call onNavigate callback with correct parameters', () => {
      const callback = vi.fn();
      navigateTo('ko', 'extension/jump', callback);

      expect(callback).toHaveBeenCalledWith('ko', 'extension/jump');
    });

    it('should set hash in development environment', () => {
      const callback = vi.fn();
      navigateTo('ko', 'setup/installation', callback);

      expect(window.location.hash).toBe('#/setup/installation');
    });

    it('should handle empty slug', () => {
      const callback = vi.fn();
      navigateTo('en', '', callback);

      expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'en');
      expect(callback).toHaveBeenCalledWith('en', '');
    });

    it('should validate and fix invalid language', () => {
      const callback = vi.fn();
      navigateTo('invalid', 'docs/guide', callback);

      expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'ko');
      expect(callback).toHaveBeenCalledWith('ko', 'docs/guide');
    });

    it('should work without callback', () => {
      expect(() => {
        navigateTo('ko', 'test/page');
      }).not.toThrow();

      expect(localStorage.setItem).toHaveBeenCalledWith('lang', 'ko');
    });
  });
});
