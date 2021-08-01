
export function Container ({ children }): JSX.Element {
  return (
    <div className='container mx-auto px-4 py-6'>
      {children}
    </div>
  )
}
