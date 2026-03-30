<script lang="ts">
	import '../app.css';
	import { Toaster } from 'svelte-sonner';
	import i18n from '$lib/i18n';
	import { pageTitle } from '$lib/pageTitle.svelte';
	import Footer from '$lib/partials/footer.svelte';
	import LocalStorage from '$lib/partials/localStorage.svelte';
	import Navbar from '$lib/partials/navbar.svelte';
	import { lang } from '$lib/stores';

	let { children } = $props();
	let t = $derived(i18n($lang));
</script>

<svelte:head>
	<title>{t('title.app')}{pageTitle.value ? ` - ${pageTitle.value}` : ''}</title>
</svelte:head>

<container class="relative mx-auto block max-w-7xl">
	<Navbar />

	<h1 class="mt-16 mb-8 text-center text-3xl font-semibold">{pageTitle.value || t('title.app')}</h1>

	<main class="mx-auto max-w-5xl mb-40 rounded-3xl p-8 shadow-2xl/30 bg-white dark:bg-gray-400/30">
		<section class="flex flex-col gap-10">
			{@render children?.()}
		</section>
	</main>

	<Footer />
</container>

<Toaster position="top-right" richColors expand />

<LocalStorage />
