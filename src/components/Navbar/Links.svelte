<script lang="ts">
  import links from '../../jsons/links.json';
	import { Link } from "svelte-navigator";

  function link(page: string): string {
    return `/page/${page}`
  }
  function linkContent(page: string): string {
    return page.replaceAll('_', ' ')
  }
</script>

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

<style lang="sass">
  a
    text-decoration: none

    &:hover
      cursor: pointer
      color: var(--bs-blue)
</style>
