import { Writable, get, writable } from "svelte/store";
import { lang } from "./settings";
import i18n from "../i18n";

const t = i18n(get(lang));
export const title: Writable<string> = writable(t.mainTitle);

export const modalImage: Writable<string> = writable("");
export const modalAlt: Writable<string> = writable("");
