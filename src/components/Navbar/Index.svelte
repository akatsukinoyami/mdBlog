<script lang="ts">
  import {
    Header,
    HeaderUtilities,
    SkipToContent,
  } from "carbon-components-svelte";

  import { i18n } from "../../stores";
  import Links from "./Links.svelte";
  import Settings from "./Settings.svelte";
  
  let isSideNavOpen = false;
</script>

<Header company={ $i18n.mainTitle } href="/" bind:isSideNavOpen>
  <svelte:fragment slot="skip-to-content">
    <SkipToContent />
  </svelte:fragment>

  <HeaderUtilities> 
    <Links />
    <Settings/>
  </HeaderUtilities>
</Header>
