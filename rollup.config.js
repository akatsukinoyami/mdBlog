import commonjs 			      from "@rollup/plugin-commonjs";
import json 				        from "@rollup/plugin-json";
import resolve 				      from "@rollup/plugin-node-resolve";
import typescript 			    from "@rollup/plugin-typescript";
import css  				        from "rollup-plugin-css-only";
import del  				        from "rollup-plugin-delete";
import livereload 			    from "rollup-plugin-livereload";
import replaceHtmlVars 		  from "rollup-plugin-replace-html-vars";
import svelte 				      from "rollup-plugin-svelte";
import { terser } 			    from "rollup-plugin-terser";
import sveltePreprocess 	  from "svelte-preprocess";
import { optimizeImports } 	from "carbon-preprocess-svelte";

const
  production = !process.env.ROLLUP_WATCH,
  unixTime = new Date().valueOf(),
	sourceMap = !production;

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
			server = require("child_process")
        .spawn("npm", ["run", "start", "--", "--dev"], {
          stdio: ["ignore", "inherit", "inherit"],
          shell: true
        });

			process.on("SIGTERM", toExit);
			process.on("exit", toExit);
		}
	};
}

export default {
	input: "src/main.ts",
	output: {
		sourcemap: sourceMap,
		format: "iife",
		name: "app",
    	dir: "./public/build",
		entryFileNames: fingerprint("bundle.js")
	},
	plugins: [
		svelte({
			preprocess: [
				sveltePreprocess({ sourceMap }),
				optimizeImports(),
			],
			compilerOptions: { dev: !production } // enable run-time checks when not in production
		}),

  // we"ll extract any component CSS out into a separate file - better for performance
  css({ output: fingerprint("bundle.css"), sourceMap }),

	// If you have external dependencies installed from
	// npm, you'll most likely need these plugins. In
	// some cases you'll need additional configuration -
	// consult the documentation for details:
	// https://github.com/rollup/plugins/tree/master/packages/commonjs
  commonjs(),

  // Replace fingerprints of prebuilt bundle in index.html
  replaceHtmlVars({ files: "./public/index.html", from: /[0-9]{13,13}/gi, to: unixTime }),

  // Delete old build
  del({ targets: "./public/build/*", force: true, verbose: true, }),

  resolve({ browser: true, dedupe: ["svelte"] }),
	typescript({ sourceMap, inlineSources: sourceMap }),
  json({ compact: production }),
	!production && serve(),               // In dev mode, call `npm run start` once the bundle has been generated
	!production && livereload("public"),  // Watch the `public` directory and refresh the browser on changes when not in production
	production && terser()                // If we"re building for production (npm run build instead of npm run dev), minify
	],
	watch: { clearScreen: false }
};
