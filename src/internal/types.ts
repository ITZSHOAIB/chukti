/**
 * Type representing the supported project types in Chukti.
 */
export type ProjectType = "hardhat-viem" | "forge-anvil";

/**
 * Type representing the configuration for a Chukti project.
 *
 * @property projectType {@link ProjectType} - The type of project being initialized.
 *
 */
export type ChuktiConfig = {
  projectType: ProjectType;
};

/**
 * Type representing the possible transaction statuses.
 * @readonly
 */
export const TxnStatus = {
  success: "success",
  reverted: "reverted",
} as const;

/**
 * Type representing the possible transaction statuses.
 */
export type TxnStatusType = keyof typeof TxnStatus;
