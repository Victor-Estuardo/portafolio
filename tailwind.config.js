/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        noche: "#0D1A16",
        hoja: "#142520",
        texto: "#C6D3CC",
        claro: "#EAF1EC",
        maiz: "#F0B429",
        linea: "#27403A",
      },
      fontFamily: {
        display: ['"Familjen Grotesk"', "system-ui", "sans-serif"],
        cuerpo: ["Literata", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
