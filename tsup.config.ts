import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/internal/cli/index.ts"],
    format: ["esm"],
    outDir: "dist/internal/cli",
    tsconfig: "tsconfig.json",
    dts: false,
    minify: true,
    bundle: true,
    treeshake: true,
  },
  {
    entry: ["src/**/*.ts", "!src/internal/cli/**/*.ts"],
    format: ["cjs", "esm"],
    tsconfig: "tsconfig.json",
    sourcemap: true,
    minify: true,
    dts: true,
    splitting: false,
    bundle: false,
    treeshake: true,
    plugins: [
      {
        // https://github.com/egoist/tsup/issues/953#issuecomment-2132576167
        // ensuring that all local requires in `.cjs` files import from `.cjs` files.
        // require('./path') → require('./path.cjs') in `.cjs` files
        name: "fix-cjs-require",
        renderChunk(_, { code }) {
          if (this.format === "cjs") {
            const regexCjs =
              /require\((?<quote>['"])(?<import>\.[^'"]+)\.js['"]\)/g;
            const regexEsm =
              /from(?<space>[\s]*)(?<quote>['"])(?<import>\.[^'"]+)\.js['"]/g;
            return {
              code: code
                .replace(regexCjs, "require($<quote>$<import>.cjs$<quote>)")
                .replace(regexEsm, "from$<space>$<quote>$<import>.cjs$<quote>"),
            };
          }
        },
      },
    ],
  },
]);
