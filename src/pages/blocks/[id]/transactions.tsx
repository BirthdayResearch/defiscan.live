import { useRouter } from 'next/router'

export default function Transactions (): JSX.Element {
  const router = useRouter()

  console.log('router', router)
  const { query: { id } } = router
  return (
    <div className='container'>
      <div>Blocks: {id}</div>
      <div>Transactions</div>
    </div>
  )
}
