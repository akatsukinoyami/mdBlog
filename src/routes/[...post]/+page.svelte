<script lang="ts">
	import i18n from '$lib/i18n';
	import { getEntityByPath } from '$lib/utils';
	import Post from '$lib/partials/post.svelte';
	import CardCollection from '$lib/partials/cardCollection.svelte';
	import { lang, title } from "$lib/stores";
	import type { Entity } from '$lib/types';

	let { data }: { data: { entity: Entity; path: string } } = $props();
	let entity = $derived(getEntityByPath(data.entity, data.path));
  let t = $derived(i18n($lang));

	$effect(() => {
    $title = entity?.title?.[$lang] || t("title.app");
  })
</script>

{#if entity}
	<Post {entity} path={data.path} />
	<CardCollection cardClass={{ "dark:brightness-60": true, "dark:contrast-200": !data.path }} {entity} />
{/if}

