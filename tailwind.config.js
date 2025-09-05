/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#1dbf73',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-kufi-arabic)', 'var(--font-cairo)', 'var(--font-tajawal)', 'Noto Kufi Arabic', 'Cairo', 'Tajawal', 'Segoe UI', 'Tahoma', 'Geneva', 'Verdana', 'sans-serif'],
        arabic: ['var(--font-noto-kufi-arabic)', 'var(--font-cairo)', 'var(--font-tajawal)', 'Noto Kufi Arabic', 'Cairo', 'Tajawal', 'sans-serif'],
        display: ['var(--font-noto-kufi-arabic)', 'var(--font-cairo)', 'var(--font-tajawal)', 'Noto Kufi Arabic', 'Cairo', 'Tajawal', 'sans-serif'],
        cairo: ['var(--font-cairo)', 'Cairo', 'sans-serif'],
        tajawal: ['var(--font-tajawal)', 'Tajawal', 'sans-serif'],
        'noto-kufi': ['var(--font-noto-kufi-arabic)', 'Noto Kufi Arabic', 'sans-serif'],
      },
    },
  },
  plugins: [],
}