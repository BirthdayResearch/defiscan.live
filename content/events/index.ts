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
  },
  FortCanningHill: {
    height: '1605000',
    slug: 'FortCanningHill',
    name: 'Fort Canning Hill',
    network: 'MainNet'
  },
  dTokenJanReward: {
    height: '1585500',
    slug: 'dTokenJanReward',
    name: 'January dTokens Reward Distribution',
    network: 'MainNet'
  },
  dTokenMarReward: {
    height: '1685500',
    slug: 'dTokenMarReward',
    name: 'March dTokens Reward Distribution',
    network: 'MainNet'
  },
  dTokenAprReward: {
    height: '1766000',
    slug: 'dTokenAprReward',
    name: 'April dTokens Reward Distribution',
    network: 'MainNet'
  },
  FortCanningRoad: {
    height: '1786000',
    slug: 'FortCanningRoad',
    name: 'Fort Canning Road',
    network: 'MainNet'
  },
  dTokenMayReward: {
    height: '1852500',
    slug: 'dTokenMayReward',
    name: 'May dTokens Reward Distribution',
    network: 'MainNet'
  }
}

export function getEventCopy (id: string, context: GetServerSidePropsContext): EventCopy | undefined {
  const network = context.query.network?.toString() ?? getEnvironment().networks[0]

  const eventBySlug = _.find(EVENTS, event => {
    return event.slug.toLowerCase() === id.toLowerCase()
  })
  if (eventBySlug !== undefined && eventBySlug.network === network) {
    return eventBySlug
  }

  const eventByHeight = _.find(EVENTS, ['height', id])
  if (eventByHeight !== undefined && eventByHeight.network === network) {
    return eventByHeight
  }

  return undefined
}
