import { iframe } from './constants';

export function processEmbeds(src: string): string {
	return src.replace(
		/@\[(.+?)\]\((.+?)\)\{(.*?)\}/g,
		(_, title, embedSrc, cls) =>
			`<${iframe.replace('$1', cls)} src="${embedSrc}" title="${title}"></iframe>`
	);
}
