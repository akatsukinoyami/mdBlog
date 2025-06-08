import { get, writable } from "svelte/store";
import { browser } from "$app/environment";
import i18n from "./i18n";
import { defaultLang, defaultTheme } from "./constants";
import type { Lang, Theme } from "./types";

export const lang = writable<Lang>(browser ? localStorage?.lang : defaultLang);
export const theme = writable<Theme>(browser ? localStorage?.theme : defaultTheme);
export const codeTheme = writable<Theme>(browser ? localStorage?.codeTheme : defaultTheme);
export const title = writable<string>(i18n(get(lang))("title.app"));
