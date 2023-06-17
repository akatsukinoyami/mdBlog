<script lang="ts">
  import { HeaderPanelDivider, HeaderPanelLink } from "carbon-components-svelte";

  export let
    translation: Record<string, any>,
    collection: any[],
    current: string,
    onclick: (element: any) => void;
  
  const prop = {
    style: "display: flex; justify-content: space-between;",
  }
</script>

<HeaderPanelDivider>{ translation.singular }</HeaderPanelDivider>
{#each collection as element}
  <HeaderPanelLink on:click={ () => onclick(element) } {...prop}>
    <span>{ translation[element] }</span>
    <span>{#if element === current}⏺{/if}</span>
  </HeaderPanelLink>
{/each}
