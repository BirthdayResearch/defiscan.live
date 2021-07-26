function createPeriodParser (secondsInTimePeriod: number, periodName: string) {
  return (timestamp: number): string | undefined => {
    const periods = timestamp / secondsInTimePeriod

    const periodsInInteger = Math.floor(periods)

    if (periodsInInteger === 0) {
      return
    }

    if (periodsInInteger === 1) {
      return `a ${periodName} ago`
    }

    return `${periodsInInteger} ${periodName}s ago`
  }
}

const periodParsers = [
  createPeriodParser(31536000, 'year'),
  createPeriodParser(2592000, 'month'),
  createPeriodParser(604800, 'week'),
  createPeriodParser(86400, 'day'),
  createPeriodParser(3600, 'hour'),
  createPeriodParser(60, 'minute'),
  createPeriodParser(1, 'second')
]

export function parseAge (timestamp: number): string {
  const now = Math.floor(new Date().getTime() / 1000)
  const difference = now - timestamp

  for (const parser of periodParsers) {
    const parsedPeriod = parser(difference)

    if (parsedPeriod !== undefined) {
      return parsedPeriod
    }
  }
  throw new Error('Unable to find a time period that describes this timestamp.')
}
