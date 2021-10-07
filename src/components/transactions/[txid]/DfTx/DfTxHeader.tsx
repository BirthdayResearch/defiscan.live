interface DfTxHeaderProps {
  name: string
}

export function DfTxHeader (props: DfTxHeaderProps): JSX.Element {
  return (
    <>
      <h1 className='font-medium text-2xl mt-6' data-testid='details-subtitle'>DeFi Transaction</h1>
      <div className='mt-2'>
        <span className='font-medium'>Type: </span>
        <span className='text-lg'>{props.name}</span>
      </div>
    </>
  )
}
