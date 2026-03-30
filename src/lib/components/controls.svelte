<script lang="ts">
	import {
		mdiImageOffOutline,
		mdiImageOutline,
		mdiWeatherNight,
		mdiWhiteBalanceSunny,
	} from "@mdi/js";
	import { lang, theme, trafficEconomy } from "$lib/stores";
	import Icon from "./icon.svelte";

	let mounted = $state(false);
	$effect(() => {
		mounted = true;
	});

	const themeIcons = {
		dark: mdiWeatherNight,
		light: mdiWhiteBalanceSunny,
	};

	const economyIcons = {
		true: mdiImageOffOutline,
		false: mdiImageOutline,
	};
</script>

{#if mounted}
	<div class="flex gap-2">
		<button
			onclick={() => trafficEconomy.toggle()}
			class="w-8 h-8 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
			title="traffic economy: {$trafficEconomy}"
		>
			<Icon path={economyIcons[$trafficEconomy]} />
		</button>

		<button
			onclick={() => theme.toggle()}
			class="w-8 h-8 rounded-full flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
			title={$theme}
		>
			<Icon path={themeIcons[$theme]} />
		</button>

		<button
			onclick={() => lang.toggle()}
			class="w-8 h-8 rounded-full overflow-hidden opacity-50 hover:opacity-100 transition-opacity cursor-pointer"
			title={$lang}
		>
			<img
				src="/icons/{$lang}.svg"
				alt={$lang}
				class="w-full h-full object-cover"
			/>
		</button>
	</div>
{/if}
