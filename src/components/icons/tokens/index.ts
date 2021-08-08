import { IconBCH } from '@components/icons/tokens/IconBCH'
import { IconBTC } from '@components/icons/tokens/IconBTC'
import { IconDefault } from '@components/icons/tokens/IconDefault'
import { IconDFI } from '@components/icons/tokens/IconDFI'
import { IconDOGE } from '@components/icons/tokens/IconDOGE'
import { IconETH } from '@components/icons/tokens/IconETH'
import { IconLTC } from '@components/icons/tokens/IconLTC'
import { IconUSDC } from '@components/icons/tokens/IconUSDC'
import { IconUSDT } from '@components/icons/tokens/IconUSDT'
import { IconUTXO } from '@components/icons/tokens/IconUTXO'
import { SVGProps } from 'react'

const mapping: Record<string, (props: SVGProps<SVGSVGElement>) => JSX.Element> = {
  BCH: IconBCH,
  BTC: IconBTC,
  DFI: IconDFI,
  DOGE: IconDOGE,
  ETH: IconETH,
  LTC: IconLTC,
  USDT: IconUSDT,
  _UTXO: IconUTXO,
  USDC: IconUSDC
}

/**
 * ```ts
 * const Icon = getTokenIcon('DFI')
 *
 * return (
 *  <Icon />
 * )
 * ```
 *
 * TODO(@defich): move assets into it's own repo where anyone can create pull request into.
 *  Following a vector specification guideline, this allows anyone to create PR into that repo.
 *
 * @param {string} symbol of the assets
 */
export function getTokenIcon (symbol: string): (props: SVGProps<SVGSVGElement>) => JSX.Element {
  const Icon = mapping[symbol]
  if (Icon === undefined) {
    return IconDefault(symbol)
  }
  return Icon
}
