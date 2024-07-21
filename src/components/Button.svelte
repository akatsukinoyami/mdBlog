<script lang="ts">
  import { Button } from "carbon-components-svelte";
  import type { SvelteComponent } from "svelte";

  export let icon: any;

  let localIcon = icon as typeof SvelteComponent;
</script>

<Button {...$$props} icon={localIcon}/>