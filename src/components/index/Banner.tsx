export function Banner (): JSX.Element {
  return (
    <div className='h-52 flex flex-col items-center' style={{ backgroundImage: 'linear-gradient(to bottom left, #FFFFFF, #fff7f4,  #f7e6f0' }}>
      <div className='pt-11'>
        <h1 className='text-4xl font-semibold text-center sm:text-left' data-testid='Banner'>DeFiChain Blockchain Explorer</h1>
      </div>
      {/* <div className='mt-6 w-9/12'> */}
      {/*   <div className='flex'> */}
      {/*     <button type='button' className='rounded-l-full h-12 border-primary-100 w-12 border-t border-l border-b flex justify-center items-center bg-white'><IoSearchOutline size={17} className='text-gray-400' /></button> */}
      {/*     <input */}
      {/*       className='text-lg text-gray-600 placeholder-gray-400 rounded-r-full border-primary-100 h-12 border-t border-r border-b w-full focus:outline-none' */}
      {/*       placeholder='Search by address / Txn hash / Block / Token' */}
      {/*       data-testid='search' */}
      {/*     /> */}
      {/*   </div> */}
      {/* </div> */}
    </div>
  )
}
