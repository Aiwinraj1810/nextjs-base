import localFont from "next/font/local";


const swearDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/SwearDisplay/Swear-Display-Thin.otf",
      weight: "100",
      style: "light",
    },
    {
      path: "../assets/fonts/SwearDisplay/Swear-Display-Regular.otf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-swearDisplay",
   display: "swap",
});

const inria = localFont({
  src: [
    {
      path: "../assets/fonts/Inria_Serif/InriaSerif-Light.ttf",
      weight: "100",
      style: "light",
    },
    {
      path: "../assets/fonts/Inria_Serif/InriaSerif-Regular.ttf",
      weight: "300",
      style: "normal",
    },
  ],
  variable: "--font-inria",
   display: "swap",
});

export { swearDisplay, inria };

