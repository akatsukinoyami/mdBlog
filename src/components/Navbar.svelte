<script lang="ts">

  import linksJson from '../jsons/links.json';
  import { i18n } from '../functions';

  import Dropdown from "./Partials/Dropdown.svelte";

  const logoSize = 40;
</script>

<nav class="nav">
  <div class="nav-left">
    <a href="/" class="brand">
      <img src="/favicon.ico" alt="Red panda icon" width="{logoSize}" height="{logoSize}" style="display: inline;">
      <span>{i18n('mainTitle')}</span>
    </a>
  </div>
  <div class="nav-right">
    <Dropdown title="pages">
      {#each linksJson.md as page}
        <p><a href="/page/{page}" class="link">{ page.replaceAll('_', ' ') }</a></p>
      {/each}
      <hr>
      {#each linksJson.outer as { link, title }}
        <p><a href={ link } class="link" target="_blank" rel="noreferrer">{ title }</a></p>
      {/each}
    </Dropdown>
    <Dropdown title="myResources">
      {#each linksJson.my as { link, title }}
        <p><a href={ link } class="link" target="_blank" rel="noreferrer">{ title }</a></p>
      {/each}
    </Dropdown>
  </div>
</nav>

<style lang="sass">
  .link
    display: block
    color: var(--color-grey)
    text-decoration: none
    text-transform: capitalize
    padding: 0.5em 1.5em
    text-align: right

    &:hover, &:focus
      background-color: var(--color-grey)
      color: white

  .brand
    height: 40px

  .nav
   padding: 5px 0
</style>
