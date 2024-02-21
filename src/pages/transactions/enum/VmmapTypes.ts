export interface VmmapResult {
  input: string;
  type: string;
  output: string;
}

export enum VmmapTypes {
  Auto = 0,
  BlockNumberDVMToEVM = 1,
  BlockNumberEVMToDVM = 2,
  BlockHashDVMToEVM = 3,
  BlockHashEVMToDVM = 4,
  TxHashDVMToEVM = 5,
  TxHasEVMToDVM = 6,
}
