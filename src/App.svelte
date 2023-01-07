<script lang="ts">
  import Navbar from './components/Navbar/Index.svelte';
  import Main from './components/Index.svelte';
  import ImageModal from './components/Partials/ImageModal.svelte';
  import BackToTop from "./components/Partials/BackToTop.svelte";
  import i18n from "./jsons/i18n.json";

	import { Router } from "svelte-navigator";
  import { title } from "./stores";
</script>

<svelte:head>
  <title>{
    $title == i18n.mainTitle
      ? i18n.mainTitle
      : `${i18n.mainTitle} | ${$title}`
  }</title>
</svelte:head>

<Router primary={false}>
  <ImageModal />
  <Navbar/>
  <Main />
  <BackToTop />
</Router>
