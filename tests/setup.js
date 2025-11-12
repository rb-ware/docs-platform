/**
 * Test setup file
 * Mocks browser APIs and global objects for testing
 */

import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
};
global.localStorage = localStorageMock;

// Mock window.location
delete window.location;
window.location = {
  hostname: 'localhost',
  pathname: '/',
  hash: '',
  href: 'http://localhost:3000/',
  origin: 'http://localhost:3000',
};

// Mock fetch
global.fetch = vi.fn();

// Reset mocks before each test
beforeEach(() => {
  vi.clearAllMocks();
  localStorageMock.getItem.mockReturnValue(null);
});
