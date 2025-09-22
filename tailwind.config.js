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
        // Fiverr Primary Green
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#1dbf73', // Main Fiverr green
          600: '#19a463',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          DEFAULT: '#1dbf73',
        },
        // Fiverr Secondary Colors
        secondary: {
          50: '#fff7ed',
          100: '#ffedd5',
          200: '#fed7aa',
          300: '#fdba74',
          400: '#fb923c',
          500: '#ff7640', // Fiverr orange
          600: '#e55a2b',
          700: '#c2410c',
          800: '#9a3412',
          900: '#7c2d12',
          DEFAULT: '#ff7640',
        },
        // Fiverr Accent Yellow
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#ffbe5b', // Fiverr yellow
          600: '#f4a442',
          700: '#d97706',
          800: '#b45309',
          900: '#92400e',
          DEFAULT: '#ffbe5b',
        },
        // Fiverr Blue
        blue: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#446ee7', // Fiverr blue
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          DEFAULT: '#446ee7',
        },
        // Fiverr Gray Scale
        gray: {
          50: '#fafbfc',  // Fiverr lightest gray
          100: '#f7f8fc', // Fiverr light gray
          200: '#e4e5e7', // Fiverr border light
          300: '#dadbdd', // Fiverr border medium
          400: '#c5c6c9', // Fiverr border dark
          500: '#b5b6ba', // Fiverr text light
          600: '#95979d', // Fiverr text muted
          700: '#62646a', // Fiverr text secondary
          800: '#404145', // Fiverr text primary
          900: '#222325', // Fiverr dark
        },
        // Fiverr Status Colors
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#1dbf73',
          600: '#16a34a',
          DEFAULT: '#1dbf73',
        },
        warning: {
          50: '#fffbeb',
          100: '#fef3c7',
          500: '#ffbe5b',
          600: '#f4a442',
          DEFAULT: '#ffbe5b',
        },
        error: {
          50: '#fef2f2',
          100: '#fee2e2',
          500: '#ff5a5f',
          600: '#dc2626',
          DEFAULT: '#ff5a5f',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#446ee7',
          600: '#2563eb',
          DEFAULT: '#446ee7',
        },
        // Fiverr Specific Colors
        fiverr: {
          green: '#1dbf73',
          'green-dark': '#19a463',
          'green-light': '#62d396',
          orange: '#ff7640',
          'orange-dark': '#e55a2b',
          yellow: '#ffbe5b',
          'yellow-dark': '#f4a442',
          blue: '#446ee7',
          purple: '#8b5a3c',
          pink: '#ff62ad',
          white: '#ffffff',
          black: '#000000',
        },
      },
      fontFamily: {
        // Noto Kufi Arabic as primary font for everything
        sans: [
          'Noto Kufi Arabic',
          'Arial',
          'sans-serif',
        ],
        // Arabic-specific fonts
        arabic: [
          'Noto Kufi Arabic',
          'Arial',
          'sans-serif',
        ],
        // Display font for headings
        display: [
          'Noto Kufi Arabic',
          'Arial',
          'sans-serif',
        ],
        // Individual font families
        'noto-kufi': ['Noto Kufi Arabic', 'Arial', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        // Fiverr-style shadows
        'fiverr-xs': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'fiverr-sm': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'fiverr': '0 4px 16px rgba(0, 0, 0, 0.12)',
        'fiverr-lg': '0 8px 32px rgba(0, 0, 0, 0.15)',
        'fiverr-xl': '0 12px 48px rgba(0, 0, 0, 0.18)',
        // Card shadows
        'card': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 32px rgba(0, 0, 0, 0.15)',
        // Button shadows
        'button': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'button-hover': '0 4px 8px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      screens: {
        'xs': '475px',
      },
    },
  },
  plugins: [
    // Add any additional plugins here if needed
  ],
}