// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          blue: '#3b82f6', // Biru
          white: '#FFFFFF', // Putih
        },
        secondary: {
          navy: '#1e3a8a', // Navy
        },
        background: '#f8fafc', // Warna latar belakang netral
        text: {
          primary: '#0f172a', // Teks utama (gelap)
          secondary: '#64748b', // Teks sekunder (abu-abu)
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        shine: 'shine 1.5s ease-in-out infinite',
      },
      keyframes: {
        shine: {
          '0%': { transform: 'translateX(-100%) skewX(-12deg)' },
          '100%': { transform: 'translateX(200%) skewX(-12deg)' },
        }
      },
      lineClamp: {
        2: '2',
        3: '3',
      }
    },
  },
  plugins: [],
};


export default config;