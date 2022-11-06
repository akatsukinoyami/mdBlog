<script lang="ts">
  export let showOnPx = 150;
  let hidden = true;

  function goTop() {
    document.getElementById("TopNavbar").scrollIntoView();
  }

  function scrollContainer() {
    return document.documentElement || document.body;
  }

  function handleOnScroll() {
    if (!scrollContainer()) {
      return;
    }

    if (scrollContainer().scrollTop > showOnPx) {
      hidden = false;
    } else {
      hidden = true;
    }
  }
</script>

<svelte:window on:scroll={handleOnScroll} />

<a href={ "#" } class="back-to-top" on:click={goTop} class:hidden>
  <i class="bi bi-arrow-up"></i>
</a>

<style>
  .back-to-top {
    left: 20px;
    bottom: 20px;
    opacity: 1;
    transition: opacity 0.5s, visibility 0.5s;
    position: fixed;
    z-index: 99;
    user-select: none;
    color: black;
  }

  .back-to-top.hidden {
    opacity: 0;
    visibility: hidden;
  }
</style>
