<script lang="ts">
  import { StructuredList, StructuredListBody, StructuredListCell, StructuredListHead, StructuredListRow } from "carbon-components-svelte";
	import { Html, isTag } from 'html-svelte-parser';
  
  import Image from "./Image.svelte";

  export let 
    link: string,
    html: string;

  function fixImage(src: string): string {
    return `${link}/${src}`.replace('index/', '');
  }
</script>

<Html html={ html } processNode={ (node) => {
  if (!isTag(node)) return;
  switch(node.name){
    case 'img':   return { component: Image, props: { src: fixImage(node.attribs.src), alt: node.attribs.alt } };
    case 'table': return { component: StructuredList, props: { style: "max-width: var(--content-width) !important;"}};
    case 'thead': return { component: StructuredListHead };
    case 'tbody': return { component: StructuredListBody };
    case 'tr':    return { component: StructuredListRow };
    case 'th':    return { component: StructuredListCell, props: { head: true }};
    case 'td':    return { component: StructuredListCell };
    case 'a' :    node.attribs.target = "_blank";
  }
}} />
