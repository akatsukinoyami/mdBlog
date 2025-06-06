<script lang="ts">
	import { mdiWeatherNight, mdiWhiteBalanceSunny } from '@mdi/js';
	import { flex, hoverShadows } from '$lib/constants';
	import { theme, lang } from '$lib/stores';
	import { bgUrl } from '$lib/utils';
	import Icon from './icon.svelte';

	// let { links = [{ href: '/', label: 'Home' }] } = $props();
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
	<a href="/" class={[flex, hoverShadows, 'blockmr-auto gap-2 font-semibold']}>
		<img src="/icon-64.png" width="32" alt="icon" /> Katsu Nikki
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
			class={['cursor-pointer opacity-60 hover:opacity-100', hoverShadows]}
			onclick={() => theme.toggle()}
		>
			<Icon path={$theme === 'dark' ? mdiWeatherNight : mdiWhiteBalanceSunny} />
		</button>

		<button
			class={['cursor-pointer opacity-60 hover:opacity-100 w-6 h-6 bg-center bg-no-repeat bg-contain', hoverShadows]}
			style:background-image={bgUrl('flags', `${$lang}.svg`)}
			onclick={() => lang.toggle()}
			aria-label="button"
		></button>
	</end>
</div>
