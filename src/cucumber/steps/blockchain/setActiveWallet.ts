import { world } from "@cucumber/cucumber";
import { getTestWalletAddress } from "../../../viem/getTestWalletAddress.js";

/**
 * Sets the active test wallet address by the provided address.
 *
 * @param address - The address of the test wallet to set as active.
 *
 * @example
 * import { setActiveWalletByAddressStep } from "chukti";
 *
 * When("I set the active test wallet address to the address {string}", setActiveWalletByAddressStep);
 */
export const setActiveWalletByAddressStep = async (address: string) => {
  const testWallet = await getTestWalletAddress({ address });

  world.chukti.activeWalletAddress = testWallet;

  world.log(`Active test wallet address set to: ${testWallet}`);
};

/**
 * Sets the active test wallet address by the provided index.
 *
 * @param index - The index of the test wallet address to set as active.
 *
 * @example
 * import { setActiveWalletByIndexStep } from "chukti";
 *
 * When("I set the active test wallet address to the index {int}", setActiveWalletByIndexStep);
 */
export const setActiveWalletByIndexStep = async (index: number) => {
  const testWallet = await getTestWalletAddress({ index });

  world.chukti.activeWalletAddress = testWallet;

  world.log(
    `Active test wallet address set to address at index ${index}: ${testWallet}`,
  );
};

/**
 * Fetches the wallet address by the provided index
 * @param index- The index of the test wallet address to set as active.
 * 
 * @example
 * import { fetchWalletByIndexStep } from "chukti";
 * When("I fetch the wallet address at index {int}", fetchWalletByIndexStep);
 */

export const fetchWalletByIndexStep = async (index: number) => {
  const testWallet = await getTestWalletAddress({ index });

  // Log the fetched wallet without setting it as active
  world.log(`Fetched wallet address at index ${index}: ${testWallet}`);
};
