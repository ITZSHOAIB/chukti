import { getAddress, isAddress } from "viem";
import { ERROR_MESSAGES } from "../internal/utils/errorMessages.js";
import { getTestClient } from "./internal/getTestClient.js";

/** Parameters required for getting a test wallet address. */
export type GetTestWalletAddressParams = {
  /** The wallet address to set as the active test wallet address. */
  address?: string;
  /** The index of the wallet address to retrieve from the test client. */
  index?: number;
};

/**
 * Retrieves the test wallet address based on the provided parameters.
 *
 * This function returns a wallet address from the test client based on the
 * provided address or index. If both are provided, the index takes precedence.
 *
 * @param params {@link GetTestWalletAddressParams}
 *
 * @returns `0x${string}` The resolved wallet address.
 *
 * @example
 * import { getTestWalletAddress } from "chukti";
 *
 * const walletAddress = await getTestWalletAddress({ index: 0 });
 * console.log(walletAddress);
 *
 * @example
 * import { getTestWalletAddress } from "chukti";
 *
 * const walletAddress = await getTestWalletAddress({ address: "0x1234567890abcdef1234567890abcdef12345678" });
 * console.log(walletAddress);
 */
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
