"use client";

import { base, mainnet } from "wagmi/chains";
import { PrivyProvider, WalletListEntry } from "@privy-io/react-auth";
import { http, createConfig, WagmiProvider } from "wagmi";
import { toSolanaWalletConnectors } from "@privy-io/react-auth/solana";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  metaMask,
  injected,
  walletConnect,
  coinbaseWallet,
} from "wagmi/connectors";

const solanaConnectors = toSolanaWalletConnectors({
  // By default, shouldAutoConnect is enabled
  shouldAutoConnect: true,
});

const queryClient = new QueryClient();

const projectId = "ecf05e6e910a7006159c69f03dafbaeb";

export const config = createConfig({
  chains: [mainnet, base],
  connectors: [
    injected(),
    metaMask(),
    coinbaseWallet(),
    walletConnect({ projectId }),
  ],
  transports: {
    [mainnet.id]: http(
      "https://eth-mainnet.g.alchemy.com/v2/YViRFlzFSftOMSgTV6oTNTOcDH3EnD2a" // demo key
    ),
    [base.id]: http(
      "https://base-mainnet.g.alchemy.com/v2/YViRFlzFSftOMSgTV6oTNTOcDH3EnD2a" // demo key
    ),
  },
});

const needsInjectedWalletFallback = false;

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <PrivyProvider
          appId="cm1k78nl101dtqj2bcs76kzab" // test app id
          config={{
            appearance: {
              theme: "light",
              accentColor: "#676FFF",
              logo: "https://your-logo-url",
              walletChainType: "ethereum-and-solana",
              walletList: [
                // order is display order in UI
                "coinbase_wallet",
                "metamask",
                "phantom",
                "rainbow",
                "rabby_wallet",
                "backpack",
                "zerion",
                "wallet_connect",
                ...(needsInjectedWalletFallback
                  ? ["detected_ethereum_wallets" as WalletListEntry]
                  : []),
              ],
            },
            embeddedWallets: {
              createOnLogin: "users-without-wallets",
            },
            externalWallets: { solana: { connectors: solanaConnectors } },
          }}
        >
          {children}
        </PrivyProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
