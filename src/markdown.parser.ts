import showdown from "showdown";
import type ShowdownExtensionType from "./interfaces/showdown.extension.interface";

export default function parseMarkdown(link: string, markdown: string): string {
    return getParser(link).makeHtml(markdown);
}

function getParser(link: string): showdown.Converter {
  return new showdown.Converter({
    flavor: "github",
    ghCodeBlocks:  true,
    ghCompatibleHeaderId:  true,
    omitExtraWLInCodeBlocks:  true,
    parseImgDimensions:  true,
    simpleLineBreaks:  true,
    strikethrough:  true,
    tables:  true,
    tasklists:  true,
    extensions: [
      replaceReturnWithBr(),
      outputBindings(),
      imageUrlExtension(filterLinkParent(link))
    ]});
}

function filterLinkParent(link: string): string{
  const pathSplitted = link.split("/");
  pathSplitted.pop();
  return pathSplitted.join("/");
};

function replaceReturnWithBr(): ShowdownExtensionType{
  return {
    type: "lang",
    regex: /\\n/g,
    replace: `<br>`
  };
}


function imageUrlExtension(path: string): ShowdownExtensionType{
  return {
    type: "output",
    regex: /<img(.*?)src="(.*?)"(.*?)alt="(.*?)"(.*?)>/g,
    replace: `
      <figure class="figure w-100">
        <img $1 src="${path}/$2" $3 alt="$4" $5 style="object-fit: contain;" id="$2" onclick="enlargeImage('$2')" />
        <figcaption class="figure-caption modal_caption text-center mx-auto pt-2" style="max-width: 960px"> $4 </figcaption>
      </figure>
    `
  };
}

function outputBindings(): ShowdownExtensionType[]{
  const classMap = {
    h1: "pt-3",
    h2: "pt-3",
    h3: "pt-3",
    h4: "pt-2 fs-5",
    h5: "pt-2 fs-6",
    p: "px-2",
    table: "table",
    img: "rounded img-fluid modal-image",
    pre: "bg-secondary bg-opacity-10 rounded p-3",
    blockquote: "blockquote border-2 border-start border-success rounded p-2",
  };
  const classes = Object.keys(classMap);

  return classes.map((className: string) => {
    return {
      type: "output",
      regex: new RegExp(`<${className}(.*?)>`, 'g'),
      replace: `<${className} class="${classMap[className]}" $1>`
    }
  })
}
