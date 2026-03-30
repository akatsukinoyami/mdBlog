import { defaultLang, defaultTheme, defaultTrafficEconomy, langs, themes } from './constants';
import { type Lang, type Theme, type TrafficEconomy } from './types';
import { fromStorage } from './utils/stores';

export const lang = fromStorage<Lang>('lang', defaultLang, langs);
export const theme = fromStorage<Theme>('theme', defaultTheme, themes);
export const trafficEconomy = fromStorage<TrafficEconomy>('trafficEconomy', defaultTrafficEconomy, ['true', 'false']);
