import { browser } from "$app/environment";
import { get, writable } from "svelte/store";
import type { Entity, Togglable } from "./types";

export function url(...params: string[]): string {
  return "/" + params.filter(Boolean).join("/");
}

export function range(n: number): number[] {
  return [...Array(n).keys()];
}

export function getEntityByPath(
  root: Entity,
  path: string,
): Entity | undefined {
  const segments = path.split("/").filter(Boolean);
  let current = root;

  segments.forEach((segment) => {
    if (
      !current.children ||
      typeof current.children !== "object" ||
      !(segment in current.children)
    ) {
      return undefined;
    }

    current = current.children[segment];
  });

  return current;
}

export function togglable<T extends string>(
  key: string,
  defaultValue: T,
  toggleObject: Record<T, T>,
): Togglable<T> {
  return {
    ...writable<T>(browser ? (localStorage.getItem(key) as T) : defaultValue),
    toggle() {
      this.set(toggleObject[get(this)]);
    },
  };
}
