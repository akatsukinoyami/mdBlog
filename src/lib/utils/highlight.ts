import hljs from "highlight.js";

export function highlight(_node: HTMLElement) {
  hljs.highlightAll();

  return {
    update() {
      hljs.highlightAll();
    },
  };
}
