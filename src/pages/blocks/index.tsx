import { parseAge } from '../../utils'
import { TableHeader, TableBody } from '../../components/Table/index'
import Link from 'next/link'

interface BlocksPageProps {
  blocks: Block[]
}

interface Transaction {
  id: string
}

interface Block {
  height: number
  id: string
  time: string
  transactions: Transaction[]
  size: number
}

export default function Blocks (props: BlocksPageProps): JSX.Element {
  // dummy data
  const { blocks } = props

  function renderBlocks (): JSX.Element[] {
    return blocks.map(block => (
      <div className='blocks-table-row flex justify-between' key={block.time}>
        <div className='flex-1'>
          <Link href={`/blocks/${block.id}/transactions`}><a>{block.height}</a></Link>
        </div>
        <div className='flex-1'>{block.time}</div>
        <div className='flex-1 text-right'>{block.transactions.length}</div>
        <div className='flex-1 text-right'>{block.size}</div>
      </div>
    ))
  }

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

// async operation to dummy data
async function getBlocks (): Promise<Block[]> {
  return await new Promise((resolve): void => {
    const blocks = [
      { id: '101', height: 100, time: parseAge(1627288589), transactions: [], size: 1 },
      { id: '99', height: 99, time: parseAge(1627277303), transactions: [], size: 2 },
      { id: '98', height: 98, time: parseAge(1626079179), transactions: [], size: 3 },
      { id: '97', height: 97, time: parseAge(1595752871), transactions: [], size: 4 }
    ]
    setTimeout(() => {
      resolve(blocks)
    }, 200)
  })
}

export async function getServerSideProps (): Promise<{ props: BlocksPageProps }> {
  const blocks = await getBlocks()
  return { props: { blocks } }
}
