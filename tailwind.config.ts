import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#1e3a8a',  // Navy Blue
          600: '#1e40af',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a'
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#0d9488',  // Teal
          600: '#0f766e',
          700: '#115e59',
          800: '#134e4a',
          900: '#042f2e'
        },
        brand: {
          primary: {
            text: '#1e3a8a',    // Navy Blue
            DEFAULT: '#1e3a8a'
          },
          accent: {
            DEFAULT: '#0d9488',  // Teal
            hover: '#3b82f6'     // Soft Blue
          },
          background: {
            DEFAULT: '#ffffff'   // White
          },
          secondary: {
            text: '#d1d5db',     // Light Gray
            DEFAULT: '#d1d5db'
          },
          shadow: {
            DEFAULT: '#0a6f6a'   // Dark Teal
          }
        }
      },
      backgroundImage: {
        'gradient-teal-navy': 'linear-gradient(to right, #0d9488, #1e3a8a)',
        'gradient-overlay': 'linear-gradient(to right, rgba(13, 148, 136, 0.1), rgba(30, 58, 138, 0.1))'
      },
      boxShadow: {
        'brand': '0 4px 6px -1px rgba(10, 111, 106, 0.3), 0 2px 4px -1px rgba(10, 111, 106, 0.2)'
      }
    },
  },
  plugins: [],
}
export default config;
