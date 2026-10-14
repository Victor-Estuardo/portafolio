/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        arena: "#F4F4F1", // fondo de la página
        superficie: "#FFFFFF", // tarjetas
        hundido: "#EDEDE8", // chips y fondos internos
        linea: "#E6E5E0", // borde fino de tarjetas
        borde: "#D2D0C9", // borde de controles
        tinta: "#181816",
        suave: "#64635D",
        terracota: "#A4472A", // único acento
        brasa: "#F6E8E2", // tinte del acento
        activo: "#2F8F5B", // solo el punto de disponibilidad
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        cuerpo: ["Geist", "system-ui", "sans-serif"],
      },
      boxShadow: {
        tarjeta:
          "0 1px 2px rgb(24 24 22 / 0.04), 0 14px 32px -22px rgb(24 24 22 / 0.22)",
        elevada:
          "0 2px 4px rgb(24 24 22 / 0.05), 0 24px 44px -24px rgb(24 24 22 / 0.32)",
      },
    },
  },
  plugins: [],
};
