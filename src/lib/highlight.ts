import hljs from 'highlight.js';

export function highlight(node: HTMLElement) {
  hljs.highlightAll();
  
  return {
    update() {
      hljs.highlightAll();
    }
  };
};