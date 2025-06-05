<script lang="ts">
	import Card from './card.svelte';
	import type { Entity } from '$lib/types';

	let { entity }: { entity: Entity } = $props();
</script>

{#if entity?.children}
	<section class="grid grid-cols-3 gap-4">
		{#each Object.entries(entity?.children) as [folderName, child] (folderName)}
			<Card {folderName} entity={child} />
		{/each}
	</section>
{/if}
