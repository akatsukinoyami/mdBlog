<script lang="ts">
  import Links from './Links.svelte';
  import i18n from '../../jsons/i18n.json';
  import { theme } from '../../stores';

  let iconClasses = localStorage.theme == 'light' ? 'brightness-high' : 'moon-stars';

  function toggleTheme(){
    $theme = localStorage.theme == 'light' ? 'dark' : 'light';
    iconClasses = localStorage.theme == 'light' ? 'moon-stars' : 'brightness-high';
  }

  const logoSize = 40;
</script>

<nav class="navbar navbar-dark navbar-expand-lg bg-dark sticky-top" id="TopNavbar">
  <div class="container-fluid">
    <a class="navbar-brand link-light p-0" href="/">
      <img src="/favicon.ico" class="d-inline-block align-text-top" alt="Red panda icon" width="{logoSize}" height="{logoSize}">
      <p class="m-0">{i18n.mainTitle}</p>
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="w-100"></div>
      <ul class="navbar-nav text-end">
        <Links/>
      </ul>
    </div>
    <div>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <button class="btn btn-outline-light bi bi-{iconClasses} fz-40 no-borders" on:click={toggleTheme}></button>
      <button class="btn btn-outline-light" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight">Blog Posts</button>
    </div>
  </div>
</nav>

<style lang="sass">
  a
    text-decoration: none
    display: flex
    flex-direction: row
    align-items: center

    &:hover
      cursor: pointer
      color: var(--bs-blue)

  .no-borders
    border: none

  .fz-40
    font-size: 24px
</style>
