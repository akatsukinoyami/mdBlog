<script lang="ts">
  import {
    Header,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    SkipToContent,
  } from "carbon-components-svelte";

  import { SettingsAdjust, Link } from "carbon-icons-svelte";
  import linksJson from "../../jsons/links.json";
  import i18n from "../../i18n";
  import { imgMode, imgModes, lang, langs, theme, themes } from "../../stores";
    import NavbarSetting from "./NavbarSetting.svelte";
  
  let isSideNavOpen = false;
  let isOpenPages = false;
  let isOpenSettings = false;

  $: t = i18n($lang);
</script>

<Header company={ t.mainTitle } href="/" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities> 
    <HeaderAction bind:isOpen={ isOpenPages } text={ t.links } icon={ Link }>
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

    <HeaderAction bind:isOpen={ isOpenSettings } icon={ SettingsAdjust }>
      <HeaderPanelLinks>
        <NavbarSetting 
          translation={t.theme}
          collection={$themes}
          current={$theme}
          onclick={(themeCode) => theme.set(themeCode)}
        />

        <NavbarSetting 
          translation={t.lang}
          collection={$langs}
          current={$lang}
          onclick={(langCode) => lang.set(langCode)}
        />
        
        <NavbarSetting 
          translation={t.imgMode}
          collection={$imgModes}
          current={$imgMode}
          onclick={(imgModeCode) => imgMode.set(imgModeCode)}
        />
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
