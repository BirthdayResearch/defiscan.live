import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { CardList } from '@components/commons/CardList'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { UnitSuffix } from '@components/commons/UnitSuffix'
import NumberFormat from 'react-number-format'
import { useAge } from '../../../hooks/useAge'

export function BlocksCards ({ blocks }: { blocks: Block[] }): JSX.Element {
  return (
    <CardList>
      {blocks.map(block => {
        return (
          <BlocksCard
            block={block}
            key={block.hash}
          />
        )
      })}
    </CardList>
  )
}

export function BlocksCard ({ block }: { block: Block }): JSX.Element {
  const age = useAge(block.medianTime)
  return (
    <CardList.Card testId='BlocksCard'>
      <CardList.Header path={`/blocks/${block.height}`}>
        <div>
          <span className='text-sm dark:text-gray-100'>Height</span>
          <div className='font-medium text-gray-900 dark:text-gray-400'>
            <NumberFormat
              value={block.height}
              fixedDecimalScale
              thousandSeparator=','
              displayType='text'
            />
          </div>
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title='Age'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Age'
        >
          {age}
        </CardList.ListItem>

        <CardList.ListItem
          title='Transactions'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Transactions'
        >
          {block.transactionCount}
        </CardList.ListItem>

        <CardList.ListItem
          title='Minter'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Minter'
        >
          <TextTruncate text={block.minter} />
        </CardList.ListItem>

        <CardList.ListItem
          title='Size (B)'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Size'
        >
          <NumberFormat
            value={block.size}
            fixedDecimalScale
            thousandSeparator=','
            displayType='text'
          />
        </CardList.ListItem>

        <CardList.ListItem
          title='Difficulty'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Difficulty'
        >
          <UnitSuffix
            value={block.difficulty}
            units={{
              3: 'K',
              6: 'M',
              9: 'G',
              12: 'T'
            }}
          />
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  )
}
