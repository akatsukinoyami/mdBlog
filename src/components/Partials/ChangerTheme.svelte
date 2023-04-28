<script>
  import { i18n } from "../../functions";
  import { lang, theme } from "../../stores"

  let themeText;

  const themes = { light: "☼", dark: "☾" }

  $: themeText = `${i18n('theme', $lang)} ${themes[$theme]}`;

  function toggleTheme(){
    $theme = $theme === 'light' ? 'dark' : 'light';
  }
</script>

<button on:click={toggleTheme}>{themeText}</button>
