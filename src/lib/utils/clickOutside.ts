export function clickOutside(node: HTMLElement, callbackFunction: () => void) {
  function handleClick(e: MouseEvent) {
    const target = e.target as Node;
    if (node.contains(target)) return;
    callbackFunction();
    node.dispatchEvent(new CustomEvent("outsideclick"));
  }

  window.addEventListener("click", handleClick);

  return {
    update(newCallbackFunction: () => void) {
      callbackFunction = newCallbackFunction;
    },
    destroy() {
      window.removeEventListener("click", handleClick);
    },
  };
}
