import type { Lang, Theme, TrafficEconomy } from './types';

// Store values

export const defaultTheme: Theme = 'dark' as const;
export const defaultTrafficEconomy: TrafficEconomy = 'true' as const;
export const defaultLang: Lang = 'en' as const;
export const langs: Lang[] = ['en', 'ru', 'ua'] as const;
export const themes: Theme[] = ['dark', 'light'] as const;
