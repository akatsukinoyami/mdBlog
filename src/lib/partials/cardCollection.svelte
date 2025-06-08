<script lang="ts">
	import Card from '../components/card.svelte';
	import type { Entity } from '$lib/types';

	let { entity }: { entity: Entity } = $props();
	
	let children = $derived(!entity?.children ? [] : Object
		.entries(entity?.children)
		.sort(([a], [b]) => a > b ? 1 : a < b ? -1 : 0)
	)
</script>

{#if children}
	<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
		{#each children as [folderName, entity] (folderName)}
			<Card {folderName} {entity} />
		{/each}
	</section>
{/if}
