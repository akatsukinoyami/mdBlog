<script lang="ts">
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
	import { theme, lang } from '$lib/stores';
	import Icon from './icon.svelte';

	let { links = [{ href: '/', label: 'Home' }] } = $props();

	const flex = 'flex items-center';
	const shadows =
		'hover:drop-shadow-xl/50 hover:drop-shadow-amber-900 dark:hover:drop-shadow-gray-50';
</script>

<div
	class={[
		'sticky h-12 px-5 sm:mx-2 sm:mt-2 md:mx-5',
		'sm:rounded-full sm:shadow-md',
		'ring ring-1 ring-gray-100 dark:ring-gray-950',
		'bg-white/90 dark:bg-gray-900/90',
		flex
	]}
>
	<a href="/" class={[shadows, flex, 'blockmr-auto gap-2 font-semibold']}>
		<img src="/icon-64.png" width="32" alt="icon" />
		Katsu Nikki
	</a>
	<!--
	<middle class="absolute left-1/2 hidden -translate-x-1/2 transform sm:block">
		{#each links as { href, label } (href)}
			<a class={shadows} {href}>{label}</a>
		{/each}
	</middle>
		-->
	<end class={[flex, 'ml-auto gap-4']}>
		<button
			class={['cursor-pointer opacity-60 hover:opacity-100', shadows]}
			onclick={() => theme.toggle()}
		>
			<Icon path={$theme === 'dark' ? mdiWeatherNight : mdiWhiteBalanceSunny} />
		</button>

		<button
			class={['cursor-pointer opacity-60 hover:opacity-100', shadows]}
			onclick={() => lang.toggle()}
			aria-label="button"
		>
			<img src="/flags/{$lang}.svg" width="24" alt="{$lang} flag" />
		</button>
	</end>
</div>
