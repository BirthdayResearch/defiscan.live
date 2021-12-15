import { CgSpinner } from 'react-icons/cg'

interface ShowMoreButtonProps {
  isLoading: boolean
  testId: string
  hasNext: boolean
  handleClick: (evt: object) => void
};

export function ShowMoreButton (props: ShowMoreButtonProps): JSX.Element {
  if (props.isLoading) {
    return (
      <div className='flex w-full justify-center mt-4'>
        <div className='flex justify-center pt-2 pb-4'>
          <CgSpinner size={32} className='animate-spin text-gray-600' />
        </div>
      </div>
    )
  }

  return (
    <div
      className={`${props.hasNext ? 'flex w-full justify-center mt-4' : 'hidden'}`}
      onClick={props.handleClick}
      data-testid={props.testId}
    >
      <button
        type='button'
        className='w-full md:w-1/3 py-2.5 text-primary-300 hover:text-primary-500 border border-primary-200 hover:border-primary-500 rounded'
      >
        SHOW MORE
      </button>
    </div>
  )
}
