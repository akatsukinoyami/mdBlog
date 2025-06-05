<script lang="ts">
	import { getEntityByPath } from '$lib/utils';
	import { CardCollection, Post } from '$lib/components';
	import { lang, title, defaultTitle, theme } from '$lib/stores';
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

