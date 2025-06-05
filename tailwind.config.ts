import type { Config } from "tailwindcss";

export default {
  darkMode: "class",
  content: ["./{src,static}/**/*.{html,js,ts,svelte,md,yml,yaml}"],
  plugins: [],
  safelist: [
    ...[...Array(5).keys()]
      .map((i) =>
        ["grid-cols-", "col-span-", "row-span-"].map((type) =>
          ["", "sm:", "md:"].map((size) => size + type + i),
        ),
      )
      .flat(Infinity),
    ...["w-", "h-"]
      .map((type) => ["full", 250, 70].map((size) => type + size))
      .flat(Infinity),
  ],
} as Config;
