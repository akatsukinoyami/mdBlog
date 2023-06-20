<script lang="ts">
	import { Router, links } from "svelte-navigator";
  import { LocalStorage } from 'carbon-components-svelte';

  import Routes from './pages/Index.svelte';
  import Navbar from './partials/Navbar/Index.svelte';
  import BackToTop from "./partials/BackToTop.svelte";
  import ImageModal from "./partials/Modal/Image.svelte";
  import { backend } from "./stores/backend";
  import { theme, lang, imgMode } from "./stores/settings";

  $: document.documentElement.setAttribute("theme", $theme);
  
  $backend.check()
</script>

<div use:links>
  <Router primary={false}>
    <Navbar/>
    <Routes />

    <ImageModal/>
    <BackToTop/>
    <LocalStorage key="lang" bind:value={$lang} />
    <LocalStorage key="theme" bind:value={$theme} />
    <LocalStorage key="imgMode" bind:value={$imgMode} />
    <LocalStorage key="token" bind:value={$backend.token} />
    <LocalStorage key="username" bind:value={$backend.username} />
  </Router>
</div>

<style lang="sass">
  @use "styles/app"
</style>
