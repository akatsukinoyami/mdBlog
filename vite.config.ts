import tailwindcss from '@tailwindcss/vite';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

const svelteExtensions = ['svelte-sonner', 'svelte-inspect-value', 'svelte-loading-spinners'];

export default defineConfig({
	plugins: [tailwindcss(), sveltekit()],
	optimizeDeps: {
		// включаем в пре-бандлинг на этапе dev
		include: svelteExtensions
	},
	ssr: {
		// запрещаем SvelteKit выносить в «externals» при SSR,
		// чтобы Vite мог скомпилировать его .svelte-файлы
		noExternal: svelteExtensions
	}
});
