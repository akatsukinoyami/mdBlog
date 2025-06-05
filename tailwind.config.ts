import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./{src,static}/**/*.{html,js,ts,svelte}"],
  plugins: [],
  safelist: [
    "grid-cols-1",
    "grid-cols-2",
    "grid-cols-3",
    "grid-cols-4",
    "grid-cols-5",
    "col-span-1",
    "col-span-2",
    "col-span-3",
    "col-span-4",
    "col-span-5",
    "row-span-1",
    "row-span-2",
    "row-span-3",
    "row-span-4",
    "row-span-5",
  ],
} as Config;
