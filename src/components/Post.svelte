<script lang="ts">    
	import { Html, isTag } from "html-svelte-parser";
  import { 
    CodeSnippet,
    InlineNotification,
    StructuredList, 
    StructuredListHead, 
    StructuredListBody, 
    StructuredListRow, 
    StructuredListCell
  } from "carbon-components-svelte";
  import { lang } from "../stores";
  import parseMarkdown from "../utils/markdown.parser";
  import Image from "./Image.svelte";
  
  import type { Entity } from "../types";

  export let 
    post: Entity, 
    path: string;
  
  $: html = parseMarkdown(post.text[$lang]);

  function fixImage(src: string): string {
    return `${path}/${src}`.replace("index/", "");
  }

  function processNode(node: any) {
    if (!isTag(node)) return;
    
    const { alt, src, style } = node.attribs;
    const props = { "class": node.attribs.class + " mb-1", style };

    const components: Record<string, any> = {
      code:   { component: CodeSnippet, props: { ...props, type: "multi", wrapText: true } },
      img:    { component: Image,       props: { ...props, src: fixImage(src), alt } },
      thead:  { component: StructuredListHead, props: { style: node.attribs.style }},
      tbody:  { component: StructuredListBody, props: { style: node.attribs.style }},
      tr:     { component: StructuredListRow,  props: { style: node.attribs.style }},
      th:     { component: StructuredListCell, props: { style: node.attribs.style, head: true } },
      td:     { component: StructuredListCell, props: { style: node.attribs.style } },
      table:  { component: StructuredList,     props: { style: node.attribs.style }},
      blockquote: { 
        component: InlineNotification, 
        props: {
          style: node.attribs.style, 
          kind: "info", 
          lowContrast: true,
          hideCloseButton: true
      }},
    }
    return components[node.name];
  }
</script>

<div>
  <Html html={html} processNode={processNode} />
</div>

<style lang="sass">
  div
    padding: 0 0 20px 0
</style>