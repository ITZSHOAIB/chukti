import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";

const external = [...Object.keys(require("./package.json").dependencies || {})];

const commonPlugins = [resolve(), commonjs(), json(), terser()];

export default [
  {
    input: "src/index.ts",
    output: [
      {
        file: "dist/index.cjs",
        format: "cjs",
      },
      {
        file: "dist/index.mjs",
        format: "esm",
      },
    ],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: "tsconfig.json",
        exclude: ["node_modules", "dist", "src/internal/cli/**/*.ts"],
      }),
    ],
    external,
  },
  // CLI configuration
  {
    input: "src/internal/cli/index.ts",
    output: [
      {
        file: "dist/cli.mjs",
        format: "esm",
      },
    ],
    plugins: [
      ...commonPlugins,
      typescript({
        tsconfig: "./tsconfig.json",
        compilerOptions: {
          declaration: false,
          declarationMap: false,
          declarationDir: null,
        },
      }),
    ],
    external,
  },
];
