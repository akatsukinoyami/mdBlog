import { figcaption, figure, grid, iframe, img } from "./constants";
import type { ShowdownExtension } from "./types";

export const showdownExtensions: ShowdownExtension[] = (
  [
    [/%%%(\d)([\s\S]*?)%%%/g, `<div class="${grid} gap-x-4 my-5">$2</div>`],
    [
      /%&(\d)(\d)([\s\S]*?)&%/g,
      `<div class="${grid} grid-rows-subgrid md:col-span-$2 col-span-1 m-0! gap-x-4">$3</div>`,
    ],
    [
      /@\{?(.*?)\}?\[(.*?)\]\((.+?)\)/g,
      `<${iframe} src="$3" title="$2"></iframe>`,
    ],
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
    [
      /––(.+?)––/g, 
      '<span class="opacity-0 hover:opacity-100 transform transition-opacity duration-1000 ease-in-out hover:duration-200">$1</span>'
    ],
  ] as [RegExp, string][]
).map(([regex, replace]) => ({ type: "lang", regex, replace }));


