import React from 'react'
import { CardList } from '@components/commons/CardList'
import { MasternodeData, MasternodeState } from '@defichain/whale-api-client/dist/api/masternodes'
import { TextTruncate } from '@components/commons/text/TextTruncate'
import { AddressLink } from '@components/commons/link/AddressLink'
import ReactNumberFormat from 'react-number-format'

export function MasternodeCards ({ masternodes }: { masternodes: MasternodeData[] }): JSX.Element {
  return (
    <CardList>
      {masternodes.map(masternode => {
        return (
          <MasternodeCard
            masternode={masternode}
            key={masternode.id}
          />
        )
      })}
    </CardList>
  )
}

function MasternodeCard ({ masternode }: { masternode: MasternodeData }): JSX.Element {
  return (
    <CardList.Card testId='MasternodeCard'>
      <CardList.Header>
        <div>
          <span className='text-sm text-gray-400'>Owner</span>
          <div className='text-gray-900'>
            <AddressLink address={masternode.owner.address}>
              <TextTruncate text={masternode.owner.address} className='w-44 font-medium' />
            </AddressLink>
          </div>
        </div>
      </CardList.Header>

      <CardList.List>
        <CardList.ListItem
          title='Operator'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.Operator'
        >
          <AddressLink address={masternode.operator.address}>
            <TextTruncate text={masternode.operator.address} />
          </AddressLink>
        </CardList.ListItem>

        <CardList.ListItem
          title='Creation Height'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.CreationHeight'
        >
          <ReactNumberFormat
            value={masternode.creation.height}
            fixedDecimalScale
            displayType='text'
            thousandSeparator=','
          />
        </CardList.ListItem>

        <CardList.ListItem
          title='Resign Height'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.ResignHeight'
        >
          {masternode.resign?.height !== undefined ? (
            <ReactNumberFormat
              value={masternode.resign?.height}
              fixedDecimalScale
              displayType='text'
              thousandSeparator=','
            />
          ) : (
            <>-</>
          )}
        </CardList.ListItem>

        <CardList.ListItem
          title='Minted Blocks'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.MintedBlocks'
        >
          <ReactNumberFormat
            value={masternode.mintedBlocks}
            fixedDecimalScale
            thousandSeparator=','
            displayType='text'
          />
        </CardList.ListItem>

        <CardList.ListItem
          title='State'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.State'
        >
          {(() => {
            switch (masternode.state) {
              case MasternodeState.PRE_ENABLED:
                return 'Pre-Enabled'
              case MasternodeState.ENABLED:
                return 'Enabled'
              case MasternodeState.PRE_RESIGNED:
                return 'Pre-Resigned'
              case MasternodeState.RESIGNED:
                return 'Resigned'
              case MasternodeState.PRE_BANNED:
                return 'Pre-Banned'
              case MasternodeState.BANNED:
                return 'Banned'
              default:
                return masternode.state
            }
          })()}
        </CardList.ListItem>

        <CardList.ListItem
          title='Time Lock'
          titleClassNames='text-sm'
          testId='BlocksCard.CardList.TimeLock'
        >
          {(() => {
            switch (masternode.timelock) {
              case 0:
                return <div>0 Yrs</div>
              case 260:
                return <div>5 Yrs</div>
              case 520:
                return <div>10 Yrs</div>
              default:
                return <div>{masternode.timelock} Weeks</div>
            }
          })()}
        </CardList.ListItem>
      </CardList.List>
    </CardList.Card>
  )
}
