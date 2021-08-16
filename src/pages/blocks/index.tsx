import { useEffect, useState } from 'react'
import { parseAge } from '../../utils'
import { useWhaleApiClient } from '@contexts/WhaleContext'
import { AdaptiveTable } from '@components/commons/AdaptiveTable'
import { Link } from '@components/commons/Link'

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

const largeNumberSymbols = ['K', 'M', 'B', 'T']

function convertToLargeNumberNotation (num: number): string {
  return num < 1000 ? num.toString() : getLargeNumberNotation(num / 1000, 0)
}

function getLargeNumberNotation (num: number, level: number): string {
  return num < 1000 ? `${num} ${largeNumberSymbols[level]}` : getLargeNumberNotation(num / 1000, level + 1)
}

export default function Blocks (): JSX.Element {
  const [blocks, setBlocks] = useState<Block[]>([])
  const [nextToken, setNextToken] = useState<string | undefined>(undefined)

  function renderBlocks (): JSX.Element[] {
    return blocks.map(block => (
      <AdaptiveTable.Row key={block.id}>
        <AdaptiveTable.Cell className='text-primary'>
          <Link href={{ pathname: `/blocks/${block.id}/transactions` }}>
            <a>{block.height}</a>
          </Link>
        </AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{parseAge(block.medianTime)}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{block.transactionCount}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{block.size}</AdaptiveTable.Cell>
        <AdaptiveTable.Cell>{convertToLargeNumberNotation(block.difficulty)}</AdaptiveTable.Cell>
      </AdaptiveTable.Row>
    ))
  }
  const api = useWhaleApiClient()

  async function fetchBlocks (next: string | undefined = undefined): Promise<void> {
    const res = await api.blocks.list(30, next)
    setNextToken(res.nextToken)
    setBlocks([...blocks, ...res])
  }

  useEffect(() => {
    fetchBlocks(nextToken).then(() => {}, () => {})
  }, [])

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='font-bold text-2xl'>Blocks</h1>
      <div className='my-6'>
        <AdaptiveTable>
          <AdaptiveTable.Header>
            <AdaptiveTable.Head className='uppercase'>height</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>age</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>transactions</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>size</AdaptiveTable.Head>
            <AdaptiveTable.Head className='uppercase'>difficulty</AdaptiveTable.Head>
          </AdaptiveTable.Header>
          {renderBlocks()}
        </AdaptiveTable>
      </div>
      {
        nextToken !== undefined &&
          <button
            className='text-primary'
            type='button'
            onClick={() => { fetchBlocks(nextToken).then(() => {}, () => {}) }}
          >
            Load more
          </button>
      }
    </div>
  )
}
