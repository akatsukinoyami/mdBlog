import type { Writable } from "svelte/store";

export type ClassRecord = Record<string, boolean>;
export type Class = string | string[] | ClassRecord;

export type Lang = "ru" | "en" | "ua";

export type Theme = "light" | "dark";

export interface Entity {
  title: {
    en: string;
    ru: string;
    ua: string;
  };
  post: Array<Lang | "default" | "">;
  date: string;
  children: Record<string, Entity>;
}

export interface ShowdownExtension {
  type: "lang" | "output";
  regex?: RegExp;
  replace?: string;
  filter?: (text: string) => string;
}

export interface Togglable<T> extends Writable<T> {
  toggle: () => void;
}
