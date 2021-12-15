interface DfTxHeaderProps {
  name: string
}

export function DfTxHeader (props: DfTxHeaderProps): JSX.Element {
  return (
    <>
      <h1 className='font-medium text-2xl mt-6' data-testid='DfTxHeader.Title'>DeFi Transaction</h1>
      <div className='mt-2' data-testid='DfTxHeader.Subtitle'>
        <span className='font-medium'>Type:</span>
        <span className='ml-1.5 text-lg'>{props.name}</span>
      </div>
    </>
  )
}
