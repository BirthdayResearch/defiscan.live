import { useSelector } from 'react-redux'
import { RootState } from '@store/index'
import NumberFormat from 'react-number-format'
import classNames from 'classnames'
import { HoverPopover } from '@components/commons/popover/HoverPopover'
import React from 'react'

export function HeaderCountBar (props: { className: string }): JSX.Element {
  const {
    count,
    tvl
  } = useSelector((state: RootState) => state.stats)

  function HeaderCount (props: { text: string, count?: number, className?: string }): JSX.Element {
    return (
      <li className={classNames(props.className, 'py-1')}>
        <span className='text-sm text-primary-100 font-medium'>{props.text} </span>
        <span className='text-sm text-white ml-0.5'>
          {props.count !== undefined ? (
            <NumberFormat value={props.count} displayType='text' thousandSeparator />
          ) : (
            '...'
          )}
        </span>
      </li>
    )
  }

  function HeaderAmount (props: { text: string, count?: number, className?: string }): JSX.Element {
    return (
      <li className={classNames(props.className, 'py-1')}>
        <span className='text-sm text-primary-100 font-medium'>{props.text} </span>
        <span className='text-sm text-white ml-0.5'>
          {props.count !== undefined ? (
            <NumberFormat
              value={props.count}
              displayType='text'
              decimalScale={0}
              thousandSeparator
              suffix=' USD'
            />
          ) : (
            '...'
          )}
        </span>
      </li>
    )
  }

  function PopoverTVL (): JSX.Element {
    function PopoverTVLAmount (props: { text: string, count?: number, className: string }): JSX.Element {
      return (
        <li className={classNames(props.className, 'flex justify-between')}>
          <span className='text-sm mr-4'>{props.text} </span>
          <span className='text-sm font-medium'>
            {props.count !== undefined ? (
              <NumberFormat
                value={props.count}
                displayType='text'
                decimalScale={0}
                thousandSeparator
                prefix='$'
              />
            ) : (
              '...'
            )}
          </span>
        </li>
      )
    }

    return (
      <div
        className='px-4 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
      >
        <PopoverTVLAmount className='py-1' text='DEX' count={tvl.dex} />
        <PopoverTVLAmount className='py-1' text='Masternode' count={tvl.masternodes} />
        <PopoverTVLAmount className='py-1' text='Loan' count={tvl.loan} />
        <PopoverTVLAmount className='py-1' text='Total' count={tvl.total} />
      </div>
    )
  }

  return (
    <ul className={classNames(props.className, 'flex flex-wrap space-x-6 overflow-hidden')}>
      <HeaderCount text='Blocks' count={count.blocks} />
      <HeaderCount text='Tokens' count={count.tokens} />
      <HeaderCount text='Masternodes' count={count.masternodes} />
      <HeaderCount text='Price Feeds' count={count.prices} />
      <HoverPopover popover={<PopoverTVL />}>
        <HeaderAmount className='cursor-help ' text='Total Value Locked' count={tvl.total} />
      </HoverPopover>
    </ul>
  )
}
