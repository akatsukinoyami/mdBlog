<script lang="ts">
	import { type Class, type Entity } from '$lib/types';
	import Card from '../components/card.svelte';

	let { entity, cardClass }: { entity: Entity; cardClass: Class } = $props();

	let children = $derived(
		!entity?.children
			? []
			: Object.entries(entity?.children).sort(([a], [b]) =>
					a > b ? 1 : a < b ? -1 : 0
				)
	);
</script>

{#if children}
	<section class="grid grid-cols-2 md:grid-cols-3 gap-4">
		{#each children as [folderName, entity] (folderName)}
			<Card class={cardClass} {folderName} {entity} />
		{/each}
	</section>
{/if}
