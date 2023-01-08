import { Writable, writable } from 'svelte/store';

export const title: Writable<string> = writable("Katsu Nikki");
export const theme: Writable<'light' | 'dark'> = writable(localStorage.theme || 'light');
