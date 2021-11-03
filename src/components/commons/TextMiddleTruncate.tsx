export function TextMiddleTruncate (props: { text: string, textLength: number }): JSX.Element {
  const leftText = props.text.substr(0, props.textLength)
  const rightText = props.text.substr(props.text.length - props.textLength, props.textLength)

  return (
    <span className='select-all' onCopy={async (event) => await handlerCopy(event, props.text)}>{`${leftText}...${rightText}`}</span>
  )
}

async function handlerCopy (event, text: string): Promise<void> {
  event.preventDefault()
  event.nativeEvent.stopImmediatePropagation()

  await navigator.clipboard.writeText(text)
}
