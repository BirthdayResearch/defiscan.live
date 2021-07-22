import { MasternodeData } from '../../Interfaces'

interface IProps {
  data: MasternodeData
}

export const MasternodeItem = ({ data }: IProps): JSX.Element => {
  return (
    <div className='table-row border-bottom-2'>
      <div className='table-cell'>{data.owner.address}</div>
      <div className='table-cell'>{data.operator.address}</div>
      <div className='table-cell'>{data.creation.height}</div>
      <div className='table-cell'>{data.resign.height}</div>
      <div className='table-cell'>{data.mintedBlocks}</div>
      <div className='table-cell'>{data.state}</div>
    </div>
  )
}
