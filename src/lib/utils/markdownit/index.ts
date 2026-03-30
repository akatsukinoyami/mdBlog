import MarkdownIt from 'markdown-it';
import { url } from '../url';
import { processEmbeds } from './embeds';
import { processGrids } from './grids';
import { processImages } from './images';
import { spoilerPlugin } from './spoiler';

export function getConverter(path: string, economyMode: boolean) {
	const economy = (yes: string, no: string) => (economyMode ? yes : no);
	const imageBase = url(['files', path, economy('+imagesCompressed/', '+images/')]);

	const md = new MarkdownIt({ html: true, linkify: true, typographer: true, breaks: true });
	md.use(spoilerPlugin);

	return {
		makeHtml: (content: string) => {
			const processed = processImages(processEmbeds(processGrids(content)), imageBase, economy);
			return md.render(processed);
		}
	};
}
