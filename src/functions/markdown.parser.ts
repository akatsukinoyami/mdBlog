import showdown from "showdown";

const classMap = {
  figcaption: 'mt-1',
  p: 'mb-1',
  h1: 'mb-1',
  h2: 'mb-1',
  h3: 'mb-1',
  h4: 'mb-1',
  h5: 'mb-1',
  h6: 'mb-1',
}

const bindings = Object
  .keys(classMap)
  .map(key => ({
    type: 'output',
    regex: new RegExp(`<${key}(.*)>`, 'g'),
    replace: `<${key} class="${classMap[key]}" $1>`
  }));

const a = {
  type: 'output',
  regex: /<a(.*?)>(.*?)<\/a>/g,
  replace: '<a $1 class="body_link" target="_blank">$2</a>'
}

const parser = new showdown.Converter({
  excludeTrailingPunctuationFromURLs: true,
  flavor: "github",
  ghCodeBlocks: true,
  ghCompatibleHeaderId: true,
  omitExtraWLInCodeBlocks: true,
  parseImgDimensions: true,
  simpleLineBreaks: true,
  smartIndentationFix: true,
  strikethrough: true,
  tables: true,
  tablesHeaderId: true,
  tasklists: true,
  extensions: [...bindings, a]
});

export default function parseMarkdown(markdown: string): string {
  return parser.makeHtml(markdown);
}
