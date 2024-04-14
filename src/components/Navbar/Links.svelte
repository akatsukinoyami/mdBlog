<script lang="ts">
  import { Close, Link } from "carbon-icons-svelte";
  import { HeaderAction, HeaderPanelDivider, HeaderPanelLink, HeaderPanelLinks } from "carbon-components-svelte";
  import { i18n } from "../../stores";

  let isOpen = false;
</script>

<HeaderAction 
  bind:isOpen={ isOpen } 
  icon={ Link }
  closeIcon={ Close }
>
  <HeaderPanelLinks>
    <HeaderPanelDivider>{$i18n.project.plural}</HeaderPanelDivider>
    <HeaderPanelLink href="https://map.katsu.moe" target="_blank">{$i18n.project.map}</HeaderPanelLink>


    <HeaderPanelDivider>{$i18n.project.telegram}</HeaderPanelDivider>
    <HeaderPanelLink href="https://t.me/katsu_diary" target="_blank">{$i18n.project.nikki}</HeaderPanelLink>
    <HeaderPanelLink href="https://t.me/katsu_travel" target="_blank">{$i18n.project.travel}</HeaderPanelLink>

    <HeaderPanelDivider>{$i18n.game.plural}</HeaderPanelDivider>
    <HeaderPanelLink href="/game/tictactoe">{$i18n.game.tictactoe}</HeaderPanelLink>
  </HeaderPanelLinks>
</HeaderAction>
