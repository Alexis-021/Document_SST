/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}", // INDISPENSABLE para detectar iconos en DATA_SEDES
  ],
  theme: {
    extend: {
      colors: {
        // Actualizamos al color institucional de Grupo Palmas
        brand: "#8dc63f", 
      }
    },
  },
  plugins: [],
}