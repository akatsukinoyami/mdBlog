<script lang="ts">
  import { Route } from "svelte-navigator";
  
  import SignIn     from "./SignIn.svelte";
  import SignUp     from "./SignUp.svelte";
  import { backend } from "../../stores/backend";

  $: authable = $backend.avaliable;
</script>

{#if authable}
  <Route path="auth/*">
    <Route path="sign_in" component={SignIn} />
    <Route path="sign_up" component={SignUp} />
  </Route>
{/if}
