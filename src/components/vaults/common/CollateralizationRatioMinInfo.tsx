export function CollateralizationRatioMinInfo (): JSX.Element {
  return (
    <div
      className='px-3 py-3 font-normal text-sm bg-white text-left text-gray-900 rounded-lg border border-gray-100 shadow-md max-w-xs'
    >
      <span className='font-medium'>Collateralization Ratio</span>: Percentage of collaterals deposited in a vault in
      relation to the amount of loan taken.
      <br /><br />
      <span className='font-medium'>Min. Collateralization Ratio</span>: Minimum required collateral ratio based on
      vault scheme selected by vault owner.
    </div>
  )
}
