<script lang="ts">
  import { 
    CodeSnippet, 
    Column,
    Grid, 
    ListItem, 
    OrderedList, 
    Row, 
    UnorderedList 
  } from "carbon-components-svelte";
	import { Html, isTag } from 'html-svelte-parser';
  import { useParams } from "svelte-navigator";
  
  import Image from "../Partials/Image.svelte";
  import { lang } from "../../stores";
  import sectionsWithoutType from "../../jsons/sections.json";
  import parseMarkdown from "../../markdown.parser";
  import i18n from "../../i18n";
  import { tPost, tTitle, updateTitle } from "../../functions";
  import type { DirectoryTreeFile } from "../../types/directory.tree.file";

  const params = useParams();
  const sections: DirectoryTreeFile[] = sectionsWithoutType;

  export let 
    sectionName = $params.sectionName,
    postName = $params.postName,
    content = "";
  
  const link: string = `/blog/${sectionName}/${postName}`;
  $: {
    const post = sections
      .find(({ name }) => name === sectionName)
      .children
      .find(({ name }) => name === postName);

    tTitle(post, $lang, updateTitle);
    content = parseMarkdown(tPost(post, $lang));
  }

  function fixImage(src: string): string {
    return `${link}/${src}`.replace('index/', '');
  }

  function processNode(node: any) {
    if (!isTag(node)) return;
    if (node.name !== 'a'){
      const { style } = node.attribs;
      const margin = "margin-bottom: 10px; ";
      node.attribs.style = style ? style + margin : margin;
    }
    switch(node.name){
      case 'img':   return { 
        component: Image, 
        props: { 
          src: fixImage(node.attribs.src), 
          alt: node.attribs.alt, 
          style: node.attribs.style,
      }};
      case 'pre':   return { component: CodeSnippet, props: { type: "multi", wrapText: true, style: `${node.attribs.style}background-color: var(--cds-field-01); ` }};
      //case 'thead': return (new Text('i stay!'));
      //case 'tbody': return (new Text('i stay!'));
      case 'ol':    return { component: OrderedList };
      case 'ul':    return { component: UnorderedList };
      case 'li':    return { component: ListItem };
      case 'table': return { component: Grid, props: { style: node.attribs.style, fullWidth: true }};
      case 'tr':    return { component: Row, props: { style: node.attribs.style }};
      case 'th': 
      case 'td':    
        return { component: Column, props: { style: node.attribs.style } };
      case 'a' :    node.attribs.target = "_blank";
  }
}
</script>

<Html html={content} processNode={processNode} />
