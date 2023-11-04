"use client"

import { useState } from "react"
import {
  useAccount,
  useContractWrite,
  useNetwork,
  useSwitchNetwork,
} from "wagmi"
import { Abi, Narrow, parseEther } from "viem"
import { WriteContractResult } from "wagmi/actions"

import { Icons } from "@/components/icons"
import { Button } from "@/components/ui/button"
import { CustomConnectButton } from "@/components/ui/custom-connect-button"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface Web3ButtonProps {
  contractAddress: `0x${string}`
  contractAbi: Narrow<readonly unknown[] | Abi>
  functionName: string
  args?: any[]
  value?: string
  onSuccess?: (result: WriteContractResult) => void
  onError?: (error: Error) => void
  onSubmit?: () => void
  popoverSide?: "top" | "right" | "bottom" | "left"
  popoverContent?: string
  disablePopover?: boolean
  className?: string
  children?: React.ReactNode
}

const Web3Button = ({
  contractAddress,
  contractAbi,
  functionName,
  args,
  value,
  onSuccess,
  onError,
  onSubmit,
  popoverSide = "top",
  popoverContent = "Confirm in Wallet",
  disablePopover = false,
  className,
  children,
}: Web3ButtonProps) => {
  const [confirmStatus, setConfirmStatus] = useState<"idle" | "waiting">("idle")
  const { isConnected } = useAccount()
  const { chain } = useNetwork()

  const isWaiting = confirmStatus === "waiting"

  const { write } = useContractWrite({
    address: contractAddress,
    abi: contractAbi,
    functionName: functionName,
    onMutate: () => {
      onSubmit && onSubmit()
      setConfirmStatus("waiting")
    },
    onSettled: (data, error) => {
      if (onSuccess && data) {
        onSuccess(data)
      }
      if (onError && error) {
        onError(error)
      }
      setConfirmStatus("idle")
    },
  })

  const action = () => {
    write?.({
      args: args,
      value: value ? parseEther(value) : undefined,
    })
  }

  if (!isConnected || chain?.unsupported) {
    return <CustomConnectButton className={className} />
  }

  return (
    <Popover open={isWaiting && !disablePopover}>
      <PopoverTrigger asChild>
        <Button onClick={action} className={className}>
          {isWaiting ? (
            <Icons.spinner className="mx-2 animate-spin" />
          ) : (
            <span>{children}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="py-2 bg-popover-foreground text-primary-foreground w-fit"
        side={popoverSide}
      >
        {popoverContent}
      </PopoverContent>
    </Popover>
  )
}
export default Web3Button
