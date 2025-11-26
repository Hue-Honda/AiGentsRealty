import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Luxury Gold Palette
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4AF37', // Primary gold
          600: '#B8941E',
          700: '#A17917',
          800: '#8A6310',
          900: '#6B4D0A',
        },
        // Luxury Green Palette
        emerald: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          200: '#A7F3D0',
          300: '#6EE7B7',
          400: '#34D399',
          500: '#10B981', // Primary green
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
        },
        // Black & Dark Palette
        midnight: {
          50: '#2A2A2A',
          100: '#1F1F1F',
          200: '#1A1A1A',
          300: '#151515',
          400: '#121212',
          500: '#0A0A0A', // Primary black
          600: '#080808',
          700: '#050505',
          800: '#030303',
          900: '#000000',
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #B8941E 100%)',
        'gradient-green': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        'gradient-luxury': 'linear-gradient(135deg, #D4AF37 0%, #10B981 50%, #0A0A0A 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
