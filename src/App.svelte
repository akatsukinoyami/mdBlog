<script lang="ts">
	import { Route, Router, links } from "svelte-navigator";
  import { LocalStorage, Tile } from 'carbon-components-svelte';

  import "./app.css";
  import BlogPage from "./pages/BlogPage.svelte";
  import TicTacToe from "./pages/game/tictactoe/Index.svelte";

  import Navbar from './lib/navbar.svelte';
  import BackToTop from "./components/BackToTop.svelte";
  import ImageModal from "./components/Modal/Image.svelte";

  import { theme, lang, imgMode } from "./stores";

  $: document.documentElement.setAttribute("theme", $theme);
</script>

<div use:links>
  <Router primary={false}>
    <Navbar/>

    <section>
      <Tile>
        <Route path="game/tictactoe" component={TicTacToe} />
        <Route component={BlogPage} />
      </Tile>
    </section>

    <ImageModal/>
    <BackToTop/>
    <LocalStorage key="lang" bind:value={$lang} />
    <LocalStorage key="theme" bind:value={$theme} />
    <LocalStorage key="imgMode" bind:value={$imgMode} />
  </Router>
</div>

<style lang="sass">
  @use "styles/app"
  @use "styles/table-grid"

  section
    max-width: var(--content-width)
    margin: 20px auto 100px
    padding: 20px
    border-radius: 10px

  :global(.bx--tile)
    min-height: 100vh
</style>
