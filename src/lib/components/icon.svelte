<script lang="ts">
	import { classMerger } from '$lib/utils';
	import type { Snippet } from 'svelte';
	import type { Class } from '$lib/types';

	interface Props extends Record<string, unknown> {
		path?: string | string[];
		class?: Class;
		pathClass?: Class;
		size?: number;
		height?: number;
		width?: number;
		viewBox?: string;
		fill?: string;
		children?: Snippet;
	}

	let {
		path = '',
		class: className = '',
		pathClass = '',
		size = 24,
		height = size,
		width = size,
		viewBox = `0 0 ${width} ${height}`,
		fill = 'none',
		children,
		...rest
	}: Props = $props();
</script>

<svg
	class={classMerger('fill-current', className)}
	{width} {height} {fill} {viewBox}
	xmlns="http://www.w3.org/2000/svg"
	style:min-width={width}
	style:min-height={height}
>
	{#if children}
		{@render children()}
	{:else if Array.isArray(path)}
		{#each path as d}
			<path {d} {...rest} class={pathClass} />
		{/each}
	{:else}
		<path d={path} {...rest} class={pathClass} />
	{/if}
</svg>
