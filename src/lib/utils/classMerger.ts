import type { Class, ClassRecord } from '$lib/types';

function formatPhase(acc: ClassRecord, item: string): ClassRecord {
	return { ...acc, [item]: true };
}

function mergePhase(acc: ClassRecord, klass: Class) {
	return { ...acc, ...classFormatter(klass) };
}

export function classFormatter(klass: Class): ClassRecord {
	if (typeof klass === 'string') {
		return { [klass]: true };
	} else if (Array.isArray(klass)) {
		return klass.reduce(formatPhase, {} as ClassRecord);
	}
	return klass;
}

export function classMerger(...classes: Class[]) {
	return classes.reduce<ClassRecord>(mergePhase, {} as ClassRecord);
}
