<script lang="ts">
  import NavbarLink from "./navbar-link.svelte";
  
  export let links: { text: string, active?: boolean, href?: "#" }[];
</script>

<div class="hidden sm:ml-6 sm:block">
  <div class="flex space-x-4">
    {#each links as link}
      <NavbarLink {...link} />
    {/each}
  </div>
</div>