// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // IMPORTANT : On surveille tous les fichiers dans app/ et src/
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // Voici tes couleurs YatouApp
        primary: "#00CFE4",    // Turquoise
        secondary: "#1A2B3C",  // Bleu Marine
        background: "#F5F7FA", // Gris clair
        surface: "#FFFFFF",    // Blanc
        success: "#2ECC71",
        error: "#E74C3C",
      },
    },
  },
  plugins: [],
};