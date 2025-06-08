import { get } from "svelte/store";

import en from "./en";
import ru from "./ru";
import ua from "./ua";

import { lang } from "$lib/stores";
import type { Lang } from "$lib/types";

type Dict = typeof ru & typeof en & typeof ua;
type Dicts = Record<Lang, Dict>;

export default function i18n(l: Lang) {
  const dicts: Dicts = { ru, en, ua } as const;

  if (!l) {
    try {
      l = get(lang);
    } catch {
      l = 'en';
    } 
  }

  return function (path: string) {
    const keys = path.split('.');
    let result: any = dicts[l];

    keys.forEach(key => result = result?.[key]);
    
    return result;
  }
}