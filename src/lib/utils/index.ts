import type { Entity } from "../types";

export { classMerger } from "./classMerger";
export { clickOutside } from "./clickOutside";
export { highlight } from "./highlight";
export { getConverter } from "./showdown";
export { fromStorage } from "./stores";
export { modal, openImgModal, closeImgModal } from "./imgModal.svelte";
export { url, bgUrl } from "./url";

export function range(n: number): number[] {
  return [...Array(n).keys()];
}

export function getChild(current: Entity | undefined, segment: string) {
  return current?.children?.[segment];
}

export function getEntityByPath(
  root: Entity,
  path: string,
): Entity | undefined {
  return path.split("/").filter(Boolean).reduce(getChild, root);
}
