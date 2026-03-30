<script lang="ts">
	import i18n from '$lib/i18n';
	import CardCollection from '$lib/partials/cardCollection.svelte';
	import Metadata from '$lib/partials/metadata.svelte';
	import Post from '$lib/partials/post.svelte';
	import { lang, title } from '$lib/stores';
	import { type Entity } from '$lib/types';
	import { getEntityByPath } from '$lib/utils';

	let { data }: { data: { entity: Entity; path: string } } = $props();
	let entity = $derived(getEntityByPath(data.entity, data.path));
	let t = $derived(i18n($lang));

	$effect(() => {
		$title = entity?.title?.[$lang] || t('title.app');
	});
</script>

{#if entity}
	<Post {entity} path={data.path} />

	<CardCollection cardClass={{ "dark:brightness-60": true, "dark:contrast-200": !data.path }} {entity} />

	<Metadata {entity} />
{/if}

