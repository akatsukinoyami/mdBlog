import { writable } from 'svelte/store';
import { defaultTitle, defaultTheme, defaultLang, themeToggle, langToggle } from './constants';
import { togglable } from './utils';

export const 
	title = writable<string>(defaultTitle),
  theme = togglable('theme', defaultTheme, themeToggle),
  lang = togglable('lang', defaultLang, langToggle);
