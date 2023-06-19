<script lang="ts">
  import { Login, Logout, UserAvatar, UserAvatarFilled } from "carbon-icons-svelte";
  import { HeaderGlobalAction } from "carbon-components-svelte";
  import { navigate } from "svelte-navigator";

  import i18n from "../../../i18n";
  import { lang } from "../../../stores/index";
  import { backend } from "../../../stores/backend";

  $: t = i18n($lang);
  $: authable = $backend.avaliable
  $: signed_in = $backend.token
</script>

{#if authable}
  {#if signed_in}
    <HeaderGlobalAction aria-label={$backend.username} icon={UserAvatarFilled} />
    <HeaderGlobalAction aria-label={t.auth.sign_out}   icon={Logout}     on:click={ () => $backend.signOut() }/>
  {:else}
    <HeaderGlobalAction aria-label={t.auth.sign_up}    icon={UserAvatar} on:click={ () => navigate("/auth/sign_up") } />
    <HeaderGlobalAction aria-label={t.auth.sign_in}    icon={Login}      on:click={ () => navigate("/auth/sign_in") } />
  {/if}
{/if}
