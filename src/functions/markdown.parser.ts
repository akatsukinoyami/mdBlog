import showdown from "showdown";

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
  tasklists: true
});

export default function parseMarkdown(markdown: string): string {
  return parser.makeHtml(markdown);
}
