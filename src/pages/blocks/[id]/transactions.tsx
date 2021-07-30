import { useRouter } from 'next/router'

export function Transactions (): JSX.Element {
  const router = useRouter()

  const { query: { id } } = router
  return (
    <div className='container'>
      <div>Blocks: {id}</div>
      <div>Transactions</div>
    </div>
  )
}
