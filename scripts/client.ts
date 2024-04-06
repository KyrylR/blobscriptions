import { privateKeyToAccount } from "viem/accounts";
import { createWalletClient, http, defineChain, createPublicClient } from "viem";

export const account = privateKeyToAccount(`0x${process.env.PRIVATE_KEY}`);

const mainnet = /*#__PURE__*/ defineChain({
  id: 1,
  name: "Ethereum",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: {
      http: [`https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`],
    },
  },
  blockExplorers: {
    default: {
      name: "Etherscan",
      url: "https://etherscan.io",
      apiUrl: "https://api.etherscan.io/api",
    },
  },
  contracts: {
    ensRegistry: {
      address: "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e",
    },
    ensUniversalResolver: {
      address: "0xce01f8eee7E479C928F8919abD53E553a36CeF67",
      blockCreated: 19_258_213,
    },
    multicall3: {
      address: "0xca11bde05977b3631167028862be2a173976ca11",
      blockCreated: 14_353_601,
    },
  },
});

export const client = createWalletClient({
  account,
  chain: mainnet,
  transport: http(),
});

export const publicClient = createPublicClient({
  chain: mainnet,
  transport: http(),
});
