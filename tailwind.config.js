/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./js/**/*.{js,ts,jsx,tsx}",
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      colors: {
        'rb-bg': '#071B3C',
        'rb-text': '#1f2937',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            color: '#374151',
            a: {
              color: '#ff2e2e',
              '&:hover': {
                color: '#dc2626',
              },
            },
            'code::before': {
              content: '""'
            },
            'code::after': {
              content: '""'
            },
            code: {
              color: '#dc2626',
              backgroundColor: '#f3f4f6',
              padding: '0.125rem 0.375rem',
              borderRadius: '0.25rem',
              fontWeight: '500',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#e5e7eb',
            },
            'pre code': {
              backgroundColor: 'transparent',
              color: 'inherit',
              padding: 0,
            },
            h1: {
              color: '#111827',
              fontWeight: '700',
            },
            h2: {
              color: '#111827',
              fontWeight: '600',
              borderBottomWidth: '1px',
              borderBottomColor: '#e5e7eb',
              paddingBottom: '0.5rem',
            },
            h3: {
              color: '#111827',
              fontWeight: '600',
            },
            table: {
              width: '100%',
            },
            'thead th': {
              backgroundColor: '#f9fafb',
              borderBottomWidth: '2px',
              borderBottomColor: '#e5e7eb',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: '#e5e7eb',
            },
            blockquote: {
              borderLeftColor: '#ff2e2e',
              backgroundColor: '#fef2f2',
              padding: '0.75rem 1rem',
            },
            hr: {
              borderColor: '#e5e7eb',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
      },
    },
  },
  plugins: [],
}
