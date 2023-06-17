import { Readable, Writable, get, readable, writable } from "svelte/store";
import i18n from "./i18n";

type lang    = "en" | "ru" | "ua";
type theme   = "white" | "g10" | "g80" | "g90" | "g100";
type imgMode = "notShown" | "showLink" | "showImg";

export const langs:    Readable<lang[]>    = readable(["en", "ru", "ua"]);
export const themes:   Readable<theme[]>   = readable(["white", "g10", "g80", "g90", "g100"]);
export const imgModes: Readable<imgMode[]> = readable(["notShown", "showLink", "showImg"]);

export const lang:    Writable<lang>     = writable(localStorage.lang || "en");
export const theme:   Writable<theme>    = writable(localStorage.theme || "g80");
export const imgMode: Writable<imgMode>  = writable(localStorage.imgMode || "showImg");

const t = i18n(get(lang));
export const title: Writable<string> = writable(t.mainTitle);

export const modalImage: Writable<string> = writable("");
export const modalAlt: Writable<string> = writable("");
