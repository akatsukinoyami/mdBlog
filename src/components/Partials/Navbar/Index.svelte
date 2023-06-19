<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    SkipToContent,
  } from "carbon-components-svelte";

  import Auth from "./Auth.svelte";
  import Links from "./Links.svelte";
  import Settings from "./Settings.svelte";
  import i18n from "../../../i18n";
  import { lang } from "../../../stores/index";
  
  let isSideNavOpen = false;

  $: t = i18n($lang);
</script>

<Header company={ t.mainTitle } href="/" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>

  <HeaderUtilities> 
    <Links/>
    <Settings/>
    <Auth/>
  </HeaderUtilities>
</Header>
