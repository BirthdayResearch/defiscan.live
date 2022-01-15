import { _Default } from '@components/icons/assets/tokens/_Default'
import { dBCH } from './dBCH'
import { dBTC } from './dBTC'
import { BTC } from './BTC'
import { BCH } from './BCH'
import { LTC } from './LTC'
import { dDFI } from './dDFI'
import { dDOGE } from './dDOGE'
import { dETH } from './dETH'
import { DFI } from './DFI'
import { dLTC } from './dLTC'
import { dUSDC } from './dUSDC'
import { dUSDT } from './dUSDT'
import { DUSD } from './DUSD'
import { SVGProps } from 'react'
import { USDT } from '@components/icons/assets/tokens/USDT'
import { USDC } from '@components/icons/assets/tokens/USDC'
import { ETH } from '@components/icons/assets/tokens/ETH'
import { DOGE } from '@components/icons/assets/tokens/DOGE'
import { _TokenDefault } from './_TokenDefault'

const mapping: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  _UTXO: DFI,
  DFI: DFI,
  'DFI (UTXO)': DFI,
  'DFI (Token)': dDFI,
  BTC: BTC,
  BCH: BCH,
  LTC: LTC,
  USDT: USDT,
  USDC: USDC,
  ETH: ETH,
  DOGE: DOGE,
  dBCH: dBCH,
  dBTC: dBTC,
  dDFI: dDFI,
  dDOGE: dDOGE,
  dETH: dETH,
  dLTC: dLTC,
  dUSDT: dUSDT,
  dUSDC: dUSDC,
  dDUSD: DUSD,
  DUSD: DUSD
}

// TODO(@defich): move assets into it's own repo where anyone can create pull request into.
//  Following a vector specification guideline, this allows anyone to create PR into that repo.

/**
 * @param {string} symbol of the asset icon
 * @return {(props: SVGProps<SVGSVGElement>) => JSX.Element}
 */
export function getAssetIcon (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  const Icon = mapping[`d${symbol}`]
  if (Icon === undefined) {
    return _TokenDefault(symbol)
  }
  return Icon
}

/**
 * @param {string} symbol of the token icon, AKA DCT
 * @return {(props: SVGProps<SVGSVGElement>) => JSX.Element}
 */
export function getTokenIcon (symbol: string): (props: { className: string }) => JSX.Element {
  return _Default(symbol)
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
