import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./{src,static}/**/*.{html,js,ts,svelte}"],
  plugins: [],
  safelist: [...Array(5).keys()]
    .map((i) =>
      ["grid-cols-", "col-span-", "row-span-"].map((type) =>
        ["", "sm:", "md:"].map((size) => size + type + i),
      ),
    )
    .flat(Infinity),
} as Config;
