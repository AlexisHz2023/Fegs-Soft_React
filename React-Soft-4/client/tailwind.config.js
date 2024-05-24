// tailwind.config.js
const {nextui} = require("@nextui-org/react");
const scrollbar = require('tailwind-scrollbar');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    './pages/**/*.{html,js}',
    './components/**/*.{html,js}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#4484d4', // Azul Pastel
        'secondary':'#73a3dc', // Azul segundo
        'tertiary' : '#a3c3e4', //azul tercero
        'Third': '#f49825', // Anaranjado
        'dark-blue': '#ccdff5',
        'dark1-blue': '#a4c6ed',
        'dark2-blue': '#85b3e7'
      }
    }
  },
  darkMode: "class",
  plugins: [
    nextui(),
    scrollbar,
  ],

};