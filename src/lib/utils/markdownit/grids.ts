export function processGrids(src: string): string {
	const lines = src.split('\n');
	const result: string[] = [];
	const stack: string[] = [];

	for (const line of lines) {
		const open = line.match(/^:::([\w]+)\s*$/);
		const close = /^:::\s*$/.test(line);

		if (open) {
			const name = open[1];
			let cls = '';
			if (/^\d+$/.test(name)) {
				cls = `grid md:grid-cols-${name} grid-cols-1 gap-x-4 my-5`;
			} else if (/^c(\d+)$/.test(name)) {
				cls = `grid grid-rows-subgrid md:col-span-${name.slice(1)} col-span-1 m-0! gap-x-4`;
			} else if (/^r(\d+)$/.test(name)) {
				cls = `grid grid-rows-subgrid md:row-span-${name.slice(1)} row-span-1 m-0! gap-x-4`;
			}
			result.push(`<div class="${cls}">`);
			stack.push(name);
		} else if (close && stack.length > 0) {
			result.push('</div>');
			stack.pop();
		} else {
			result.push(line);
		}
	}

	while (stack.length > 0) {
		result.push('</div>');
		stack.pop();
	}

	return result.join('\n');
}
