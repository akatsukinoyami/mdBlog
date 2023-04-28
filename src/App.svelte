<script lang="ts">
  import Navbar from './components/Navbar.svelte';
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

    document.body.setAttribute('data-bs-theme', $theme);
  }
</script>

<svelte:head>
  <title>{ $title == i18n.mainTitle ? i18n.mainTitle : `${i18n.mainTitle} | ${$title}` }</title>
</svelte:head>

<Router primary={false}>
  <ImageModal />
  <Navbar/>
  <Main />
  <BackToTop />
</Router>


<style lang="sass">
  :global(*)
      font-family: Montserrat, Georgia, Times, serif

  :global(body)
    margin: 0
    padding: 0
    position: relative
    box-sizing: border-box
    font-family: -apple-system, Montserrat, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif

  :global(a)
    text-decoration: none

  :global(table)
    table-layout: fixed
    width: 100%

  :root
    --bg-color: #ffffff
    --bg-secondary-color: #f3f3f6
    --color-primary: #14854F
    --color-lightGrey: #d2d6dd
    --color-grey: #747681
    --color-darkGrey: #3f4144
    --color-error: #d43939
    --color-success: #28bd14
    --grid-maxWidth: 120rem
    --grid-gutter: 2rem
    --font-size: 1.6rem
    --font-color: #333333
    --font-family-sans: sans-serif
    --font-family-mono: monaco, "Consolas", "Lucida Console", monospace
</style>
