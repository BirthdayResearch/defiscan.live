import { MasternodeData } from '../../Interfaces'

interface IProps {
  data: MasternodeData
}

export const MasternodeItem = ({ data }: IProps): JSX.Element => {
  return (
    <div data-testid={'masternode_item'} className='table-row border-b border-gray-300'>
      <div className='table-cell py-4 px-4'>{data.owner.address}</div>
      <div className='table-cell py-4 px-2'>{data.operator.address}</div>
      <div className='table-cell py-4 px-2'>{data.creation.height}</div>
      <div className='table-cell py-4 px-2'>{data.resign.height}</div>
      <div className='table-cell py-4 px-2'>{data.mintedBlocks}</div>
      <div className='table-cell py-4 px-2'>{data.state}</div>
    </div>
  )
}
