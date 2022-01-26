/* eslint @typescript-eslint/quotes: 0 */

import _ from 'lodash'
import { GetServerSidePropsContext } from 'next'
import { getEnvironment } from '@contexts/Environment'

export interface EventCopy {
  /**
   * Block Height
   * @example ''
   */
  height: string

  /**
   * URL slug of event (No Spaces)
   */
  slug: string

  /**
   * Name of event
   */
  name: string

  /**
   * Name of event
   */
  network: string
}

export const EVENTS: Record<string, EventCopy> = {
  testEvent: {
    height: '99999999',
    slug: 'testEvent',
    name: 'Test Event',
    network: 'MainNet'
  }
}

export function getEventCopy (id: string, context: GetServerSidePropsContext): EventCopy | undefined {
  const network = context.query.network?.toString() ?? getEnvironment().networks[0]

  if (EVENTS[id] !== undefined && EVENTS[id].network === network) {
    return EVENTS[id]
  }

  const event = _.find(EVENTS, ['height', id])
  if (event !== undefined && event.network === network) {
    return event
  }

  return undefined
}
