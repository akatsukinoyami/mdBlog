<script lang="ts">
	import { Router, links } from "svelte-navigator";
  import { LocalStorage } from 'carbon-components-svelte';

  import Routes from './Routes.svelte';
  import Navbar from './components/Partials/Navbar.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import ImageModal from "./components/Partials/ImageModal.svelte";
  import { theme, lang, imgMode } from "./stores";

  $: document.documentElement.setAttribute("theme", $theme);
</script>

<div use:links>
  <Router primary={false}>
    <Navbar/>
    <Routes />
  </Router>
  
  <ImageModal/>
  <BackToTop/>
  <LocalStorage key="lang" bind:value={$lang} />
  <LocalStorage key="theme" bind:value={$theme} />
  <LocalStorage key="imgMode" bind:value={$imgMode} />
</div>

<style lang="sass">
  @use "styles/app"
</style>
