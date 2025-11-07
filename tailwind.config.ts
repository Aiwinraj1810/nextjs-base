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
      screens: {
        xxl: "1400px",
      },
      fontFamily: {
        inria: ["Inria Serif", "Rubik", "sans-serif"],
        swear: ["Swear Display", "Rubik", "sans-serif"],
      },
      boxShadow: {
        header: "0 4px 9px 0 rgba(0, 0, 0, 0.1)",
      },
      borderRadius: { sm: "1rem", md: "5.5rem", lg: "8rem" },
      colors: {
        grenadier: "rgba(194, 78, 56, 1)",
        citrine: "rgba(233, 168, 49, 1)",
        fallow: "rgba(194, 152, 110, 1)",
        alto: "rgba(215, 195, 191, 1)",
        "spring-wood": "rgba(230, 221, 215, 1)",
        "spring-wood-light": "rgba(234, 227, 221, 1)",
        black: "rgba(0, 0, 0, 1)",
        grey: "rgba(51, 51, 51, 1)",
        white: "rgba(255, 255, 255, 1)",
      },
      keyframes: {
        "slide-duration": {
          from: { width: "0" },
          to: { width: "100%" },
        },
        pulse: {
          "0%": {
            opacity: 0,
          },
          50: {
            opacity: 0.1,
          },
          100: {
            opacity: 0,
          },
        },
      },
      animation: {
        "slide-duration": "slide-duration 8s linear",
        pulse: "pulse 2.5s infinite",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            maxWidth: "100%",
            "--tw-prose-body": theme("colors.black"),
            "--tw-prose-headings": theme("colors.grey"),
            "--tw-prose-lead": theme("colors.black"),
            "--tw-prose-links": theme("colors.grenadier"),
            "--tw-prose-bold": theme("colors.black"),
            "--tw-prose-bullets": theme("colors.black"),
            "--tw-prose-hr": theme("colors.black"),
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar-hide"),
    require("tailwindcss-animate"),
    plugin(({ addComponents, addBase, theme }) => {
      addBase({
        body: {
          color: theme("colors.grey"),
          background: theme("colors.spring-wood-light"),
          fontFamily: theme("fontFamily.inria"),
          margin: "0",
          fontWeight: "normal",
          fontSmoothing: "antialiased",
          "-webkit-font-smoothing": "antialiased",
          "-moz-osx-font-smoothing": "grayscale",
          overflowX: "hidden",
        },
      });
      addComponents({
        h1: {
          fontSize: "4rem",
          lineHeight: "1.1",
          letterSpacing: "normal",
          fontWeight: "400",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "8rem",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
          },
        },
        h2: {
          fontSize: "4rem",
          lineHeight: "1.2",
          fontWeight: "400",
          letterSpacing: "-0.5px",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "6rem",
          },
        },
        h3: {
          fontSize: "2.6rem",
          fontWeight: "400",
          lineHeight: "1.1",
          letterSpacing: "-0.5px",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "4.6rem",
          },
        },
        h4: {
          fontSize: "3.2rem",
          lineHeight: "1.3",
          fontWeight: "400",
          letterSpacing: "normal",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
        },
        h5: {
          fontSize: "2.6rem",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "normal",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "3rem",
          },
        },
        h6: {
          fontSize: "2.4rem",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "normal",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
        },
        ".h1": {
          fontSize: "4rem",
          lineHeight: "1.1",
          letterSpacing: "normal",
          fontWeight: "400",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "8rem",
            lineHeight: "1.2",
            letterSpacing: "-0.5px",
          },
        },
        ".h2": {
          fontSize: "4rem",
          lineHeight: "1.2",
          fontWeight: "400",
          letterSpacing: "-0.5px",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "6rem",
          },
        },
        ".h3": {
          fontSize: "2.6rem",
          fontWeight: "400",
          lineHeight: "1.1",
          letterSpacing: "-0.5px",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
          "@media (min-width: 640px)": {
            fontSize: "4.6rem",
          },
        },
        ".h4": {
          fontSize: "3.2rem",
          lineHeight: "1.3",
          fontWeight: "400",
          letterSpacing: "normal",
          fontFamily: theme("fontFamily.swear"),
          color: theme("colors.grey"),
        },
        ".mh1": {
          fontSize: "4rem",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "normal",
          color: theme("colors.grey"),
        },
        ".mh2": {
          fontSize: "3.6rem",
          lineHeight: "1.2",
          fontWeight: "400",
          letterSpacing: "-0.5px",
          color: theme("colors.grey"),
        },
        ".mh3": {
          fontSize: "2.6rem",
          lineHeight: "1.1",
          fontWeight: "400",
          letterSpacing: "-0.5px",
          color: theme("colors.grey"),
        },
        ".text-1": {
          fontSize: "3rem",
          fontWeight: "300",
          lineHeight: "1.2",
          letterSpacing: "normal",
          color: theme("colors.black"),
        },
        ".text-2": {
          fontSize: "2rem",
          fontWeight: "300",
          lineHeight: "1.5",
          letterSpacing: "normal",
          color: theme("colors.black"),
        },
        ".text-3": {
          fontSize: "1.6rem",
          fontWeight: "300",
          lineHeight: "1.2",
          letterSpacing: "0.5px",
          color: theme("colors.black"),
        },
        ".text-4": {
          fontSize: "1.4rem",
          fontWeight: "300",
          lineHeight: "1.2",
          letterSpacing: "0.5px",
          color: theme("colors.black"),
        },
        p: {
          fontSize: "1.6rem",
          fontWeight: "300",
          lineHeight: "1.2",
          letterSpacing: "0.5px",
          color: theme("colors.black"),
        },
        a: {
          textDecoration: "none",
          cursor: "pointer",
        },
        ".descripter": {
          fontSize: "1.4rem",
          fontWeight: "400",
          lineHeight: "1.3",
          letterSpacing: "5px",
          textTransform: "uppercase",
          "@media (min-width: 640px)": {
            fontSize: "1.6rem",
          },
        },
        input: {
          outline: "none",
        },
        ".fade-up, .fade-up-stagger": {
          opacity: 0,
          transform: "translateY(2rem)",
        },
        ".fade-left": {
          opacity: 0,
          transform: "translateX(-6rem)",
        },
        ".fade-right": {
          opacity: 0,
          transform: "translateX(6rem)",
        },
        ".scale-in": {
          transform: "scale(0)",
        },
        ".header-transition": {
          transition: "transform .6s ease-out, background .6s ease-out",
        },
        ".blurred-img": {
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        },
        ".blurred-img::before": {
          content: "",
          position: "absolute",
          inset: 0,
          opacity: 0,
          animation: theme("animation.pulse"),
        },
        ".blurred-img.loaded::before": {
          animation: "none",
          content: "none",
        },
        ".blurred-img img": {
          opacity: 0,
          transition: "opacity 250ms ease-in-out",
        },
        ".blurred-img.loaded img": {
          opacity: 1,
        },
        ".swiper-button-prev::after": {
          content: "none",
        },
        ".swiper-button-next::after": {
          content: "none",
        },
      });
    }),
  ],
};
export default config;
