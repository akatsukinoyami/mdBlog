import { type Writable, writable } from 'svelte/store';
import { browser } from '$app/environment';
import { type Togglable } from '$lib/types';

export function fromStorage<T extends string>(
	key: string,
	def: T,
	values: T[]
): Togglable<T> {
	let val = def;

	if (browser) {
		val = (localStorage.getItem(key) as T) || def;
		if (!localStorage.getItem(key)) localStorage.setItem(key, def);
	}

	const store: Writable<T> = writable<T>(val);

	const getNext = (current: T): T => {
		const idx = values.indexOf(current);
		return values[(idx + 1) % values.length];
	};

	return {
		...store,
		getNext,
		toggle() {
			store.update((current) => getNext(current));
		}
	};
}
