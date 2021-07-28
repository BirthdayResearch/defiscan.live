export interface TokenData {
  id: string
  symbol: string
  symbolKey: string
  name: string
  decimal: number
  limit: string
  mintable: boolean
  tradeable: boolean
  isDAT: boolean
  isLPS: boolean
  finalized: boolean
  minted: string
  creation: { tx: string, height: number }
  destruction: { tx: string, height: number }
  collateralAddress: string
}
