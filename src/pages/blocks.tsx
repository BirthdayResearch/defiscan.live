export default function Blocks (): JSX.Element {
  return (
    <div className="container mx-auto flex px-4 py-8">
      <div className="grid w-screen md:w-2/3 grid-cols-4 gap-4">
        <div>Height</div>
        <div>Age</div>
        <div>Transactions</div>
        <div className="justify-self-end">Size</div>
      </div>
    </div>
  )
}

