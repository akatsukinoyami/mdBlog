import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Entity } from "../types";

export { classMerger } from "./classMerger";
export { clickOutside } from "./clickOutside";
export { highlight } from "./highlight";
export { getConverter } from "./showdown";
export { modal, openImgModal, closeImgModal } from "./imgModal.svelte";

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

export function fromStorage<T extends string>(
  key: string,
  def: T,
): Writable<T> {
  let val = def;

  if (browser) {
    val = localStorage.getItem(key) as T;
    if (!val) {
      localStorage.setItem(key, def);
      val = def;
    }
  }

  return writable<T>(val);
}
