<script lang="ts">
  import linksJson from '../../jsons/links.json';
	import { links } from "svelte-navigator";
</script>

<li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle link-light" href={"#"} role="button" data-bs-toggle="dropdown" aria-expanded="false">
    Pages
  </a>
  <ul class="dropdown-menu dropdown-menu-end" use:links>
    {#each linksJson.md as page}
      <li>
        <a href="/page/{page}" class="dropdown-item text-capitalize">{ page.replaceAll('_', ' ') }</a>
      </li>
    {/each}
    <li>
      <hr class="dropdown-divider">
    </li>
    {#each linksJson.outer as { link, title }}
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
    {#each linksJson.my as { link, title, icon }}
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
    color: rgba(var(--bs-dark-rgb), var(--bs-bg-opacity))

    &:hover
      cursor: pointer
      color: var(--bs-blue)
</style>
