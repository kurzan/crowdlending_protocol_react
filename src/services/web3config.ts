import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { Chain, configureChains, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import { contractAbi } from "./abi";

const CONTRACT_ADDRESS: `0x${string}` = "0xD671AF87E6D8e1Da5F8aA0ad4fC0eBEE41b43eD2";

export const siberiumTestnet = {
  id: 111000,
  name: 'SiberiumTestnet',
  network: 'siberium-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Siberium',
    symbol: 'SIBR',
  },
  rpcUrls: {
    public: { http: ['https://rpc.test.siberium.net'] },
    default: { http: ['https://rpc.test.siberium.net'] },
  },
  blockExplorers: {
    etherscan: { name: 'Siberium Testnet Epxlorer', url: 'https://explorer.test.siberium.net/' },
    default: { name: 'Siberium Testnet Epxlorer', url: 'https://explorer.test.siberium.net/' },
  },
  contracts: {
  },
} as const satisfies Chain


export const { chains, provider, webSocketProvider } = configureChains(
  [
    siberiumTestnet,
  ],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: 'EarlyBird',
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

export const contract = {
  address: CONTRACT_ADDRESS,
  abi: contractAbi,
};