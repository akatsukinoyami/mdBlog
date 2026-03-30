import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import { figcaption, figure, iframe, img } from '../constants';
import { url } from './url';

export function getConverter(path: string, economyMode: boolean) {
	const economy = (yes: string, no: string) => (economyMode ? yes : no);
	const imageBase = url(['files', path, economy('+imagesCompressed/', '+images/')]);

	const md = new MarkdownIt({
		html: false,
		linkify: true,
		typographer: true,
		breaks: true
	});

	// :::N grid container
	// :::3 ... ::: renders as a 3-column grid
	for (const cols of [1, 2, 3, 4, 5]) {
		md.use(container, String(cols), {
			render(tokens: any[], idx: number) {
				return tokens[idx].nesting === 1
					? `<div class="grid md:grid-cols-${cols} grid-cols-1 gap-x-4 my-5">\n`
					: '</div>\n';
			}
		});
	}

	// ::cN / ::rN span cells — closed with ::
	for (const span of [2, 3, 4, 5]) {
		md.use(container, `c${span}`, {
			render(tokens: any[], idx: number) {
				return tokens[idx].nesting === 1
					? `<div class="grid grid-rows-subgrid md:col-span-${span} col-span-1 m-0! gap-x-4">\n`
					: '</div>\n';
			}
		});
		md.use(container, `r${span}`, {
			render(tokens: any[], idx: number) {
				return tokens[idx].nesting === 1
					? `<div class="grid grid-rows-subgrid md:row-span-${span} row-span-1 m-0! gap-x-4">\n`
					: '</div>\n';
			}
		});
	}

	// Spoiler: ||hidden text||
	md.core.ruler.push('spoiler', (state) => {
		for (const token of state.tokens) {
			if (token.type !== 'inline' || !token.children) continue;
			const children = [];
			for (const t of token.children) {
				if (t.type !== 'text' || !t.content.includes('||')) {
					children.push(t);
					continue;
				}
				const parts = t.content.split(/\|\|(.+?)\|\|/g);
				for (let i = 0; i < parts.length; i++) {
					if (i % 2 === 0) {
						if (parts[i]) {
							const txt = new state.Token('text', '', 0);
							txt.content = parts[i];
							children.push(txt);
						}
					} else {
						const open = new state.Token('html_inline', '', 0);
						open.content = '<span class="opacity-0 hover:opacity-100 transform transition-opacity duration-1000 ease-in-out hover:duration-200">';
						children.push(open);
						const txt = new state.Token('text', '', 0);
						txt.content = parts[i];
						children.push(txt);
						const close = new state.Token('html_inline', '', 0);
						close.content = '</span>';
						children.push(close);
					}
				}
			}
			token.children = children;
		}
	});

	// Embeds: @[Title](url){class}
	md.core.ruler.push('embed', (state) => {
		for (const token of state.tokens) {
			if (token.type !== 'inline' || !token.children) continue;
			const out = [];
			for (const t of token.children) {
				if (t.type !== 'text') { out.push(t); continue; }
				const match = t.content.match(/^@\[(.+?)\]\((.+?)\)\{(.*?)\}$/);
				if (!match) { out.push(t); continue; }
				const [, title, src, cls] = match;
				const html = new state.Token('html_inline', '', 0);
				html.content = `<${iframe.replace('$1', cls)} src="${src}" title="${title}"></iframe>`;
				out.push(html);
			}
			token.children = out;
		}
	});

	// Custom image renderer: handles !c2, !r3 span prefixes
	md.renderer.rules.image = (tokens, idx) => {
		const token = tokens[idx];
		const rawSrc = token.attrGet('src') ?? '';
		const alt = token.content ?? '';

		// Rewrite +images/ paths to the correct base
		const src = rawSrc.startsWith('+images/')
			? imageBase + rawSrc.slice('+images/'.length)
			: rawSrc + economy('.webp', '');

		// Check for span prefix in alt: "c2:Caption" or "r3:Caption"
		const spanMatch = alt.match(/^([cr])(\d):(.*)$/);
		let caption = alt;

		if (spanMatch) {
			caption = spanMatch[3];
		}

		const figOpen = figure(spanMatch ? (spanMatch[1] as 'col' | 'row') : undefined)
			.replace('$1', spanMatch?.[2] ?? '1');
		const imgTag = `<${img} src="${src}" alt="${caption}" />`;

		return caption
			? `<${figOpen}>${imgTag}<${figcaption}>${caption}</figcaption></figure>`
			: `<${figOpen}>${imgTag}</figure>`;
	};

	return {
		makeHtml: (content: string) => md.render(content)
	};
}
