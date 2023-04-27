import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css  from 'rollup-plugin-css-only';
import del  from "rollup-plugin-delete";
import json from "@rollup/plugin-json";
import replaceHtmlVars  from "rollup-plugin-replace-html-vars";
import copy from "rollup-plugin-copy";

const
  production = !process.env.ROLLUP_WATCH,
  css_framework = "node_modules/@picocss/pico/css/pico.classless.min.css",
  unixTime = new Date().valueOf();

function fingerprint(name) {
  return `${unixTime}.${name}`
}

function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process')
        .spawn('npm', ['run', 'start', '--', '--dev'], {
          stdio: ['ignore', 'inherit', 'inherit'],
          shell: true
        });

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'app',
    dir: "./public/build",
		entryFileNames: fingerprint('bundle.js')
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({ sourceMap: !production }),
			compilerOptions: { dev: !production } // enable run-time checks when not in production
		}),
    copy({
      verbose: true,
      targets: [
        { src: css_framework, dest: './public/build', rename: (name, extension) => fingerprint(`${name}.${extension}`) },
        { src: `${css_framework}.map`, dest: './public/build', }
      ],
    }),

    // we"ll extract any component CSS out into a separate file - better for performance
    css({
      output: fingerprint('bundle.css'),
      sourceMap: true
    }),

		// If you have external dependencies installed from
		// npm, you'll most likely need these plugins. In
		// some cases you'll need additional configuration -
		// consult the documentation for details:
		// https://github.com/rollup/plugins/tree/master/packages/commonjs
    commonjs(),

    // Replace fingerprints of prebuilt bundle in index.html
    replaceHtmlVars({
      files: "./public/index.html",
      from: /[0-9]{13,13}/gi,
      to: unixTime
    }),

    // Delete old build
    del({
      targets: './public/build/*',
      force: true,
      verbose: true,
    }),

    resolve({ browser: true, dedupe: ['svelte'] }),
		typescript({ sourceMap: !production, inlineSources: !production }),
    json({ compact: true }),
		!production && serve(),               // In dev mode, call `npm run start` once the bundle has been generated
		!production && livereload('public'),  // Watch the `public` directory and refresh the browser on changes when not in production
		production && terser()                // If we're building for production (npm run build instead of npm run dev), minify
	],
	watch: { clearScreen: false }
};
