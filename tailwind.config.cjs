const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        background: "#335c67",
        bgShade: "#111e22",
        bgShade2: "#25434C",
        bgTint: "#5193A5",
        primary: "#fff3b0",
        secondary: "#E09F3E",
        auburn: "#9E2A2B",
        chocolateCosmos: "#540B0E",
      },
      fontFamily: {
        sans: ["Finlandica", ...defaultTheme.fontFamily.sans],
      },
      transitionProperty: {
        width: "width",
      },
    },
  },
  plugins: [],
};
