import { writable } from "svelte/store";
import { togglable } from "./utils";
import type { Lang, Theme } from "./types";

const 
  defaultTheme: Theme = "dark",
  defaultLang: Lang = "en",
  themeToggle: Record<Theme, Theme> = { dark: "light", light: "dark" },
  langToggle: Record<Lang, Lang> = { ru: "en", en: "ua", ua: "ru" };
  
export const 
  defaultTitle: string = "Katsu Nikki",
  title = writable<string>(defaultTitle),
  theme = togglable("theme", defaultTheme, themeToggle, (v) => document.documentElement.classList.toggle('dark', v === 'dark')),
  lang = togglable("lang", defaultLang, langToggle, (v) => document.documentElement.lang = v);
