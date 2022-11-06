import showdown from 'showdown';
import type ShowdownExtensionType from './types/showdown.extension.type';

export default function parseMarkdown(link: string, markdown: string): string {
    return getParser(link).makeHtml(markdown);
}

function getParser(link: string): showdown.Converter {
  return new showdown.Converter({
    flavor: 'github',
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
      classBindings(),
      imageUrlExtension(filterLinkParent(link))
    ]});
}
function filterLinkParent(link: string): string{
  const pathSplitted = link.split('/');
  pathSplitted.pop();
  return pathSplitted.join('/');
};

function replaceReturnWithBr(): ShowdownExtensionType{
  return {
    type: 'lang',
    regex: /\\n/g,
    replace: `<br>`
  };
}

function imageUrlExtension(path: string): ShowdownExtensionType{
  return {
    type: 'output',
    regex: /<img(.*?)src="(.*?)"(.*?)alt="(.*?)"(.*?)>/g,
    replace: `<figure class="figure w-100" id="$2">
                <a class="button_modal" href="#$2_modal">
                  <img $1 src="${path}/$2" $3 alt="$4" $5 style="object-fit: contain;" />
                </a>
                <figcaption class="figure-caption text-center" style="font-family: 'Ubuntu', Helvetica, Verdana, sans-serif;"> $4 </figcaption>
              </figure>
              <div id="$2_modal" class="overlay light">
                <div class="popup d-inline-block">
                  <a class="close" href="#" onclick="document.getElementById('$2').scrollIntoView()">&times;</a>
                  <img $1 src="${path}/$2" $3 alt="$4" $5 style="object-fit: contain; height: 100%" />
                </div>
              </div>
`
  };
}

function classBindings(): ShowdownExtensionType[]{
  const classMap = Object.entries({
    pre: "bg-secondary bg-opacity-10 rounded p-3",
    blockquote: "blockquote border-2 border-start border-success rounded p-2",
    img: "rounded img-fluid",
    h1: 'pt-3', h2: 'pt-3',
    h3: 'pt-3', h4: 'pt-2 fs-5',
    h5: 'pt-2 fs-6',
    table: 'table',
  })
  const extensions = classMap.map((tag) => {
    return {
      type: 'output',
      regex: new RegExp(`<${tag[0]}(.*)>`, 'g'),
      replace: `<${tag[0]} class="${tag[1]}" $1>`
    }
  })
  return extensions;
}
