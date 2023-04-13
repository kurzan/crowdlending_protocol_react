import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";
import { contractAbi } from "./abi";


const CONTRACT_ADDRESS: `0x${string}` = "0x814C4A606dBd9eB52482311D2DCA0D563ABd6a23";

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