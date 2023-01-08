<script lang="ts">
  import Navbar from './components/Navbar/Index.svelte';
  import Main from './components/Index.svelte';
  import ImageModal from './components/Partials/ImageModal.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import i18n from "./jsons/i18n.json";
  import { toggleTheme } from "./functions";

	import { Router } from "svelte-navigator";
  import { title, theme } from "./stores";
  let div: any;

  $: {
    div+=1;
    localStorage.theme = $theme;
    $theme == 'light'
      ? toggleTheme(document.body, 'bg-opacity-75', 'bg-opacity-10')
      : toggleTheme(document.body, 'bg-opacity-10', 'bg-opacity-75');
  }
</script>

<svelte:head>
  <title>{
    $title == i18n.mainTitle
      ? i18n.mainTitle
      : `${i18n.mainTitle} | ${$title}`
  }</title>
</svelte:head>

<div bind:this={div} data-bs-theme={$theme}>
  <Router primary={false}>
    <ImageModal />
    <Navbar/>
    <Main />
    <BackToTop />
    </Router>
</div>
