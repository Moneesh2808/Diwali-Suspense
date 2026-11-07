/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sky: {
          dark: '#02030A',
          navy: '#071126',
          violet: '#180D2C',
        },
        diya: {
          gold: '#FFC857',
          flame: '#FF6B1A',
          amber: '#F59E0B',
          glow: '#FFE29A',
        },
        romantic: {
          pink: '#FF4D8D',
          rose: '#FF2A70',
          purple: '#9D4EDD',
          crimson: '#FF2A55',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        cinzel: ['"Cinzel Decorative"', 'serif'],
        handwriting: ['"Great Vibes"', 'cursive'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 2s infinite alternate ease-in-out',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite linear',
        'flame-sway': 'flameSway 1.8s infinite ease-in-out alternate',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { transform: 'scale(1) rotate(-1deg)', opacity: '0.95', filter: 'brightness(1)' },
          '25%': { transform: 'scale(1.08, 0.95) rotate(1.5deg)', opacity: '1', filter: 'brightness(1.15)' },
          '50%': { transform: 'scale(0.96, 1.05) rotate(-2deg)', opacity: '0.88', filter: 'brightness(0.95)' },
          '75%': { transform: 'scale(1.05, 1.02) rotate(1deg)', opacity: '0.98', filter: 'brightness(1.1)' },
        },
        flameSway: {
          '0%': { transform: 'skewX(-2deg) scale(0.98, 1.02)' },
          '50%': { transform: 'skewX(2.5deg) scale(1.02, 0.97)' },
          '100%': { transform: 'skewX(-1.5deg) scale(1, 1)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}

