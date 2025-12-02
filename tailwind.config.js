/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/*.{js,ts,jsx,tsx}",  /* Catches files directly in src */
    "./**/*.html"                /* Catches any HTML file */
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}