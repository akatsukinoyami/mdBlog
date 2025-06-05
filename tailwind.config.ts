import { range } from "svelte-loading-spinners/utils";
import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./{src,static}/**/*.{html,js,ts,svelte}"],
  plugins: [],
  safelist: range(5)
    .map((n) => [
      `grid-cols-${n}`,
      ["col", "row"].map((type) => `${type}-span-${n}`),
    ])
    .flat(Infinity),
} as Config;
