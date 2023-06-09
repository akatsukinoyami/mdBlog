<script lang="ts">
  import {
    Header,
    HeaderAction,
    HeaderPanelDivider,
    HeaderPanelLink,
    HeaderPanelLinks,
    HeaderUtilities,
    OverflowMenu,
    OverflowMenuItem,
    SkipToContent,
  } from "carbon-components-svelte";

  import SettingsAdjust from "carbon-icons-svelte/lib/SettingsAdjust.svelte";
  import Link from "carbon-icons-svelte/lib/Link.svelte";

  import linksJson from '../jsons/links.json';
  import { i18n } from "../functions";
  import { lang, langs, theme, themes } from "../stores";
  
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

        <HeaderPanelDivider>{ t.theme.singular }</HeaderPanelDivider>
        {#each $themes as themeCode}
          <HeaderPanelLink on:click={ () => theme.set(themeCode) }>
            { t.theme[themeCode] }
          </HeaderPanelLink>
        {/each}

        <HeaderPanelDivider>{ t.lang.singular }</HeaderPanelDivider>
        {#each $langs as langCode}
          <HeaderPanelLink on:click={ () => lang.set(langCode) }>
            { t.lang[langCode] }
          </HeaderPanelLink>
        {/each}
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
