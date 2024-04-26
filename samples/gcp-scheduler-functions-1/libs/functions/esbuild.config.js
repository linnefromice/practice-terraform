const esbuild = require("esbuild");

esbuild.build({
  entryPoints: ["src/index.ts"],
  bundle: true,
  platform: "node",
  target: "node20",
  format: "cjs",
  sourcemap: true,
  outfile: "dist/index.js",
  external: ["@google-cloud/functions-framework"],
});
