<script lang="ts">
  import { Button, TextInput } from "carbon-components-svelte";
  import { updateTitle } from "../../functions";
  import i18n from "../../i18n";
  import { lang } from "../../stores/index";
  import { backend } from "../../stores/backend";

  $: t = i18n($lang)
  $: updateTitle(t.auth.sign_in)

  let email="";
  let password="";
</script>

<TextInput inline size="xl" labelText="Email"    placeholder="Email"    bind:value={email} />
<TextInput inline size="xl" labelText="Password" placeholder="Password" bind:value={password} />
<Button on:click={() => $backend.signIn(email, password) }>{ t.auth.sign_in }</Button>

