/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // Indispensable para los iconos en DATA_SEDES
  ],
  theme: {
    extend: {
      colors: {
        palmas: "#8dc63f",
      },
    },
  },
  plugins: [],
}