import { Fragment, useState, ReactNode } from 'react'
import { Breadcrumb } from '@components/commons/Breadcrumb'
import { GetServerSidePropsContext, GetServerSidePropsResult, InferGetServerSidePropsType } from 'next'
import { getWhaleApiClient } from '@contexts/WhaleContext'
import { Block } from '@defichain/whale-api-client/dist/api/blocks'
import { MdContentCopy } from 'react-icons/md'

interface BlockDetailsPageProps {
  block: Block
}

function CopyButton ({ value }: { value: string }): JSX.Element {
  const [open, setOpen] = useState<Boolean>(false)
  function copy (): void {
    const input = document.createElement('input')
    input.value = value
    document.body.appendChild(input)
    input.select()
    document.execCommand('copy')
    document.body.removeChild(input)

    setOpen(true)

    setTimeout(() => {
      setOpen(false)
    }, 500)
  }

  return (
    <div className='ml-1'>

      <button className='p-2 rounded bg-gray-100' type='button' onClick={() => { copy() }}>
        <MdContentCopy />
      </button>
      {
        open === true
          ? (
            <span className='bg-gray-100 p-1 rounded absolute mr-4'>
              Copied!
            </span>
          )
          : null
      }
    </div>
  )
}

function BlockDetail (props: { children: ReactNode }): JSX.Element {
  return (
    <div className='pl-6 py-4 border first:rounded-t-md last:rounded-b-md flex justify-between'>{props.children}</div>
  )
}

export default function BlockDetails ({ block }: InferGetServerSidePropsType<typeof getServerSideProps>): JSX.Element {
  const { height, hash } = block
  console.log('block', block)

  const leftBlockDetails = [
    {
      label: 'Block Reward:',
      value: 'xxxx DFI'
    },
    {
      label: 'Height:',
      value: `${block.height}`
    },
    {
      label: 'Transactions:',
      value: `${block.transactionCount}`
    },
    {
      label: 'Timestamp:',
      value: `${block.medianTime}`
    },
    {
      label: 'Confirmations:',
      value: '2712 (placeholder)'
    },
    {
      label: 'Merkle Root:',
      content: (
        <>
          <span className='flex-grow break-all'>{block.merkleroot}</span>
          <CopyButton value={block.merkleroot} />
        </>
      )
    }
  ]

  const rightBlockDetails = [
    {
      label: 'Difficult:', value: `${block.difficulty}`
    },
    {
      label: 'Bits:', value: `${block.weight}`
    },
    {
      label: 'Size (bytes):', value: `${block.size}`
    },
    {
      label: 'Version:', value: `${block.version}`
    },
    {
      label: 'Next Block:', value: `${block.height + 1}`
    },
    {
      label: 'Previous Block:', value: `${block.height - 1}`
    }

  ]

  function renderBlockDetails (details: Array<{ label: string, content?: JSX.Element, value?: string }>): JSX.Element[] {
    return details.map((d) => (
      <BlockDetail key={d.label}>
        <span className='w-1/3 flex-shrink-0'>
          {d.label}
        </span>
        {
          (d.content != null)
            ? d.content
            : (
              <span className='flex-grow'>
                {d.value}
              </span>
            )
        }
      </BlockDetail>
    ))
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Breadcrumb items={[
        { path: '/blocks', name: 'Blocks' },
        { path: `/blocks/${height}`, name: `#${height}`, canonical: true }

      ]}
      />
      <h1 className='font-semibold text-2xl'>Block #{height}</h1>
      <div className='flex items-center'><span className='font-semibold'>Hash:&nbsp;</span> <span className='text-primary'> {hash} </span> <CopyButton value={hash} /></div>
      <div className='flex mt-6 gap-x-6'>
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(leftBlockDetails)}
        </div>
        <div className='flex flex-col w-5/12 flex-grow'>
          {renderBlockDetails(rightBlockDetails)}
        </div>
      </div>
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
