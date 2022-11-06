<script lang="ts">
	import { Link } from "svelte-navigator";
  import links from '../jsons/links.json';

  function link(page: string): string {
    return `/page/${page}`
  }
  function linkContent(page: string): string {
    return page.replaceAll('_', ' ')
  }
</script>

<nav class="navbar navbar-dark navbar-expand-lg bg-dark sticky-top">
  <div class="container-fluid">
    <a class="navbar-brand link-light" href="/">
      <img src="/favicon.ico" class="d-inline-block align-text-top" alt="Red panda icon" width="28" height="28">
      Katsu Nikki
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="w-100"></div>
      <ul class="navbar-nav text-end">
        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle link-light" href={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            Pages
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            {#each links.md as page}
              <li>
                <div class="dropdown-item text-capitalize">
                  <Link to={ link(page) }>{ linkContent(page) }</Link>
                </div>
              </li>
            {/each}
            <li>
              <hr class="dropdown-divider">
            </li>
            {#each links.outer as { link, title }}
              <li>
                <a class="dropdown-item" href="{link}" target="_blank" rel="noreferrer">
                  { title }
                </a>
              </li>
            {/each}
          </ul>
        </li>

        <li class="nav-item dropdown">
          <a class="nav-link dropdown-toggle link-light" href={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
            My Resources
          </a>
          <ul class="dropdown-menu dropdown-menu-end">
            {#each links.my as { link, title, icon }}
              <li>
                <a class="dropdown-item" href={ link } target="_blank" rel="noreferrer">
                  <i class="bi bi-{icon} pe-1"></i>
                  { title }
                </a>
              </li>
            {/each}
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <button class="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Blog Posts</button>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
    </div>
  </div>
</nav>

<style lang="sass">
  a
    text-decoration: none

    &:hover
      cursor: pointer
      color: var(--bs-blue)
</style>
