<script lang="ts">
  export let showOnPx = 150;
  let
    hidden = true,
    background = false;
  $: icon = background ? '-fill' : ''

function toggleBackground(){
  background = !background
}
function goTop() {
  const h1 = document.getElementsByTagName('h1')[0];
  h1.scrollIntoView({block: "center", behavior: "smooth"});
}
function scrollContainer() {
  return document.documentElement || document.body;
}
function handleOnScroll() {
  if (!scrollContainer()) return;
  hidden = !(scrollContainer().scrollTop > showOnPx);
}
</script>

<svelte:window on:scroll={handleOnScroll} />

<div
  class="back-to-top"
  on:click={goTop}
  on:keydown={goTop}
  on:mouseenter={toggleBackground}
  on:mouseleave={toggleBackground}
  class:hidden
>
  <i class="bi bi-arrow-up-circle{icon} text-dark"></i>
</div>

<style lang="sass">
  .back-to-top
    left: 20px
    bottom: 20px
    opacity: 1
    transition: opacity 0.5s, visibility 0.5s
    position: fixed
    z-index: 99
    user-select: none
    color: rgba(var(--bs-dark-rgb))
    cursor: pointer

  .back-to-top.hidden
    opacity: 0
    visibility: hidden

  i
    font-size: 20pt
</style>
