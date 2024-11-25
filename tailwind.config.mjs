import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,ts}"],
  plugins: [daisyui],
  daisyui: {
    themes: ["winter", "dark"],
  },
};
