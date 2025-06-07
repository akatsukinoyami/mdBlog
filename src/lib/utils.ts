import { browser } from "$app/environment";
import { get, writable } from "svelte/store";
import type { Entity, Togglable } from "./types";

export const url = (...params: string[]) =>
  `/${params.filter(Boolean).join("/")}`;
export const bgUrl = (...params: string[]) => `url("${url(...params)}")`;
export const range = (n: number): number[] => [...Array(n).keys()];
export const getEntityByPath = (
  root: Entity,
  path: string,
): Entity | undefined =>
  path
    .split("/")
    .filter(Boolean)
    .reduce(
      (current: Entity | undefined, segment) => current?.children?.[segment],
      root,
    );

export function togglable<T extends string>(
  key: string,
  defaultValue: T,
  toggleObject: Record<T, T>,
  onupdate: (value: T) => void = () => {},
): Togglable<T> {
  const fromStorage = browser ? (localStorage.getItem(key) as T) : defaultValue;
  const value = fromStorage in toggleObject ? fromStorage : defaultValue;
  return {
    ...writable<T>(value),
    toggle() {
      const newValue = toggleObject[get(this)] ?? defaultValue;
      this.set(newValue);
      onupdate(newValue);
      browser && localStorage.setItem(key, newValue);
    },
  };
}
