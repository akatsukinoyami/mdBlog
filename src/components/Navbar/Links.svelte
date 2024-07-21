<script lang="ts">
  import { HeaderAction, HeaderPanelDivider, HeaderPanelLink, HeaderPanelLinks } from "carbon-components-svelte";
  import { Close, Link } from "carbon-icons-svelte";
  import navbarLinks from "../../constants/navbarLinks.json";
  import { i18n } from "../../stores";
  import type { SvelteComponent } from "svelte";

  let isOpen = false;

  let icon = Link as typeof SvelteComponent;
  let closeIcon = Close as typeof SvelteComponent;
</script>

<HeaderAction 
  bind:isOpen={ isOpen } 
  {icon}
  {closeIcon}
>
  <HeaderPanelLinks>
    <HeaderPanelDivider>{$i18n.project.plural}</HeaderPanelDivider>
    <HeaderPanelLink href="https://map.katsu.moe" target="_blank">{$i18n.project.map}</HeaderPanelLink>


    <HeaderPanelDivider>{$i18n.project.telegram}</HeaderPanelDivider>
    <HeaderPanelLink href="https://t.me/katsu_diary" target="_blank">{$i18n.project.nikki}</HeaderPanelLink>
    <HeaderPanelLink href="https://t.me/katsu_travel" target="_blank">{$i18n.project.travel}</HeaderPanelLink>

    {#each Object.entries(navbarLinks) as [type, anchors]}
      <HeaderPanelDivider>{$i18n[type].plural}</HeaderPanelDivider>
      {#each anchors as link}
        <HeaderPanelLink href="/{type}/{link}">{$i18n[type][link]}</HeaderPanelLink>
      {/each}
    {/each}
  </HeaderPanelLinks>
</HeaderAction>
