<script lang="ts">
	import { lang, theme, trafficEconomy } from '$lib/stores';

	$effect(() => {
		localStorage.setItem('lang', $lang);
	});

	$effect(() => {
		localStorage.setItem('theme', $theme);
		document.documentElement.classList.toggle('dark', $theme === 'dark');
	});

	$effect(() => {
		localStorage.setItem('trafficEconomy', $trafficEconomy);
	});
</script>
