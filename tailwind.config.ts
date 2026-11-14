import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Newsreader', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      colors: {
        brand: {
          navy: '#0B1F40',
          dark: '#061021',
          sky: '#0284C7',
          skyLight: '#38BDF8',
          gold: '#F59E0B',
          amber: '#D97706',
          slate: '#F8FAFC',
        },
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'float-slow': 'float 6s ease-in-out infinite',
        'shimmer-gold': 'shimmerGold 7s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmerGold: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
