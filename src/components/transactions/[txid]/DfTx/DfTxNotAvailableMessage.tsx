interface DfTxNotAvailableMessageProps {
  notAvailableAttr: string
}

export function DfTxNotAvailableMessage (props: DfTxNotAvailableMessageProps): JSX.Element {
  return (
    <>
      <div className='mt-2 ml-10'>{props.notAvailableAttr} information not available</div>
    </>
  )
}
