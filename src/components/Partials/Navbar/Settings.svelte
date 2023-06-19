<script lang="ts">
  import { Close, SettingsAdjust } from "carbon-icons-svelte";
  import { HeaderAction, HeaderPanelLinks } from "carbon-components-svelte";

  import NavbarSetting from "./Setting.svelte";
  import i18n from "../../../i18n";
  import { imgMode, imgModes, lang, langs, theme, themes } from "../../../stores/index";

  let isOpen = false;
  $: t = i18n($lang);
</script>

<HeaderAction 
  bind:isOpen={ isOpen } 
  icon={ SettingsAdjust }
  closeIcon={ Close }
>
  <HeaderPanelLinks>
    <NavbarSetting  translation={t.theme}   collection={$themes}   current={$theme}   onclick={(themeCode  ) => theme.set(themeCode)} />
    <NavbarSetting  translation={t.lang}    collection={$langs}    current={$lang}    onclick={(langCode   ) => lang.set(langCode)} />
    <NavbarSetting  translation={t.imgMode} collection={$imgModes} current={$imgMode} onclick={(imgModeCode) => imgMode.set(imgModeCode)} />
  </HeaderPanelLinks>
</HeaderAction>
