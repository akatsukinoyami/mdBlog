<script lang="ts">
  import { Close, SettingsAdjust } from "carbon-icons-svelte";
  import { HeaderAction, HeaderPanelLinks } from "carbon-components-svelte";

  import { i18n, imgMode, imgModes, lang, langs, theme, themes } from "../../stores";
  import NavbarSetting from "./Setting.svelte";

  let isOpen = false;
</script>

<HeaderAction 
  bind:isOpen={ isOpen } 
  icon={ SettingsAdjust }
  closeIcon={ Close }
>
  <HeaderPanelLinks>
    <NavbarSetting  translation={$i18n.theme}   collection={$themes}   current={$theme}   onclick={(themeCode  ) => theme.set(themeCode)} />
    <NavbarSetting  translation={$i18n.lang}    collection={$langs}    current={$lang}    onclick={(langCode   ) => lang.set(langCode)} />
    <NavbarSetting  translation={$i18n.imgMode} collection={$imgModes} current={$imgMode} onclick={(imgModeCode) => imgMode.set(imgModeCode)} />
  </HeaderPanelLinks>
</HeaderAction>
