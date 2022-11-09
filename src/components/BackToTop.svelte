<script lang="ts">
  export let showOnPx = 150;
  let hidden = true;

  let background = false;
  $: icon = background ? '-fill' : ''
  function toggleBackground(){
    background = !background
  }

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

<a
  href={ "#" }
  class="back-to-top"
  on:click={goTop}
  on:mouseenter={toggleBackground}
  on:mouseleave={toggleBackground}
  class:hidden
>
  <i class="bi bi-arrow-up-circle{icon} text-dark"></i>
</a>

<style lang="sass">
  .back-to-top
    left: 20px
    bottom: 20px
    opacity: 1
    transition: opacity 0.5s, visibility 0.5s
    position: fixed
    z-index: 99
    user-select: none
    color: black

  .back-to-top.hidden
    opacity: 0
    visibility: hidden

  i
    font-size: 20pt
</style>
