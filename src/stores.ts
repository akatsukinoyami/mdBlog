import { derived, readable, writable } from "svelte/store";
import type { Readable, Writable } from "svelte/store";
import en from "./i18n/en.json";
import ru from "./i18n/ru.json";
import ua from "./i18n/ua.json";

type lang    = "en" | "ru" | "ua";
type theme   = "white" | "g10" | "g80" | "g90" | "g100";
type imgMode = "showLink" | "showThumbs" | "showFulls";

export const langs: Readable<lang[]> = readable(["en", "ru", "ua"]);
export const themes: Readable<theme[]> = readable(["white", "g10", "g80", "g90", "g100"]);
export const imgModes: Readable<imgMode[]> = readable(["showLink", "showThumbs", "showFulls"]);

export const lang: Writable<lang> = writable(localStorage.lang || "en");
export const theme: Writable<theme> = writable(localStorage.theme || "g80");
export const imgMode: Writable<imgMode> = writable(localStorage.imgMode || "showThumbs");
export const i18n: Readable<Record<string, any>> = derived(lang, $lang => ({ en, ru, ua }[$lang]));

export const modalImage: Writable<string>  = writable("");
export const modalAlt: Writable<string> = writable("");
