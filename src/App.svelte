<script lang="ts">
	import { Route, Router, links } from "svelte-navigator";
  import { LocalStorage, Tile } from 'carbon-components-svelte';

  import { BlogPage, TicTacToe, GameOfAnts, GameOfLife, PDFTools } from "./pages";
  import { Navbar, BackToTop, ImageModal } from './components';
  import { theme, lang, imgMode } from "./stores";

  $: document.documentElement.setAttribute("theme", $theme);
</script>

<div use:links>
  <Router primary={false}>
    <Navbar/>

    <section>
      <Tile>
        <Route path="game/*">
          <Route path="tictactoe" component={TicTacToe} />
          <Route path="gameofants" component={GameOfAnts} />
          <Route path="gameoflife" component={GameOfLife} />
        </Route>
        <Route path="tool/*">
          <Route path="pdftools" component={PDFTools} />
        </Route>
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
