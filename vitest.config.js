import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    // Test environment
    environment: 'jsdom',

    // Global test setup
    globals: true,

    // Coverage configuration
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        'tests/',
        '*.config.js'
      ]
    },

    // Include test files
    include: ['tests/**/*.test.js'],

    // Mock localStorage and other browser APIs
    setupFiles: ['./tests/setup.js']
  },

  // Module resolution (same as vite.config.js)
  resolve: {
    alias: {
      '@': resolve(__dirname, './js'),
      '@content': resolve(__dirname, './content'),
      '@assets': resolve(__dirname, './assets')
    }
  }
});
