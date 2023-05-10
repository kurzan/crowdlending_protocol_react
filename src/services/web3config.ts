import "@rainbow-me/rainbowkit/styles.css";
import { getDefaultWallets } from "@rainbow-me/rainbowkit";
import { configureChains, createClient } from "wagmi";
import { bscTestnet } from 'wagmi/chains';
import { publicProvider } from "wagmi/providers/public";
import { contractAbi } from "./abi";


const CONTRACT_ADDRESS: `0x${string}` = "0x37a21089a83DD3F949f800D82DD9e23e5715A896";

// const CONTRACT_ADDRESS: `0x${string}` = "0x05f68EFc41e0ecb5c025e87c40333153E71C0863";


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