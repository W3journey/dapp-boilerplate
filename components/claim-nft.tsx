"use client"

import { useState } from "react"
import Image from "next/image"
import Confetti from "react-dom-confetti"
import {
  useAccount,
  useContractRead,
  erc721ABI,
  useWaitForTransaction,
} from "wagmi"

import { Icons } from "@/components/icons"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Web3Button from "@/components/ui/web3button"
import { acmNftAbi } from "@/constants/acmNftabi"
import { acmNFTaddr } from "@/constants/contracts"

const ClaimNft = () => {
  const { address } = useAccount()
  const [txHash, setTxHash] = useState<`0x${string}`>()
  const [minted, setMinted] = useState(false)

  const tokenIdToMint = Math.floor(Math.random() * 100000)

  const {
    data: nftBalance,
    isLoading: isNftBalanceLoading,
    refetch: refetchNftBalance,
  } = useContractRead({
    address: acmNFTaddr,
    abi: erc721ABI,
    functionName: "balanceOf",
    enabled: Boolean(address),
    args: [address!],
  })

  const txReceipt = useWaitForTransaction({
    hash: txHash,
    onSuccess: () => {
      refetchNftBalance()
      setMinted(true)
    },
  })

  const onSuccess = (value: any) => {
    setTxHash(value.hash)
  }

  const onSubmit = () => {
    setMinted(false)
  }

  const onError = (e: Error) => {
    console.log("Error:", e)
  }

  return (
    <Card className="overflow-hidden text-white w-96 bg-gradient-to-br from-cyan-800 to-slate-950">
      <div className="relative overflow-hidden rounded-b-2xl w-96 h-72">
        <Image
          src={"/prism.jpg"}
          alt="NFT picture"
          fill
          sizes="33vw"
          className="object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle>Claim your free NFT</CardTitle>
        <CardDescription className="flex space-x-1">
          <span>You own:</span>
          <span>
            {isNftBalanceLoading ? (
              <Icons.spinner className="animate-spin" />
            ) : (
              nftBalance?.toString()
            )}
          </span>
          <span>NFTs</span>
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Web3Button
          contractAddress={acmNFTaddr}
          contractAbi={acmNftAbi}
          functionName="safeMint"
          args={[address, BigInt(tokenIdToMint)]}
          onSuccess={onSuccess}
          onSubmit={onSubmit}
          onError={onError}
        >
          Claim
        </Web3Button>
        <Confetti active={minted} />
      </CardFooter>
    </Card>
  )
}
export default ClaimNft
