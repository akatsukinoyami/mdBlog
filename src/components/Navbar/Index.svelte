<script lang="ts">
  import Links from './Links.svelte';
</script>

<nav class="navbar navbar-dark navbar-expand-lg bg-dark sticky-top" id="TopNavbar">
  <div class="container-fluid">
    <a class="navbar-brand link-light" href="/">
      <img src="/favicon.ico" class="d-inline-block align-text-top" alt="Red panda icon" width="28" height="28">
      Katsu Nikki
    </a>

    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <div class="w-100"></div>
      <ul class="navbar-nav text-end">
        <Links/>
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
