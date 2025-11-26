import tailgrids from 'tailgrids/plugin'
import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Space Grotesk"', ...defaultTheme.fontFamily.sans],
        sans: ['"Inter"', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        brand: {
          red: '#FF0000',
          dark: '#0F172A',
          light: '#F4F5F7',
        },
      },
      backgroundImage: {
        'hero-photo':
          "linear-gradient(135deg, rgba(15,23,42,0.75), rgba(255,0,0,0.65)), url('/images/events/hero-bg.jpg')",
      },
      animation: {
        'gradient-loop': 'gradient-loop 18s ease-in-out infinite alternate',
        'cta-float': 'cta-float 4s ease-in-out infinite',
        'zoom': 'zoom 20s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-loop': {
          '0%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '50% 100%' },
          '100%': { backgroundPosition: '100% 0%' },
        },
        'cta-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'zoom': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [tailgrids],
}

