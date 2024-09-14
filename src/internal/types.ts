/**
 * Enum representing the different types of projects that can be initialized.
 *
 * - HardhatViem: A TypeScript project with Hardhat + Viem.
 * - ForgeAnvil: A TypeScript project with Forge + Anvil.
 */
export enum ProjectType {
  HardhatViem = "hardhat-viem",
  ForgeAnvil = "forge-anvil",
}

/**
 * Interface representing the configuration for a Chukti project.
 *
 * @property {ProjectType} projectType - The type of project being initialized.
 */
export interface ChuktiConfig {
  projectType: ProjectType;
}
