import MarkdownIt from 'markdown-it';
import deflist from 'markdown-it-deflist';
import { url } from '../url';
import { processEmbeds } from './embeds';
import { processGrids } from './grids';
import { processImages } from './images';
import { spoilerPlugin } from './spoiler';

export function getConverter(path: string, economyMode: boolean) {
	const economy = (yes: string, no: string) => (economyMode ? yes : no);
	const imageBase = url([
		'files',
		path,
		economy('+imagesCompressed/', '+images/')
	]);

	const md = new MarkdownIt({
		html: true,
		linkify: true,
		typographer: true,
		breaks: true
	});
	md.use(deflist);
	md.use(spoilerPlugin);

	md.renderer.rules.dl_open = () =>
		'<dl class="grid md:grid-cols-2 grid-cols-1 gap-x-4 my-5">\n';

	return {
		makeHtml: (content: string) => {
			const processed = processImages(
				processEmbeds(processGrids(content)),
				imageBase,
				economy
			);
			return md.render(processed);
		}
	};
}
