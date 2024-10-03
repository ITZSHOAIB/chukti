import type { ChuktiConfig } from "./internal/types.js";

/**
 * Defines the configuration for the Chukti.
 *
 * This function defines the configuration for the Chukti. It returns the
 * configuration object.
 *
 * @param config - The configuration object for the Chukti.
 *
 * @returns The configuration object for the Chukti.
 *
 * @example
 * import { defineConfig } from "chukti";
 *
 * const config = defineConfig({
 * projectType: "hardhat-viem"
 * });
 */
export const defineConfig = (config: ChuktiConfig): ChuktiConfig => {
  return config;
};
