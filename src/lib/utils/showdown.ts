import showdown from 'showdown';
import { figcaption, figure, grid, iframe, img } from '../constants';
import { url } from './url';

export function getConverter(path: string, economyMode: boolean) {
	const economy = (yes: string, no: string) => (economyMode ? yes : no);

	return new showdown.Converter({
		tables: true,
		ghCodeBlocks: true,
		simpleLineBreaks: true,
		strikethrough: true,
		extensions: [
			{
				type: 'lang',
				regex: /%%%(\d)([\s\S]*?)%%%/g,
				replace: `<div class="${grid} gap-x-4 my-5">$2</div>`
			},
			{
				type: 'lang',
				regex: /%&(\d)(\d)([\s\S]*?)&%/g,
				replace: `<div class="${grid} grid-rows-subgrid md:col-span-$2 col-span-1 m-0! gap-x-4">$3</div>`
			},
			{
				type: 'lang',
				regex: /@\{?(.*?)\}?\[(.*?)\]\((.+?)\)/g,
				replace: `<${iframe} src="$3" title="$2"></iframe>`
			},
			{
				type: 'lang',
				regex: /!\[\]\((.+?)\)/g,
				replace: `<${figure()}><${img} src="$1${economy('.webp', '')}" alt="$1" /></figure>`
			},
			{
				type: 'lang',
				regex: /!r(\d)\[\]\((.+?)\)/g,
				replace: `<${figure('row')}><${img} src="$2${economy('.webp', '')}" alt="$2" /></figure>`
			},
			{
				type: 'lang',
				regex: /!c(\d)\[\]\((.+?)\)/g,
				replace: `<${figure('col')}><${img} src="$2${economy('.webp', '')}" alt="$2" /></figure>`
			},
			{
				type: 'lang',
				regex: /!\[(.+?)\]\((.+?)\)/g,
				replace: `<${figure()}><${img} src="$2${economy('.webp', '')}" alt="$1" /><${figcaption}>$1</figcaption></figure>`
			},
			{
				type: 'lang',
				regex: /!r(\d)\[(.+?)\]\((.+?)\)/g,
				replace: `<${figure('row')}><${img} src="$3${economy('.webp', '')}" alt="$2" /><${figcaption}>$2</figcaption></figure>`
			},
			{
				type: 'lang',
				regex: /!c(\d)\[(.+?)\]\((.+?)\)/g,
				replace: `<${figure('col')}><${img} src="$3${economy('.webp', '')}" alt="$2" /><${figcaption}>$2</figcaption></figure>`
			},
			{
				type: 'lang',
				regex: /––(.+?)––/g,
				replace:
					'<span class="opacity-0 hover:opacity-100 transform transition-opacity duration-1000 ease-in-out hover:duration-200">$1</span>'
			},
			{
				type: 'output',
				regex: /\+images\//g,
				replace: url(['files', path, economy(`+imagesCompressed/`, `+images/`)])
			}
		]
	});
}
