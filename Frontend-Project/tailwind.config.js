/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#131313",
        "block-turn": "#2f2c3e",
        gris: "#a29e9f",
        block: "#646264",
        "border-botton-red": "#ae6861",
        "botton-red": "#5e3435",
        "border-botton-green": "#325f3e",
        "botton-green": "#0d2613",
        "background-seleccionar-ficha": "#162736",
        "blue-side": "#233548",
      },
      fontFamily: {
        roboto: "'Open Sans', sans-serif",
      },
    },
  },
  plugins: [],
};
