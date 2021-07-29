import { parseAge } from '../utils'

export default function Blocks (): JSX.Element {
  // dummy data
  const blocks = [
    { height: 100, time: parseAge(1627288589), transactions: ['', '', ''], size: 1 },
    { height: 99, time: parseAge(1627277303), transactions: ['', '', ''], size: 2 },
    { height: 98, time: parseAge(1626079179), transactions: ['', '', ''], size: 3 },
    { height: 97, time: parseAge(1595752871), transactions: [], size: 4 }
  ]

  const renderBlocks = (): JSX.Element[] => {
    return blocks.map(block => (
      <div className='blocks-table-row flex justify-between' key={block.time}>
        <div className='flex-1'>{block.height}</div>
        <div className='flex-1'>{block.time}</div>
        <div className='flex-1 text-right'>{block.transactions.length}</div>
        <div className='flex-1 text-right'>{block.size}</div>
      </div>
    ))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='blocks-table-header flex justify-between w-screen md:w-2/3 grid-cols-4 gap-4'>
        <div className='flex-1'>Height</div>
        <div className='flex-1'>Age</div>
        <div className='flex-1 text-right'>Transactions</div>
        <div className='flex-1 text-right'>Size</div>
      </div>
      <div className='block-table-body flex flex-col w-screen md:w-2/3 grid-cols-4 gap-4'>
        {renderBlocks()}
      </div>
    </div>
  )
}
