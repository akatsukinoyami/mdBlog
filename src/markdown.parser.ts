import showdown from "showdown";
import type ShowdownExtensionType from "./interfaces/showdown.extension.interface";

const parser = new showdown.Converter({
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
  ]});

export default function parseMarkdown(markdown: string): string {
  return parser.makeHtml(markdown);
}

function replaceReturnWithBr(): ShowdownExtensionType{
  return {
    type: "lang",
    regex: /\\n/g,
    replace: `<br>`
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
