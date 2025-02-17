"use client";

import {
  useWallets,
  useConnectWallet,
  useSolanaWallets,
} from "@privy-io/react-auth";

export default function Home() {
  const { connectWallet } = useConnectWallet();
  const { wallets: ethereumWallets } = useWallets();
  const { wallets: solanaWallets } = useSolanaWallets();

  return (
    <div className="p-4">
      <button onClick={connectWallet}>connect</button>
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <ul>
          {solanaWallets.map((wallet) => {
            return (
              <li key={wallet.meta.id}>
                {wallet.meta.name} - {wallet.address}
                <button
                  onClick={() => {
                    wallet.disconnect();
                  }}
                >
                  disconnect
                </button>
              </li>
            );
          })}
          {ethereumWallets.map((wallet, index) => {
            return (
              <li
                key={wallet.meta.id}
                className={index === 0 ? "font-bold text-green-600" : ""}
              >
                {wallet.meta.name} - {wallet.address}
              </li>
            );
          })}
        </ul>
      </main>
    </div>
  );
}
