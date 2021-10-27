import { OverflowTable } from '@components/commons/OverflowTable'
import { Link } from '@components/commons/Link'
import { format, formatDistanceToNow, fromUnixTime } from 'date-fns'
import { AddressActivity } from '@defichain/whale-api-client/dist/api/address'
import { AddressVinVout } from '@components/address/[addressid]/AddressVinVout'
import { useState } from 'react'
import { MdExpand } from 'react-icons/md'
import { HoverPopover } from '@components/commons/popover/HoverPopover'

interface TransactionTableRowProps {
  addressId: string
  addressActivity: AddressActivity
}

export function AddressTransactionTableRow (props: TransactionTableRowProps): JSX.Element {
  const [expanded, setExpanded] = useState<boolean>(false)

  return (
    <>
      <OverflowTable.Row key={props.addressActivity.txid}>
        <OverflowTable.Cell sticky className='align-middle'>
          <div className='flex'>
            <div
              className='mr-4 my-auto cursor-pointer hidden md:inline-block'
              onClick={() => setExpanded(!expanded)}
            >
              <MdExpand size={22} />
            </div>
            <div className='w-24 md:w-40 lg:w-60 overflow-ellipsis overflow-hidden my-auto'>
              <Link href={{ pathname: `/transactions/${props.addressActivity.txid}` }}>
                <a className='hover:text-primary-500'>
                  {props.addressActivity.txid}
                </a>
              </Link>
            </div>
          </div>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <Link href={{ pathname: `/blocks/${props.addressActivity.block.height}` }}>
            <a className='hover:text-primary-500'>
              {props.addressActivity.block.height}
            </a>
          </Link>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <HoverPopover popover={format(fromUnixTime(props.addressActivity.block.medianTime), 'PPpp')}>
            <div className='cursor-help'>
              {formatDistanceToNow(props.addressActivity.block.medianTime * 1000)} ago
            </div>
          </HoverPopover>
        </OverflowTable.Cell>
        <OverflowTable.Cell>
          <div className='flex flex-row gap-x-2'>
            {props.addressActivity.type === 'vout' ? (
              <span className='bg-green-100 rounded text-xs px-2 py-1 font-medium h-6 w-min'>In</span>
            ) : (
              <span className='bg-red-100 rounded text-xs px-2 py-1 font-medium h-6 w-min'>Out</span>
            )}
            <div className='flex flex-row'>
              {props.addressActivity.value} DFI
            </div>
          </div>
        </OverflowTable.Cell>
      </OverflowTable.Row>
      <AddressVinVout addressId={props.addressId} txid={props.addressActivity.txid} expanded={expanded} />
    </>
  )
}
