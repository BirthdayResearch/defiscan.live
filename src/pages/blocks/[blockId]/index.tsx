import { Breadcrumb } from '@components/commons/Breadcrumb'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'

interface BlockDetailsPageProps {
  block: Block
}

export default function BlockDetails ({ block }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  console.log('block', block)
  const { height } = block
  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb items={[
        { path: '/blocks', name: 'Blocks' },
        { path: `/blocks/${height}`, name: `#${height}`, canonical: true }

      ]}
      />

      <div className='block-details-title'>Title #height</div>
      <div className='block-details-hash'>Hash: __hash__ copy button</div>
      <div className='block-details-table-1'>
        <div className='block-details-table-1-block-reward'>xxxxx DFI</div>
        <div className='block-details-table-1-height'>height</div>
        <div className='block-details-table-1-transactions'>number of transactions</div>
        <div className='block-details-table-1-timestamp'>Aug 12, 2021, 3:21:49 PM</div>
        <div className='block-details-table-1-confirmations'>number of confirmations</div>
        <div className='block-details-table-1-merkle-root'>some hash here with copy button</div>
      </div>
      <div className='block-details-table-2'>
        <div className='block-details-table-1-difficulty'>some long number</div>
        <div className='block-details-table-1-bits'>some hexadecimal number</div>
        <div className='block-details-table-1-size'>some number</div>
        <div className='block-details-table-1-version'>some number</div>
        <div className='block-details-table-1-next-block'>some number</div>
        <div className='block-details-table-1-previous-block'>some number</div>
      </div>
      Hello world
    </div>
  )
}

// first of all I need to fetch the block
//
export async function getServerSideProps (context: GetServerSidePropsContext): Promise<GetServerSidePropsResult<BlockDetailsPageProps>> {
  const api = getWhaleApiClient(context)
  const blockId = context.params?.blockId?.toString() as string
  const block = await api.blocks.get(blockId)

  return {
    props: {
      block
    }
  }
}
