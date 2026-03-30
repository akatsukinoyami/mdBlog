<script lang="ts">
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
	import Icon from '$lib/components/icon.svelte';
	import Select from '$lib/components/select.svelte';
	import i18n from '$lib/i18n';
	import { codeTheme, lang, theme, title, trafficEconomy } from '$lib/stores';
	import type { Lang, Theme, TrafficEconomy } from '$lib/types';

	const choice: Record<string, string> = { light: mdiWhiteBalanceSunny, dark: mdiWeatherNight };
	let t = $derived(i18n($lang));

	$effect(() => {
		$title = t('title.settings');
	});
</script>

<Select 
  label={t('settings.lang.label')}
  options={t('settings.lang.options')}
  selectedId={$lang}
  onchange={(id) => $lang = id as Lang}
>
  {#snippet peroption(id: string, selected: boolean)}
    <img class={{"w-4 h-4": true, "opacity-50": !selected}} src="/icons/{id}.svg" alt="{id} icon" />
  {/snippet}
</Select>

<Select 
  label={t('settings.theme.label')}
  options={t('settings.theme.options')}
  selectedId={$theme}
  onchange={(id) => $theme = id as Theme}
>
  {#snippet peroption(id: string, selected: boolean)}
    <Icon pathClass={{"opacity-50": !selected}} path={choice[id]} />
  {/snippet}
</Select>

<Select 
  label={t('settings.codeTheme.label')}
  options={t('settings.codeTheme.options')}
  selectedId={$codeTheme}
  onchange={(id) => $codeTheme = id as Theme}
>
  {#snippet peroption(id: string, selected: boolean)}
    <Icon pathClass={{"opacity-50": !selected}} path={choice[id]} />
  {/snippet}
</Select>


<Select 
  label={t('settings.trafficEconomy.label')}
  options={t('settings.trafficEconomy.options')}
  selectedId={$trafficEconomy}
  onchange={(id) => $trafficEconomy = id as TrafficEconomy}
/>
