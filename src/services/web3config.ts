import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";
import { contractAbi } from "./abi";


// const CONTRACT_ADDRESS: `0x${string}` = "0x814C4A606dBd9eB52482311D2DCA0D563ABd6a23";

const CONTRACT_ADDRESS: `0x${string}` = "0xC33C21C126E32e785EAa3FFEbB8F2FC933B92d7A";

export const { chains, provider, webSocketProvider } = configureChains(
  [
    bscTestnet,
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