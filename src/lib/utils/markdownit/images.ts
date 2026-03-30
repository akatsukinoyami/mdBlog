import { figcaption, figure, img } from './constants';

export function processImages(
	src: string,
	imageBase: string,
	economy: (yes: string, no: string) => string
): string {
	return src.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, rawSrc) => {
		const spanMatch = alt.match(/^([cr])(\d):(.*)$/);
		const spanType = spanMatch ? (spanMatch[1] === 'c' ? 'col' : 'row') : undefined;
		const n = spanMatch?.[2] ?? '1';
		const caption = spanMatch ? spanMatch[3] : alt;

		const imgSrc = rawSrc.startsWith('+images/')
			? imageBase + rawSrc.slice('+images/'.length) + economy('.webp', '')
			: rawSrc;

		const figOpen = figure(spanType).replace('$1', n);
		const imgTag = `<${img} src="${imgSrc}" alt="${caption}" />`;
		const html = caption
			? `<${figOpen}>${imgTag}<${figcaption}>${caption}</figcaption></figure>`
			: `<${figOpen}>${imgTag}</figure>`;

		return `\n\n${html}\n\n`;
	});
}
