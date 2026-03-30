import type { UUID } from 'node:crypto';
import type { Writable } from 'svelte/store';

export type ClassRecord = Record<string, boolean>;
export type Class = string | string[] | ClassRecord;
export type Lang = 'ru' | 'en' | 'ua';
export type Theme = 'light' | 'dark';
export type TrafficEconomy = 'true' | 'false';
export type Post = Lang | 'default' | '';
export interface Entity {
	id: UUID;
	title: Record<Lang, string>;
	description?: string;
	post: Post[];
	date: string;
	children: Record<string, Entity>;
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
