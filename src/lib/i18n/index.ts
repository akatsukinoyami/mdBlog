import { get } from 'svelte/store';
import { lang } from '$lib/stores';
import { type Lang } from '$lib/types';

import en from './en';
import ru from './ru';
import ua from './ua';

type Dicts = Record<Lang, typeof ru & typeof en & typeof ua>;

export default function i18n(l: Lang) {
	const dicts: Dicts = { ru, en, ua } as const;

	if (!l) {
		try {
			l = get(lang);
		} catch {
			l = 'en';
		}
	}

	return (path: string) => {
		const keys = path.split('.');
		let result: any = dicts[l];

		keys.forEach((key) => {
			result = result?.[key];
		});
		return result;
	};
}
