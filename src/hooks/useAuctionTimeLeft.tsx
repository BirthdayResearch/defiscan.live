import { NetworkConnection, useNetwork } from '@contexts/NetworkContext'
import BigNumber from 'bignumber.js'

interface AuctionTimeLeft {
  timeRemaining: string | undefined
  blocksRemaining: number
  blocksPerAuction: number
}

export function useAuctionTimeLeft (liquidationHeight: number, blockCount: number): AuctionTimeLeft {
  const network = useNetwork().connection
  const blocksPerAuction = network === NetworkConnection.MainNet || network === NetworkConnection.TestNet ? 720 : 36
  const blocksRemaining = BigNumber.max(liquidationHeight - blockCount, 0).toNumber()

  return {
    timeRemaining: (blocksRemaining > 0) ? secondsToHm(blocksRemaining * 30) : undefined,
    blocksRemaining,
    blocksPerAuction
  }
}

export function secondsToHm (d: number): string {
  const h = Math.floor(d / 3600)
  const m = Math.floor(d % 3600 / 60)
  const hDisplay = h > 0 ? `${h} hr` : '0 hr'
  const mDisplay = m >= 0 ? `${m.toString().padStart(2, '0')} mins` : ''
  return `${hDisplay} ${mDisplay}`
}
