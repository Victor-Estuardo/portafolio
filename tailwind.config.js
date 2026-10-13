/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arena: "#F4EFE8",
        superficie: "#FBF8F3",
        linea: "#E2D9CC",
        borde: "#CDBFAE",
        tinta: "#25201B",
        suave: "#6B6157",
        terracota: "#B5532F",
      },
      fontFamily: {
        display: ["Newsreader", "Georgia", "serif"],
        cuerpo: ["Figtree", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
