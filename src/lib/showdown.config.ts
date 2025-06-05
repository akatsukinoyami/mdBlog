import type { Lang, ShowdownExtension, Theme } from "./types";

const 
  figure = (q?: "col" | "row") =>
    `figure class="${q}-span-$1 flex flex-col relative items-center gap-2 my-2 max-h-120 group"`,
  iframe = 'iframe class="w-full h-200 rounded-lg shadow-2xl"',
  img =
    'img class="rounded-lg w-full h-full object-cover" loading="lazy" decoding="async"',
  figcaption = `figcaption class="opacity-40 group-hover:opacity-100
		w-full text-justify-or-center absolute bottom-0 text-sm pt-10 pb-2 px-4
		backdrop-blur-xs gradient-mask
		bg-linear-to-b rounded-b-md 
		from-0% from-white/0 dark:from-gray-950/0 
		via-40% via-white/40 dark:via-gray-950/40 
		to-100% to-white/90  dark:to-gray-950/90
	"`;

export const showdownExtensions: ShowdownExtension[] = (
  [
    [
      /%%%(\d)([\s\S]*?)%%%/g,
      `<div class="grid grid-cols-$1 gap-x-4 my-5">$2</div>`,
    ],
    [
      /%&(\d)(\d)([\s\S]*?)&%/g,
      `<div class="grid grid-cols-$1 grid-rows-subgrid col-span-$2 m-0! gap-x-4">$3</div>`,
    ],
    [/@\[(.+?)\]\((.+?)\)/g, `<${iframe} src="$2" title="$1"></iframe>`],
    [/!\[\]\((.+?)\)/g, `<${figure()}><${img} src="$1" alt="$1" /></figure>`],
    [
      /!r(\d)\[\]\((.+?)\)/g,
      `<${figure("row")}><${img} src="$2" alt="$2" /></figure>`,
    ],
    [
      /!c(\d)\[\]\((.+?)\)/g,
      `<${figure("col")}><${img} src="$2" alt="$2" /></figure>`,
    ],
    [
      /!\[(.+?)\]\((.+?)\)/g,
      `<${figure()}><${img} src="$2" alt="$1" /><${figcaption}>$1</figcaption></figure>`,
    ],
    [
      /!r(\d)\[(.+?)\]\((.+?)\)/g,
      `<${figure("row")}><${img} src="$3" alt="$2" /><${figcaption}>$2</figcaption></figure>`,
    ],
    [
      /!c(\d)\[(.+?)\]\((.+?)\)/g,
      `<${figure("col")}><${img} src="$3" alt="$2" /><${figcaption}>$2</figcaption></figure>`,
    ],
  ] as [RegExp, string][]
).map(([regex, replace]) => ({ type: "lang", regex, replace }));
