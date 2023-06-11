<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import { ChevronUp } from "carbon-icons-svelte";

  export let showOnPx = 150;
  let hidden = true;

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
  class:hidden
>
  <Button 
    kind="ghost" 
    size="xl" 
    on:click={goTop}
    iconDescription="Back to top"
    icon={ChevronUp}
    tooltipPosition="top"
  />
</div>

<style lang="sass">
  .back-to-top
    left: 20px
    bottom: 20px
    opacity: 1
    transition: opacity 0.5s, visibility 0.5s
    position: fixed
    z-index: 10
    user-select: none
    color: rgba(var(--bs-dark-rgb))
    cursor: pointer

  .back-to-top.hidden
    opacity: 0
    visibility: hidden
</style>
