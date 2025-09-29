/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#fff8f0',
        foreground: '#4a2e2b',
        accentLightPink: '#f8d7da',
        accentSoftRose: '#f5b6b8',
        white: '#ffffff',

        shadowLight: 'rgba(0, 0, 0, 0.15)',
        shadowPinkLight: 'rgba(255, 182, 193, 0.15)',
        shadowPinkLightHover: 'rgba(255, 182, 193, 0.25)',

        gradientPink: '#fdf2f8',
        gradientCream: '#fefbf3',
        gradientBlue: '#f0f9ff',

        pastelPink: '#fce7f3',
        pastelBlue: '#dbeafe',
        pastelPurple: '#e9d5ff',
        pastelGreen: '#d1fae5',
        pastelYellow: '#fef3c7',
        pastelOrange: '#fed7aa',
      },
    },
  },
  plugins: [],
};
