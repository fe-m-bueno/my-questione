import type { Config } from 'tailwindcss';
import fluid, { extract, screens, fontSize } from 'fluid-tailwind';

const config: Config = {
  content: {
    files: [
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    extract,
  },
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    screens,
    fontSize,
    extend: {
      screens: {
        xsm: '8rem',
        xs: '20rem',
      },
      fontFamily: {
        sans: ['Inter Variable', 'sans-serif'],
        mono: ['Geist Mono Variable', 'sans-serif'],
      },
      colors: {
        light: {
          background: '#f2f2f2',
          foreground: '#f9f9f9',
          sidebar: '#f9f9f9',
          text: '#0d0d0d',
          textSecondary: '#2d2d2d',
          border: 'rgba(0,0,0,0.15)',
          accentBlue: '#1A73E8',
          accentGreen: '#14B88F',
          accentRed: '#D93025',
        },

        dark: {
          background: '#212121',
          foreground: '#2f2f2f',
          sidebar: '#171717',
          text: '#ececec',
          textSecondary: '#b4b4b4',
          border: 'rgba(0,0,0,0.15)',
          accentBlue: '#3C82F6',
          accentGreen: '#1BBF91',
          accentRed: '#E24444',
        },
      },
    },
  },
  plugins: [fluid],
};
export default config;
