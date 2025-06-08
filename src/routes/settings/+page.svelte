<script lang="ts">
  import Select from "$lib/components/select.svelte";
  import i18n from "$lib/i18n";
  import { codeTheme, lang, theme, title } from "$lib/stores";
  import type { Lang, Theme } from "$lib/types";

  let t = $derived(i18n($lang));

  $effect(() => {
    $title = t('title.settings');
  })
</script>

<Select 
  label={t('settings.lang.label')}
  options={t('settings.lang.options')}
  selectedId={$lang}
  onchange={(id) => $lang = id as Lang}
/>

<Select 
  label={t('settings.theme.label')}
  options={t('settings.theme.options')}
  selectedId={$theme}
  onchange={(id) => $theme = id as Theme}
/>

<Select 
  label={t('settings.codeTheme.label')}
  options={t('settings.codeTheme.options')}
  selectedId={$codeTheme}
  onchange={(id) => $codeTheme = id as Theme}
/>