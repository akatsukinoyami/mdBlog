import { Readable, Writable, get, readable, writable } from "svelte/store";
import i18nObject from "./jsons/i18n.json";

type lang = "en" | "ru" | "ua";
type theme = "white" | "g10" | "g80" | "g90" | "g100";

export const langs:  Readable<lang[]>  = readable(["en", "ru", "ua"]);
export const themes: Readable<theme[]> = readable(["white", "g10", "g80", "g90", "g100"]);

export const lang:  Writable<lang>   = writable(localStorage.lang || "ru");
export const theme: Writable<theme>  = writable(localStorage.theme || "white");
export const title: Writable<string> = writable(i18nObject[get(lang)].mainTitle);

export const modalImage: Writable<string> = writable("");
export const modalAlt: Writable<string> = writable("");
