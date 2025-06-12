import adapter from "svelte-adapter-bun";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

const allowedWarnings = new Set(["a11y_click_events_have_key_events"]);

export default {
  preprocess: [vitePreprocess()],
  kit: { adapter: adapter() },
  extensions: [".svelte"],
  compilerOptions: {
    warningFilter: (warning) => !allowedWarnings.has(warning.code),
  },
};
