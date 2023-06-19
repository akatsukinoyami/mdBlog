<script lang="ts">
  import { Button, PasswordInput, TextInput, Tile } from "carbon-components-svelte";
  import { updateTitle } from "../../functions";
  import i18n from "../../i18n";
  import { lang } from "../../stores/index";
  import { backend } from "../../stores/backend";
  import { post } from "../../functions/requests";
  import { navigate } from "svelte-navigator";

  export let register = false;
  
  let 
    button: string,
    url: string,
    errors: Record<string, string[]> = {},
    username="", 
    email="", 
    password="";

  $: if($backend.token) navigate('/')
  $: t = i18n($lang)
  $: {
    let action = register ? 'sign_up' : 'sign_in';
    button = t.auth.action[action]
    updateTitle(t.auth.noun[action])
    url = $backend.path(`/auth/${action}`)
  }

  $: props = {
    username: {
      labelText: t.auth.field.username,
      placeholder: t.auth.field.username,
      invalid: !!errors?.username,
      invalidText: errors?.username?.join(". ")
    },
    email: {
      type: "email", 
      labelText: t.auth.field.email,
      placeholder: t.auth.field.email,
      invalid: !!errors?.email,
      invalidText: errors?.email?.join(". ")
    },
    password: { 
      labelText: t.auth.field.password,
      placeholder: t.auth.field.password,
      invalid: !!errors?.password,
      invalidText: errors?.password?.join(". ")
    }
  }

  function auth(){
    post(url, { username, email, password })
      .then((response) => response.json())
      .then(({ username, token }) => {
        $backend.setCredentials(username, token);
        navigate("/")
      })
      .catch(status => {
        const text = status.toString().replace("Error: ", "")
        errors = JSON.parse(text)
      })
  }
</script>

{#if register}
  <Tile>
    <TextInput size="xl" {...props.username} bind:value={username}/>
  </Tile>
{/if}
<Tile>
  <TextInput size="xl" {...props.email} bind:value={email}  />
</Tile>
<Tile>
  <PasswordInput size="xl" {...props.password} bind:value={password} />
</Tile>
<Tile>
  <Button on:click={ auth }>{ button }</Button>
</Tile>
