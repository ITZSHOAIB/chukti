import { getAddress, isAddress } from "viem";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";
import { getTestClient } from "./internal/getTestClient.js";

export interface GetTestWalletAddressParams {
  address?: string;
  index?: number;
}

export const getTestWalletAddress = async ({
  address,
  index,
}: GetTestWalletAddressParams): Promise<`0x${string}`> => {
  const testClient = getTestClient();
  const addresses = await testClient.getAddresses();

  if (index !== undefined && index !== null) {
    if (index < 0 || index >= addresses.length) {
      throw new Error(
        ERROR_MESSAGES.INVALID_WALLET_ADDRESS_INDEX(
          index,
          addresses.length - 1,
        ),
      );
    }

    address = addresses[index];
  }

  if (!address || !isAddress(address) || !addresses.includes(address)) {
    throw new Error(ERROR_MESSAGES.INVALID_WALLET_ADDRESS(address || "EMPTY"));
  }

  return getAddress(address);
};
