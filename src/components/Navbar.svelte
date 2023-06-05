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

<Header company={ t.mainTitle } bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>
  <HeaderUtilities>
    <OverflowMenu size="xl" flipped>

      <OverflowMenuItem text={ t.theme.singular } disabled hasDivider />
      {#each $themes as themeCode}
        <OverflowMenuItem on:click={ () => theme.set(themeCode) }>
          { t.theme[themeCode] }
        </OverflowMenuItem>
      {/each}

      <OverflowMenuItem text={ t.lang.singular } disabled hasDivider />
      {#each $langs as langCode}
        <OverflowMenuItem on:click={ () => lang.set(langCode) }>
          { t.lang[langCode] }
        </OverflowMenuItem>
      {/each}
    </OverflowMenu>
    
    <HeaderAction bind:isOpen={ isOpenPages } text={ t.links } icon={ Link }>
      <HeaderPanelLinks>
        <HeaderPanelDivider>{ t.pages }</HeaderPanelDivider>
        {#each linksJson.md as page}
          <HeaderPanelLink href="/page/{page}">
            <span class="text-capitalize">{ page.replaceAll('_', ' ') }</span>
          </HeaderPanelLink>
        {/each}

        <HeaderPanelDivider>{ t.myResources }</HeaderPanelDivider>
        {#each linksJson.my as { link, title }}
          <HeaderPanelLink href={ link }>{ title }</HeaderPanelLink>
        {/each}

        <HeaderPanelDivider>{ t.external }</HeaderPanelDivider>
        {#each linksJson.external as { link, title }}
          <HeaderPanelLink href={ link }>{ title }</HeaderPanelLink>
        {/each}
        
      </HeaderPanelLinks>
    </HeaderAction>
  </HeaderUtilities>
</Header>
