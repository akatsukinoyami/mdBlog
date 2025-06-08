import { get, writable } from "svelte/store";
import i18n from "./i18n";
import { defaultLang, defaultTheme } from "./constants";
import { fromStorage } from "./utils";
import type { Lang, Theme } from "./types";

export const lang = fromStorage<Lang>("lang", defaultLang);
export const theme = fromStorage<Theme>("theme", defaultTheme);
export const codeTheme = fromStorage<Theme>("codeTheme", defaultTheme);
export const title = writable<string>(i18n(get(lang))("title.app"));
