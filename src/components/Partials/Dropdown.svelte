<script lang="ts">
	import { links } from "svelte-navigator";
  import { i18n } from "../../functions";
  import { lang } from "../../stores";

  export let title: string;

  $: translatedTitle = i18n(title, $lang)
</script>

<div class="dropdown">
  <details>
    <summary class="button outline border-none">{translatedTitle}</summary>
    <div class="dropdown-content" use:links>
      <slot></slot>
    </div>
  </details>
</div>

<style lang="sass">
  .dropdown
    display: inline-block
    position: relative

    summary
      list-style: none
      cursor: pointer

      &::-webkit-details-marker
        display: none

    .dropdown-content
      position: absolute
      min-inline-size: max-content
      background-color: var(--color-light-grey)
      border-radius: 5px
      z-index: 20
      right: 0
      box-shadow: 0px 0px 10px 2px var(--color-whalf-transparent)

    details[open] summary::before
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      content: ""
      cursor: default
</style>
