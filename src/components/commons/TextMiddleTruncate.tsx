import classNames from 'classnames'

export function TextMiddleTruncate (props: { text: string, textLength: number, className?: string, testId?: string }): JSX.Element {
  const leftText = props.text.substr(0, props.textLength)
  const rightText = props.text.substr(props.text.length - props.textLength, props.textLength)

  return (
    <span
      className={classNames('select-all', props.className)} data-testid={props.testId}
      onCopy={async (event) => await handlerCopy(event, props.text)}
    >{`${leftText}...${rightText}`}
    </span>
  )
}

async function handlerCopy (event, text: string): Promise<void> {
  event.preventDefault()
  event.nativeEvent.stopImmediatePropagation()

  await navigator.clipboard.writeText(text)
}
