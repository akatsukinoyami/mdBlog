import { browser } from "$app/environment";
import { writable, type Writable } from "svelte/store";
import type { Entity } from "./types";

export const url = (...params: string[]) =>
  `/${params.filter(Boolean).join("/")}`;
export const bgUrl = (...params: string[]) => `url("${url(...params)}")`;
export const range = (n: number): number[] => [...Array(n).keys()];
export const getChild = (current: Entity | undefined, segment: string) =>
  current?.children?.[segment];
export const getEntityByPath = (
  root: Entity,
  path: string,
): Entity | undefined => path.split("/").filter(Boolean).reduce(getChild, root);

export function fromStorage<T>(key: string, def: T): Writable<T> {
  return writable<T>(browser ? (localStorage.getItem(key) as T) : def);
}

export function clickOutside(node: Node) {
  function handleClick(event: MouseEvent) {
    const target = event.target as Node;
    if (node && !node.contains(target) && !event.defaultPrevented) {
      node.dispatchEvent(
        new CustomEvent("click_outside", node as CustomEventInit<unknown>),
      );
    }
  }

  document.addEventListener("click", handleClick, true);
  return {
    destroy() {
      document.removeEventListener("click", handleClick, true);
    },
  };
}
