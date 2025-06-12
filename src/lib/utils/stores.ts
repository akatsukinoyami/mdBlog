import { writable, type Writable } from "svelte/store";
import { browser } from "$app/environment";

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
