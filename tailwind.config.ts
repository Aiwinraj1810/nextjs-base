import type { Config } from "tailwindcss";
import { fontFamily as defaultFontFamily } from "tailwindcss/defaultTheme";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["var(--font-inter)", ...defaultFontFamily.sans],
        "louis-george-cafe": [
          "var(--font-louis-george-cafe)",
          ...defaultFontFamily.sans,
        ],
      },
      keyframes: {
        "slide-duration": {
          from: { width: "0" },
          to: { width: "100%" },
        },
      },
      animation: {
        "slide-duration": "slide-duration 8s linear",
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
    plugin(({ addComponents, addBase, theme }) => {
      addBase({
        body: {
          margin: "0",
        },
      });
      addComponents({
        "h1, .h1": {
          fontSize: "7.4rem",
          lineHeight: "1.4",
          fontWeight: "600",
          letterSpacing: "-2.96px",
          fontFamily: theme("fontFamily.louis-george-cafe"),
        },
        "h2, .h2": {
          fontSize: "4rem",
          lineHeight: "normal",
          fontWeight: "600",
          letterSpacing: "-1.6px",
        },
        "h3, .h3": {
          fontSize: "3.2rem",
          fontWeight: "500",
          lineHeight: "normal",
        },
        "h4, .h4": {
          fontSize: "3rem",
          lineHeight: "normal",
          fontWeight: "600",
          letterSpacing: "-1.2px",
        },
        "h5, .h5": {
          fontSize: "2.8rem",
          lineHeight: "normal",
          fontWeight: "500",
          letterSpacing: "-0.56px",
        },
        "h6, .h6": {
          fontSize: "2.6rem",
          lineHeight: "normal",
          fontWeight: "400",
          letterSpacing: "-1.04px",
        },
        p: {
          fontSize: "2rem",
          fontWeight: "400",
          lineHeight: "1.4",
        },
        ".small": {
          fontSize: "1.4rem",
          fontWeight: "400",
          lineHeight: "1.1",
        },
      });
    }),
  ],
};
export default config;
