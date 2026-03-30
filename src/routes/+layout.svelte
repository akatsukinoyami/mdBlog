<script lang="ts">
	import "../app.css";
	import { mdiChevronLeft } from "@mdi/js";
	import { Toaster } from "svelte-sonner";
	import { page } from "$app/stores";
	import Icon from "$lib/components/icon.svelte";
	import i18n from "$lib/i18n";
	import { pageTitle } from "$lib/pageTitle.svelte";
	import Footer from "$lib/partials/footer.svelte";
	import LocalStorage from "$lib/partials/localStorage.svelte";
	import Navbar from "$lib/partials/navbar.svelte";
	import { lang } from "$lib/stores";

	let { children } = $props();
	let t = $derived(i18n($lang));

	let parentPath = $derived.by(() => {
		const parts = $page.url.pathname
			.replace(/\/$/, "")
			.split("/")
			.filter(Boolean);
		if (parts.length === 0) return null;
		parts.pop();
		return `/${parts.join("/")}` || "/";
	});
</script>

<svelte:head>
	<title>{t("title.app")}{pageTitle.value ? ` - ${pageTitle.value}` : ""}</title
	>
</svelte:head>

<container class="relative mx-auto block max-w-7xl">
	<Navbar />

	<div
		class="mt-16 mb-8 flex items-center justify-center gap-3 mx-auto max-w-5xl relative"
	>
		{#if parentPath}
			<a
				href={parentPath}
				class="opacity-50 hover:opacity-100 transition-opacity absolute left-0"
				title="back"
			>
				<Icon path={mdiChevronLeft} size={36} />
			</a>
		{/if}
		<h1 class="text-3xl font-semibold">
			{pageTitle.value || t("title.app")}
		</h1>
	</div>

	<main
		class="mx-auto max-w-5xl mb-40 rounded-3xl p-8 shadow-2xl/30 bg-white dark:bg-gray-400/30"
	>
		<section class="flex flex-col gap-10">
			{@render children?.()}
		</section>
	</main>

	<Footer />
</container>

<Toaster position="top-right" richColors expand />

<LocalStorage />
