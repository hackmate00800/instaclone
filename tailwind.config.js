/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        instagram: {
          pink: '#E4405F',
          purple: '#8A3AB9',
          orange: '#FCAF45',
          yellow: '#FFDC80',
          blue: '#0095F6',
          'blue-light': '#B3E0FF',
          'gray-light': '#F8F9FA',
          'gray-border': '#DBDBDB',
        },
      },
      fontFamily: {
        'instagram': ['Instagram Sans', 'Roboto', 'Arial', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.5s ease-out',
        'heart-beat': 'heartBeat 0.5s ease-in-out',
      },
      keyframes: {
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        heartBeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.2)' },
          '50%': { transform: 'scale(0.95)' },
          '75%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}