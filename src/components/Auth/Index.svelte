<script lang="ts">
  import { Route } from "svelte-navigator";
  
  import Auth     from "./Auth.svelte";
  import { backend } from "../../stores/backend";

  $: authable = $backend.avaliable;
</script>

{#if authable}
  <Route path="auth/*">
    <Route path="sign_in" component={Auth} />
    <Route path="sign_up" component={Auth} register={true} />
  </Route>
{/if}
