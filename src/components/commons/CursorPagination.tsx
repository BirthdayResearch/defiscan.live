import { Link } from '@components/commons/link/Link'
import { ApiPagedResponse } from '@defichain/whale-api-client'
import { last, takeRight } from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { PropsWithChildren } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

export interface CursorPage {
  n: number
  active: boolean
  cursors: string[]
}

interface CursorPaginationProps {
  className?: string
  pages: CursorPage[]
  path: `/${string}`
}

/**
 * To get next from Context
 * @example const next = CursorPagination.getNext(GetServerSidePropsContext)
 *
 * To get pages available from Context and next ApiPagedResponse
 * @example const pages = CursorPagination.getPages(GetServerSidePropsContext, ApiPagedResponse)
 *
 * To render the pagination
 * @example <CursorPaginationProps pages={pages} path='/...' />
 *
 * @param {CursorPaginationProps} props
 */
export function CursorPagination (props: CursorPaginationProps): JSX.Element {
  const pages = takeRight(props.pages, 3)
  const activeIndex = pages.findIndex(value => value.active)
  const prev = pages[activeIndex - 1]
  const next = pages[activeIndex + 1]

  return (
    <div className={props.className}>
      <div className='flex space-x-2'>
        <NavigateButton.Prev path={props.path} cursors={prev?.cursors}>
          <MdNavigateBefore className='h-6 w-6' />
        </NavigateButton.Prev>
        {pages.map(page => (
          <NumberButton key={page.n} path={props.path} {...page} />
        ))}
        <NavigateButton.Next path={props.path} cursors={next?.cursors}>
          <MdNavigateNext className='h-6 w-6' />
        </NavigateButton.Next>
      </div>
    </div>
  )
}

function NumberButton (props: CursorPage & { path: string }): JSX.Element {
  if (props.active) {
    return (
      <div className='bg-gray-50 dark:bg-gray-900 dark:border-gray-700 dark:text-dark-primary-500 rounded border border-primary-500 text-primary-500 cursor-not-allowed'>
        <div className='h-11 w-11 flex items-center justify-center'>
          <span className='font-medium'>{props.n}</span>
        </div>
      </div>
    )
  }

  return (
    <Link href={{ pathname: props.path, query: getQueryFromCursors(props.cursors) }}>
      <a className='bg-gray-50  rounded border border-gray-200 hover:border-primary-500 hover:text-primary-500 cursor-pointer dark:bg-gray-800 dark:border-0 dark:text-dark-gray-900'>
        <div className='h-11 w-11 flex items-center justify-center'>
          <span className='font-medium'>{props.n}</span>
        </div>
      </a>
    </Link>
  )
}

NavigateButton.Prev = (props: PropsWithChildren<{ path: string, cursors: string[] | undefined }>) => {
  return NavigateButton({ type: 'Prev', ...props })
}

NavigateButton.Next = (props: PropsWithChildren<{ path: string, cursors: string[] | undefined }>) => {
  return NavigateButton({ type: 'Next', ...props })
}

function NavigateButton (props: PropsWithChildren<{ path: string, cursors: string[] | undefined, type: 'Next' | 'Prev' }>): JSX.Element {
  if (props.cursors === undefined) {
    return (
      <div className='bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-600 opacity-40 cursor-not-allowed'>
        <div className='h-11 w-11 flex items-center justify-center'>
          {props.children}
        </div>
      </div>
    )
  }

  return (
    <Link href={{ pathname: props.path, query: getQueryFromCursors(props.cursors) }}>
      <a
        data-testid={`CursorPagination.${props.type}`}
        className='bg-gray-50 dark:bg-gray-800 rounded border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-dark-gray-900 hover:border-primary-500 hover:text-primary-500 cursor-pointer'
      >
        <div className='h-11 w-11 flex items-center justify-center'>
          {props.children}
        </div>
      </a>
    </Link>
  )
}

function getQueryFromCursors (cursors: string[]): Record<string, string> {
  if (cursors.length === 0) {
    return {}
  }

  return {
    cursors: cursors.join(',')
  }
}

function getCursorsFromContext (context: GetServerSidePropsContext): string[] {
  if (context.query.cursors !== undefined) {
    return (context.query.cursors as string).split(',')
  }
  return []
}

/**
 * @param {GetServerSidePropsContext} context to get the last next
 */
CursorPagination.getNext = (context: GetServerSidePropsContext): string | undefined => {
  return last(getCursorsFromContext(context))
}

/**
 * @param {GetServerSidePropsContext} context
 * @param {ApiPagedResponse} paged
 */
CursorPagination.getPages = (context: GetServerSidePropsContext, paged: ApiPagedResponse<any>): CursorPage[] => {
  const pages: CursorPage[] = [
    { n: 1, active: false, cursors: [] }
  ]

  for (const cursor of getCursorsFromContext(context)) {
    pages.push({
      n: pages.length + 1,
      active: false,
      cursors: [...last(pages)!.cursors, cursor]
    })
  }

  pages[pages.length - 1].active = true

  if (paged.nextToken !== undefined) {
    pages.push({
      n: pages.length + 1,
      active: false,
      cursors: [...last(pages)!.cursors, paged.nextToken]
    })
  }

  return pages
}
