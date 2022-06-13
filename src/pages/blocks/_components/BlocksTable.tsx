import NumberFormat from 'react-number-format'
import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/link/Link'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { useAge } from '../../../hooks/useAge'

export function BlocksTable ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <OverflowTable>
      <OverflowTable.Header>
        <OverflowTable.Head title='Height' sticky />
        <OverflowTable.Head title='Age' />
        <OverflowTable.Head title='Transactions' />
        <OverflowTable.Head title='Minter' />
        <OverflowTable.Head title='Size (B)' />
        <OverflowTable.Head title='Difficulty' />
      </OverflowTable.Header>

      {blocks.map(block => (
        <Link href={{ pathname: `/blocks/${block.height}` }} key={block.height}>
          <a className='contents'>
            <BlockRow block={block} />
          </a>
        </Link>
      ))}
    </OverflowTable>
  )
}

function BlockRow ({ block }: { block: Block }): JSX.Element {
  const age = useAge(block.medianTime)
  return (
    <OverflowTable.Row className='hover:text-primary-500 dark:hover:text-gray-100'>
      <OverflowTable.Cell sticky>
        <NumberFormat
          value={block.height}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
          className='dark:text-gray-100'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='dark:text-gray-100'>
        {age}
      </OverflowTable.Cell>
      <OverflowTable.Cell className='dark:text-gray-100'>{block.transactionCount}</OverflowTable.Cell>
      <OverflowTable.Cell className='dark:text-gray-100'>
        <TextTruncate text={block.minter} />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='dark:text-gray-100'>
        <NumberFormat
          value={block.size}
          fixedDecimalScale
          thousandSeparator=','
          displayType='text'
        />
      </OverflowTable.Cell>
      <OverflowTable.Cell className='dark:text-gray-100'>
        <UnitSuffix
          value={block.difficulty}
          units={{
            3: 'K',
            6: 'M',
            9: 'G',
            12: 'T'
          }}
        />
      </OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
