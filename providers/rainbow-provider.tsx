"use client"

import "@rainbow-me/rainbowkit/styles.css"
import {
  RainbowKitProvider,
  connectorsForWallets,
  darkTheme,
  getDefaultWallets,
} from "@rainbow-me/rainbowkit"
import { configureChains, createConfig, WagmiConfig } from "wagmi"
import { mainnet, sepolia } from "wagmi/chains"
import { publicProvider } from "wagmi/providers/public"
import {
  argentWallet,
  ledgerWallet,
  trustWallet,
} from "@rainbow-me/rainbowkit/wallets"
import { useMounted } from "@/hooks/useMounted"

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    // mainnet,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true" ? [sepolia] : []),
  ],
  [publicProvider()]
)

const projectId =
  process.env.NEXT_PUBLIC_WC_PROJECT_ID ?? "7c0651c51e871832437af6d02906bb39"

const appInfo = {
  appName: process.env.NEXT_PUBLIC_DAPP_NAME ?? "Dapp Template",
}

const { wallets } = getDefaultWallets({
  appName: appInfo.appName,
  projectId,
  chains,
})

const connectors = connectorsForWallets([
  ...wallets,
  {
    groupName: "Other",
    wallets: [
      argentWallet({ projectId, chains }),
      trustWallet({ projectId, chains }),
      ledgerWallet({ projectId, chains }),
    ],
  },
])

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
})

export function RainbowProvider({ children }: { children: React.ReactNode }) {
  const mounted = useMounted()

  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider
        chains={chains}
        appInfo={appInfo}
        theme={darkTheme({ borderRadius: "medium" })}
      >
        {mounted && children}
      </RainbowKitProvider>
    </WagmiConfig>
  )
}
