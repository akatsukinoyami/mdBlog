import { get, writable } from 'svelte/store';
import { defaultLang, defaultTheme, defaultTrafficEconomy } from './constants';
import i18n from './i18n';
import { type Lang, type Theme, type TrafficEconomy } from './types';
import { fromStorage } from './utils';

export const lang = fromStorage<Lang>('lang', defaultLang);
export const theme = fromStorage<Theme>('theme', defaultTheme);
export const codeTheme = fromStorage<Theme>('codeTheme', defaultTheme);
export const trafficEconomy = fromStorage<TrafficEconomy>('trafficEconomy', defaultTrafficEconomy);
export const title = writable<string>(i18n(get(lang))('title.app'));
