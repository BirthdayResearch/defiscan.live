import { ReactNode } from 'react'
import classnames from 'classnames'

interface VinVoutBlockProps {
  type: 'INPUT' | 'OUTPUT'
  description?: string
  amount?: number
  descriptionTextPrimary?: boolean
}

function TypeLabel ({ children }: { children: ReactNode }): JSX.Element {
  return <span className='bg-gray-200 rounded text-xs px-2 py-1 font-medium w-min'>{children}</span>
}

export function VinVoutBlock ({ type, description, descriptionTextPrimary, amount }: VinVoutBlockProps): JSX.Element {
  return (
    <div className='bg-gray-100 h-20 py-3 px-3 rounded flex justify-between'>
      <div className='flex flex-col justify-between h-full'>
        <TypeLabel>
          {type}
        </TypeLabel>
        <div>
          {
            description !== undefined
              ? (
                <span className={classnames({ 'text-primary': descriptionTextPrimary })}>
                  {description}
                </span>
              )
              : 'No Input (Newly generated coins)'
          }
        </div>
      </div>
      {
        amount !== undefined
          ? (
            <div className='flex flex-col-reverse'>
              <div>
                {amount} DFI (U)
              </div>
            </div>
          )
          : null
      }
    </div>
  )
}
export default VinVoutBlock
