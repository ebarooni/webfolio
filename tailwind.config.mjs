import daisyui from "daisyui";
import { themesArray } from "./src/app/constants/themes-array";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  plugins: [daisyui],
  daisyui: {
    themes: themesArray,
  },
};
