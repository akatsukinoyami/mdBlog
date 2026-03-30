<script lang="ts">
	let {
		height = 4.8,
		barColor = 'after:bg-amber-800 dark:after:bg-white',
		barWidth = 'after:w-48',
		barHeight = 'after:h-[4.8px]',
		background = 'bg-white/15'
	} = $props();
</script>

<span
	class={[
		"w-full inline-block relative overflow-hidden",
		"after:content-[''] after:absolute after:box-border after:animate-bar1",
		"after:left-0 after:top-0",
		barColor,
		barWidth,
		barHeight,
		background,
	]}
	style:height="{height}px"
></span>
