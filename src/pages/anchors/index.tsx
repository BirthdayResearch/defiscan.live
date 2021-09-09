import { Container } from '@components/commons/Container'
import { OverflowTable } from '@components/commons/OverflowTable'

export default function AnchorsPage (): JSX.Element {
  const anchors = [
    {
      id: '0',
      defiblock: 123331,
      bitcoinBlock: 23333,
      time: '9/10/2021, 6:20AM',
      address: '13u87cwpncwinc0i3wn'
    },
    {

      defiblock: 123331,
      bitcoinBlock: 23333,
      time: '9/10/2021, 6:20AM',
      address: '13u87cwpncwinc0i3wn'
    },
    {
      id: '2',
      defiblock: 123331,
      bitcoinBlock: 23333,
      time: '9/10/2021, 6:20AM',
      address: '13u87cwpncwinc0i3wn'
    },
    {
      id: '3',
      defiblock: 123331,
      bitcoinBlock: 23333,
      time: '9/10/2021, 6:20AM',
      address: '13u87cwpncwinc0i3wn'
    }
  ]
  return (
    <Container className='pt-12 pb-20'>
      <h1 className='text-2xl font-medium'>Anchor Blocks</h1>
      <OverflowTable className='mt-6'>
        <OverflowTable.Header>
          <OverflowTable.Head>DEFICHAIN BLOCK</OverflowTable.Head>
          <OverflowTable.Head>BITCOIN BLOCK</OverflowTable.Head>
          <OverflowTable.Head>BLOCK TIME</OverflowTable.Head>
          <OverflowTable.Head>REWARD ADDRESS</OverflowTable.Head>
        </OverflowTable.Header>
        {anchors.map((anchor) => (
          <AnchorBlock key={anchor.id} data={anchor} />
        ))}
      </OverflowTable>
    </Container>
  )
}

function AnchorBlock ({ data }: { data: any }): JSX.Element {
  return (
    <OverflowTable.Row>
      <OverflowTable.Cell>{data.defiblock}</OverflowTable.Cell>
      <OverflowTable.Cell>{data.bitcoinBlock}</OverflowTable.Cell>
      <OverflowTable.Cell>{data.time}</OverflowTable.Cell>
      <OverflowTable.Cell>{data.address}</OverflowTable.Cell>
    </OverflowTable.Row>
  )
}
