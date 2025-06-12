import type { UUID } from "crypto";
import type { Writable } from "svelte/store";

export type ClassRecord = Record<string, boolean>;
export type Class = string | string[] | ClassRecord;
export type Lang = "ru" | "en" | "ua";
export type Theme = "light" | "dark";
export type TrafficEconomy = "true" | "false";
export interface Entity {
  id: UUID;
  title: Record<Lang, string>;
  description?: string;
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

export interface Togglable<T extends string | number | symbol>
  extends Writable<T> {
  getNext: (current: T) => T | undefined;
  toggle: () => void;
}

export class Counts {
  view: number;
  like: number;
  share: number;
  comment: number;
}
export class Count {
  type: keyof Counts;
  count: number;
}
