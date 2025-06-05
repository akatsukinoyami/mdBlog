<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import { Navbar } from '$lib/components';
	import { defaultTitle, title } from '$lib/stores';

	let { children } = $props();
</script>

<svelte:head>
	<title>{defaultTitle} {$title}</title>
</svelte:head>

<container class="relative mx-auto block max-w-7xl">
	<Navbar />

	<h1 class="mt-16 mb-8 text-center text-3xl font-semibold">{$title}</h1>

	<main class="mx-auto min-h-svw max-w-5xl rounded-3xl bg-white p-8 shadow-2xl/30 dark:bg-gray-400/30">
		{@render children?.()}
	</main>
</container>

<Toaster position="top-right" richColors expand />
