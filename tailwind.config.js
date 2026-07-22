/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        warriors: {
          royal: '#1D428A', // Warriors Royal Blue
          gold: '#FFC72C',  // Warriors Gold
          slate: '#26282A', // Warriors Slate/Black
        },
        cream: '#FBF7EE',
        neon: {
          pink: '#FF3B9A',
          blue: '#3BC9FF',
          gold: '#FFD23B',
        },
      },
      fontFamily: {
        comic: ['"Comic Sans MS"', '"Comic Neue"', '"Chalkboard SE"', 'system-ui', 'sans-serif'],
        display: ['"Baloo 2"', '"Fredoka"', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        hoops: '0 10px 30px -10px rgba(29, 66, 138, 0.45)',
        gold: '0 8px 24px -6px rgba(255, 199, 44, 0.55)',
      },
      keyframes: {
        bounceIn: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '60%': { transform: 'scale(1.05)', opacity: '1' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        swish: {
          '0%, 100%': { transform: 'rotate(-6deg)' },
          '50%': { transform: 'rotate(6deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(255, 199, 44, 0.0)' },
          '50%': { boxShadow: '0 0 24px 6px rgba(255, 199, 44, 0.55)' },
        },
      },
      animation: {
        bounceIn: 'bounceIn 0.5s ease-out',
        swish: 'swish 2.5s ease-in-out infinite',
        floaty: 'floaty 3s ease-in-out infinite',
        pulseGlow: 'pulseGlow 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
