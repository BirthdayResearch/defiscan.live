import { IoChevronForwardSharp } from 'react-icons/io5'

interface DfTxHierarchicalSubtitleProps {
  title: string
}

export function DfTxHierarchicalSubtitle (props: DfTxHierarchicalSubtitleProps): JSX.Element {
  return (
    <>
      <div className='flex mt-6' data-testid='transaction-take-loan-hierarchical-subtitle'>
        <span>
          <IoChevronForwardSharp className='transform rotate-90 lg:rotate-0' size={24} />
        </span>
        <span className='font-small text-xl'>{props.title}</span>
      </div>
    </>
  )
}
