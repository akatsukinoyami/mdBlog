import { browser } from "$app/environment";
import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { Entity } from "../types";

export { classMerger } from "./classMerger";
export { clickOutside } from "./clickOutside";
export { highlight } from "./highlight";
export { getConverter } from "./showdown";
export { modal, openImgModal, closeImgModal } from "./imgModal.svelte";

export const url = (path: string[], searchParams?: Record<string, any>) => {
  let url = `/${path.filter(Boolean).join("/")}`;
  if (searchParams) {
    const params = new URLSearchParams();
    Object.entries(searchParams).forEach(([k, v]) => params.append(k, v));
    url += `?${params}`
  }
  return encodeURI(url);
}
  

export const bgUrl = (path: string[], searchParams?: Record<string, any>) => `url("${url(path, searchParams)}")`;
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
