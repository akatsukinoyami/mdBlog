<script lang="ts">
	import { getEntityByPath } from '$lib/utils';
	import Post from '$lib/components/post.svelte';
	import CardCollection from '$lib/components/cardCollection.svelte';
	import { lang, title, defaultTitle } from '$lib/stores';
	import type { Entity } from '$lib/types';

	let { data }: { data: { entity: Entity; path: string } } = $props();
	let entity = $derived(getEntityByPath(data.entity, data.path));

	$effect(() => {
		$title = entity?.title?.[$lang] || defaultTitle;
	});

</script>

{#if entity}
	<section class="flex flex-col gap-10">
		<Post {entity} path={data.path} />
		<CardCollection {entity} />
	</section>
{/if}

