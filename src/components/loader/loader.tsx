import {} from './loader'

export function Loader (): JSX.Element {
  return (
    <div className='fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-gray-700 opacity-75 flex flex-col items-center justify-center'>
      <div className='animate-spin rounded-full border-4 border-t-4 border-gray-200 h-12 w-12 mb-4 relative'>
        <span className='rounded-full border-t-8 border-pink-600 absolute h-12 w-12' />
      </div>
    </div>
  )
}

export default Loader
