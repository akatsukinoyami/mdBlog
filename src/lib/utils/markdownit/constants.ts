export const flex = 'flex items-center';

export const hoverShadows =
	'hover:drop-shadow-xl/50 hover:drop-shadow-amber-900 dark:hover:drop-shadow-gray-50';

export const grid = 'grid md:grid-cols-$1 grid-cols-1';

export const textStroke = `
  text-shadow-[-1px_-1px_1px_var(--color-amber-50),-1px_1px_1px_var(--color-amber-50),1px_-1px_1px_var(--color-amber-50),1px_1px_1px_var(--color-amber-50)]
  dark:text-shadow-[-1px_-1px_1px_var(--color-gray-950),-1px_1px_1px_var(--color-gray-950),1px_-1px_1px_var(--color-gray-950),1px_1px_1px_var(--color-gray-950)]
`;

export const spanSize = (q?: 'col' | 'row') => (q ? `md:${q}-span-$1 ${q}-span-1` : '');
export const figure = (q?: 'col' | 'row') =>
	`figure class="flex flex-col relative items-center gap-2 my-2 max-h-140 group ${spanSize(q)}"`;

export const iframe = 'iframe class="w-full rounded-lg shadow-2xl my-2 $1"';

export const img = `img class="rounded-lg w-full h-full max-h-140 object-cover" loading="lazy" decoding="async"`;

export const figcaption = `figcaption class="opacity-40 group-hover:opacity-100
  w-full text-justify-or-center absolute bottom-0 text-sm pt-10 pb-2 px-4
  backdrop-blur-xs gradient-mask
  bg-linear-to-b rounded-b-md 
  from-0% from-white/0 dark:from-gray-950/0 
  via-40% via-white/40 dark:via-gray-950/40 
  to-100% to-white/90  dark:to-gray-950/90
"`;
