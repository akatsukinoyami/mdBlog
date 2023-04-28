import { Writable, writable } from 'svelte/store';

export const title: Writable<string> = writable("Katsu Nikki");
export const lang: Writable<'en' | 'ru' | 'ua'> = writable(localStorage.lang || 'ru');
export const theme: Writable<'light' | 'dark'> = writable(localStorage.theme || 'dark');
