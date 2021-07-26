import { Fragment } from 'react'
import { parseAge } from '../utils'

export default function Blocks (): JSX.Element {
  const blocks = [
    { height: 100, time: parseAge(1627288589), transactions: ['', '', ''], size: 1 },
    { height: 99, time: parseAge(1627277303), transactions: ['', '', ''], size: 2 },
    { height: 98, time: parseAge(1626079179), transactions: ['', '', ''], size: 3 },
    { height: 97, time: parseAge(1595752871), transactions: [], size: 4 }
  ]

  const renderBlocks = (): JSX.Element[] => {
    return blocks.map(block => (
      <Fragment key={block.time}>
        <div>{block.height}</div>
        <div>{block.time}</div>
        <div className='justify-self-end'>{block.transactions.length}</div>
        <div className='justify-self-end'>{block.size}</div>
      </Fragment>
    ))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='grid w-screen md:w-2/3 grid-cols-4 gap-4'>
        <div>Height</div>
        <div>Age</div>
        <div>Transactions</div>
        <div className='justify-self-end'>Size</div>
      </div>
      <div className='grid grid-flow-row w-screen md:w-2/3 grid-cols-4 gap-4'>
        {renderBlocks()}
      </div>
    </div>
  )
}
