<script lang="ts">
	import { Router, links } from "svelte-navigator";
  import { LocalStorage } from 'carbon-components-svelte';

  import Navbar from './components/Navbar.svelte';
  import Main from './components/Index.svelte';
  import ImageModal from "./components/Partials/ImageModal.svelte";
  import { theme, lang } from "./stores";

  $: document.documentElement.setAttribute("theme", $theme);
</script>

<div use:links>
  <Router primary={false}>
    <Navbar/>
    <Main />
  </Router>
  
  <ImageModal/>
  <LocalStorage key="lang" bind:value={$lang} />
  <LocalStorage key="theme" bind:value={$theme} />
</div>

<style lang="sass">
  @use "styles/app"
</style>
