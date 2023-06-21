<script lang="ts">
  import { Grid, Row, Column, CodeSnippet } from "carbon-components-svelte";
	import { Html, isTag, Text } from "html-svelte-parser";
  import Image from "./Image.svelte";

  export let html: string, link: string;

  function fixImage(src: string): string {
    return `${link}/${src}`.replace("index/", "");
  }

  function processNode(node: any) {
    if (!isTag(node)) return;
    
    const { alt, src, style } = node.attribs;
    const props = { "class": node.attribs.class + "mb-1", style };

    const components = {
      img:    { component: Image,       props: { ...props, src: fixImage(src), alt } },
      pre:    { component: CodeSnippet, props: { ...props, type: "multi", wrapText: true } },
      table:  { component: Grid,   props: { style: node.attribs.style, fullWidth: true }},
      tr:     { component: Row,    props: { style: node.attribs.style }},
      th:     { component: Column, props: { style: node.attribs.style } },
      td:     { component: Column, props: { style: node.attribs.style } },
    }
    return components[node.name];
  }
</script>

<Html html={html} processNode={processNode} />
