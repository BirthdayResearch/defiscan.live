export interface MasternodeData {
  id: string
  state: MasternodeState
  mintedBlocks: number
  owner: {
    address: string
  }
  operator: {
    address: string
  }
  creation: {
    height: number
  }
  resign: {
    tx: string
    height: number
  }
}

export enum MasternodeState {
  PRE_ENABLED = 'PRE_ENABLED',
  ENABLED = 'ENABLED',
  PRE_RESIGNED = 'PRE_RESIGNED',
  RESIGNED = 'RESIGNED',
  PRE_BANNED = 'PRE_BANNED',
  BANNED = 'BANNED',
  UNKNOWN = 'UNKNOWN'
}
