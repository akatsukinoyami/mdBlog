<script lang="ts">
	import { Router, links } from "svelte-navigator";
  import { LocalStorage } from 'carbon-components-svelte';

  import Navbar from './components/Navbar.svelte';
  import Main from './components/Index.svelte';
  import { i18n } from "./functions";
  import { title, theme, lang } from "./stores";

  $: t = i18n($lang);
  $: displayedTitle = $title == t.mainTitle ? t.mainTitle : `${$title} | ${t.mainTitle}`;
  $: document.documentElement.setAttribute("theme", $theme);

</script>

<svelte:head>
  <title>{ displayedTitle }</title>
</svelte:head>

<div use:links>
  <Router primary={false}>
    <Navbar/>
    <Main />
  </Router>
  
  <LocalStorage key="lang" bind:value={$lang} />
  <LocalStorage key="theme" bind:value={$theme} />
</div>

<style lang="sass">@use "styles/app"</style>
