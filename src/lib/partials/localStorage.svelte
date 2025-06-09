<script lang="ts">
  import { codeTheme, lang, theme, trafficEconomy } from "$lib/stores";

	$effect(() => {
		localStorage.setItem('lang', $lang);
	});

	$effect(() => {
		localStorage.setItem('theme', $theme);
		document.documentElement.classList.toggle("dark", $theme === "dark")
	});

	$effect(() => {
		localStorage.setItem('codeTheme', $codeTheme);
	});

	$effect(() => {
		localStorage.setItem('trafficEconomy', $trafficEconomy);
	});
</script>