import { Readable, Writable, readable, writable } from "svelte/store";

type lang    = "en" | "ru" | "ua";
type theme   = "white" | "g10" | "g80" | "g90" | "g100";
type imgMode = "notShown" | "showLink" | "showThumbs" | "showFulls";

export const langs:    Readable<lang[]>    = readable(["en", "ru", "ua"]);
export const themes:   Readable<theme[]>   = readable(["white", "g10", "g80", "g90", "g100"]);
export const imgModes: Readable<imgMode[]> = readable(["notShown", "showLink", "showThumbs", "showFulls"]);

export const lang:    Writable<lang>     = writable(localStorage.lang || "en");
export const theme:   Writable<theme>    = writable(localStorage.theme || "g80");
export const imgMode: Writable<imgMode>  = writable(localStorage.imgMode || "showThumbs");