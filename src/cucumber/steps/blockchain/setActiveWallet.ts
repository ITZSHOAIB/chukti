import { world } from "@cucumber/cucumber";
import { getTestWalletAddress } from "../../../viem/getTestWalletAddress.js";

export const setActiveWalletByAddressStep = async (address: string) => {
  const testWallet = await getTestWalletAddress({ address });

  world.chukti.activeWalletAddress = testWallet;

  world.log(`Active test wallet address set to: ${testWallet}`);
};

export const setActiveWalletByIndexStep = async (index: number) => {
  const testWallet = await getTestWalletAddress({ index });

  world.chukti.activeWalletAddress = testWallet;

  world.log(
    `Active test wallet address set to address at index ${index}: ${testWallet}`,
  );
};
