import { useEffect, useState } from 'react'
import { parseAge } from '../../utils'
import { TableHeader, TableBody } from '../../components/Table/index'
import { useWhaleApiClient } from '@contexts'
import Link from 'next/link'

export interface Block {
  id: string
  hash: string
  previousHash: string

  height: number
  version: number
  time: number
  medianTime: number

  transactionCount: number

  difficulty: number

  masternode: string
  minter: string
  minterBlockCount: number

  stakeModifier: string
  merkleroot: string

  size: number
  sizeStripped: number
  weight: number
}

export default function Blocks (): JSX.Element {
  const [blocks, setBlocks] = useState<Block[]>([])

  function renderBlocks (): JSX.Element[] {
    return blocks.map(block => (
      <div className='blocks-table-row flex justify-between' key={block.time}>
        <div className='flex-1'>
          <Link href={`/blocks/${block.id}/transactions`}><a>{block.height}</a></Link>
        </div>
        <div className='flex-1'>{parseAge(block.time)}</div>
        <div className='flex-1 text-right'>{block.transactionCount}</div>
        <div className='flex-1 text-right'>{block.size}</div>
      </div>
    ))
  }
  const api = useWhaleApiClient()

  const next = undefined

  async function fetchBlocks (): Promise<void> {
    const res = await api.blocks.list(30, next)
    setBlocks(res)
  }

  useEffect(() => {
    fetchBlocks().then(() => {}, () => {})
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <TableHeader className='justify-between w-screen md:w-2/3'>
        <div className='flex-1'>Height</div>
        <div className='flex-1'>Age</div>
        <div className='flex-1 text-right'>Transactions</div>
        <div className='flex-1 text-right'>Size</div>
      </TableHeader>
      <TableBody className='w-screen md:w-2/3'>
        {renderBlocks()}
      </TableBody>
    </div>
  )
}
