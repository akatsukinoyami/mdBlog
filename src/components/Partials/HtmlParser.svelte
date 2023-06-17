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
	import { Html, isTag } from "html-svelte-parser";
  import Image from "./Image.svelte";

  export let html: string, link: string;

  function fixImage(src: string): string {
    return `${link}/${src}`.replace("index/", "");
  }

  function processNode(node: any) {
      if (!isTag(node)) return;
      if (node.name !== "a"){
      const { style } = node.attribs;
      const margin = "margin-bottom: 10px; ";
      node.attribs.style = style ? style + margin : margin;
      }
      switch(node.name){
      case "img":   return { 
          component: Image, 
          props: { 
          src: fixImage(node.attribs.src), 
          alt: node.attribs.alt, 
          style: node.attribs.style,
      }};
      case "pre":   return { component: CodeSnippet, props: { type: "multi", wrapText: true, style: `${node.attribs.style}background-color: var(--cds-field-01); ` }};
      //case "thead": return (new Text("i stay!"));
      //case "tbody": return (new Text("i stay!"));
      case "ol":    return { component: OrderedList };
      case "ul":    return { component: UnorderedList };
      case "li":    return { component: ListItem };
      case "table": return { component: Grid, props: { style: node.attribs.style, fullWidth: true }};
      case "tr":    return { component: Row, props: { style: node.attribs.style }};
      case "th": 
      case "td":    
          return { component: Column, props: { style: node.attribs.style } };
      case "a" :    node.attribs.target = "_blank";
    }
  }
</script>

<Html html={html} processNode={processNode} />
