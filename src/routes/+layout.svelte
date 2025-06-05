<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import { Navbar } from '$lib/components';
	import { title, theme, lang } from '$lib/stores';
	import LocalStorage from '$lib/components/localStorage.svelte';
	import type { Lang } from '$lib/types';

	let { children } = $props();
</script>

<svelte:head>
	<title>{$title}</title>
</svelte:head>

<container class="relative mx-auto block max-w-7xl">
	<Navbar />

	<h1 class="mt-16 mb-8 text-center text-3xl font-semibold">{$title}</h1>

	<main class="mx-auto min-h-svw max-w-5xl rounded-3xl bg-white p-8 shadow-2xl/30 dark:bg-gray-400/30">
		{@render children?.()}
	</main>
</container>

<Toaster position="top-right" richColors expand />
<LocalStorage
	key="lang"
	bind:value={$lang}
	onupdate={({ value }) => {
		document.documentElement.lang = value as Lang;
	}}
/>
<LocalStorage
	key="theme"
	bind:value={$theme}
	onupdate={({ value }) => {
		document.documentElement.classList.toggle('dark', value === 'dark');
	}}
/>
