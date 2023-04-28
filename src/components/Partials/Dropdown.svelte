<script lang="ts">
	import { links } from "svelte-navigator";

  export let title: string;
</script>

<div class="dropdown">
  <details>
    <summary class="button outline">{title}</summary>
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
      border: none

      &::-webkit-details-marker
        display: none

    .dropdown-content
      position: absolute
      min-inline-size: max-content
      background-color: white
      border: 1px solid var(--color-grey)
      border-radius: 5px
      z-index: 20
      right: 0
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)

    details[open] summary::before
      position: fixed
      top: 0
      right: 0
      bottom: 0
      left: 0
      content: ""
      cursor: default
</style>
