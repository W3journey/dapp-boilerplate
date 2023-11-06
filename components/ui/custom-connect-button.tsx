"use client"

import Image from "next/image"
import { ChevronDown } from "lucide-react"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { generateAvatarURL } from "@cfx-kit/wallet-avatar"

import { Button, ButtonProps } from "@/components/ui/button"

interface CustomConnectButtonProps extends ButtonProps {
  label?: string
  showBalance?: boolean
  chainStatus?: "full" | "icon" | "name" | "none"
  avatar?: boolean
}

export const CustomConnectButton: React.FC<CustomConnectButtonProps> = ({
  label = "Connect Wallet",
  showBalance = true,
  chainStatus = "full",
  avatar,
  variant = "default",
  ...buttonProps
}) => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading"
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated")

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <Button
                    onClick={openConnectModal}
                    className="font-semibold bg-blue-500"
                    {...buttonProps}
                  >
                    {label}
                  </Button>
                )
              }

              if (chain.unsupported) {
                return (
                  <Button
                    onClick={openChainModal}
                    type="button"
                    className="font-semibold"
                    variant={"destructive"}
                    {...buttonProps}
                  >
                    Wrong network
                    <ChevronDown />
                  </Button>
                )
              }

              return (
                <div className="flex gap-3">
                  {chainStatus !== "none" && (
                    <Button
                      onClick={openChainModal}
                      className="flex items-center px-2 font-semibold"
                      variant={variant}
                      {...buttonProps}
                    >
                      {chain.hasIcon && chainStatus !== "name" && (
                        <div
                          className={`w-5 h-5 rounded-full overflow-hidden mr-1 bg-['url(${chain.iconBackground})']`}
                        >
                          {chain.iconUrl && (
                            <Image
                              src={chain.iconUrl}
                              alt={chain.name ?? "Chain icon"}
                              width={20}
                              height={20}
                            />
                          )}
                        </div>
                      )}
                      {chainStatus !== "icon" && chain.name}
                      <ChevronDown />
                    </Button>
                  )}

                  <Button
                    onClick={openAccountModal}
                    className="gap-1 font-semibold"
                    variant={variant}
                    {...buttonProps}
                  >
                    {avatar && (
                      <Image
                        src={generateAvatarURL(account.address)}
                        alt="Avatar"
                        width={25}
                        height={25}
                        className="rounded-full mr-1"
                      />
                    )}
                    <span>{account.displayName}</span>
                    <span>
                      {showBalance && account.displayBalance
                        ? ` (${account.displayBalance})`
                        : ""}
                    </span>
                    <ChevronDown />
                  </Button>
                </div>
              )
            })()}
          </div>
        )
      }}
    </ConnectButton.Custom>
  )
}
