import type MarkdownIt from 'markdown-it';

export function spoilerPlugin(md: MarkdownIt): void {
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
						open.content =
							'<span class="opacity-0 hover:opacity-100 transform transition-opacity duration-1000 ease-in-out hover:duration-200">';
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
}
