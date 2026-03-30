import { type Lang } from '$lib/types';

import en from './en';
import ru from './ru';
import ua from './ua';

type Dicts = Record<Lang, typeof ru & typeof en & typeof ua>;

export default function i18n(l: Lang = 'en') {
	const dicts: Dicts = { en, ru, ua } as const;

	return (path: string) => {
		const keys = path.split('.');
		let result: any = dicts[l];

		keys.forEach((key) => {
			result = result?.[key];
		});
		return result;
	};
}
