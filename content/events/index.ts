/* eslint @typescript-eslint/quotes: 0 */

import _ from 'lodash'

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
}

export const EVENTS: Record<string, EventCopy> = {
  testEvent: {
    height: '99999999',
    slug: 'testEvent',
    name: 'Test Event'
  }
}

export function getEventCopy (id: string): EventCopy | undefined {
  if (EVENTS[id] !== undefined) {
    return EVENTS[id]
  }

  const height = _.find(EVENTS, ['height', id])
  if (height !== undefined) {
    return height
  }

  return undefined
}
