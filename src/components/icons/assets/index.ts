import { _Default } from '@components/icons/assets/_Default'
import { BTC } from '@components/icons/assets/BTC'
import { dBCH } from '@components/icons/assets/dBCH'
import { dBTC } from '@components/icons/assets/dBTC'
import { dDFI } from '@components/icons/assets/dDFI'
import { dDOGE } from '@components/icons/assets/dDOGE'
import { dETH } from '@components/icons/assets/dETH'
import { DFI } from '@components/icons/assets/DFI'
import { dLTC } from '@components/icons/assets/dLTC'
import { dUSDC } from '@components/icons/assets/dUSDC'
import { dUSDT } from '@components/icons/assets/dUSDT'
import { SVGProps } from 'react'

const mapping: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  BTC: BTC,
  DFI: DFI,
  dBCH: dBCH,
  dBTC: dBTC,
  dDFI: dDFI,
  dDOGE: dDOGE,
  dETH: dETH,
  dLTC: dLTC,
  dUSDT: dUSDT,
  dUSDC: dUSDC
}

/**
 * ```ts
 * const Icon = getTokenIcon('DFI')
 * const dIcon = getTokenIcon('dDOGE')
 *
 * return (
 *  <dIcon />
 * )
 * ```
 *
 * TODO(@defich): move assets into it's own repo where anyone can create pull request into.
 *  Following a vector specification guideline, this allows anyone to create PR into that repo.
 *
 * @param {string} symbol of the asset icon
 * @return {(props: SVGProps<SVGSVGElement>) => JSX.Element}
 */
export function getAssetIcon (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  return getNativeIcon(`d${symbol}`)
}

/**
 * @param {string} symbol of the native asset icon
 * @return {(props: SVGProps<SVGSVGElement>) => JSX.Element}
 */
export function getNativeIcon (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  const Icon = mapping[symbol]
  if (Icon === undefined) {
    return _Default(symbol)
  }
  return Icon
}
