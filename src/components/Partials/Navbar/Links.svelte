<script lang="ts">
  import { HeaderAction, HeaderPanelDivider, HeaderPanelLink, HeaderPanelLinks } from "carbon-components-svelte";
  import { Close, Link } from "carbon-icons-svelte";

  import linksJson from "../../../jsons/links.json";
  import i18n from "../../../i18n";
  import { lang } from "../../../stores/index";

  let isOpen = false;

  $: t = i18n($lang);

</script>

<HeaderAction 
  bind:isOpen={ isOpen } 
  icon={ Link }
  closeIcon={ Close }
>
  <HeaderPanelLinks>
    <HeaderPanelDivider>{ t.myResources }</HeaderPanelDivider>
    {#each linksJson.my as { link, title }}
      <HeaderPanelLink href={ link } target="_blank">{ title }</HeaderPanelLink>
    {/each}

    <HeaderPanelDivider>{ t.external }</HeaderPanelDivider>
    {#each linksJson.external as { link, title }}
      <HeaderPanelLink href={ link } target="_blank">{ title }</HeaderPanelLink>
    {/each}
  </HeaderPanelLinks>
</HeaderAction>
