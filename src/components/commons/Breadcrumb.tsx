import { Link } from '@components/commons/Link'
import { MdChevronRight } from 'react-icons/md'

export interface BreadcrumbItem {
  path: string
  name: string
}

export function Breadcrumb (props: { items: BreadcrumbItem[] }): JSX.Element {
  // TODO(fuxingloh): json-ld for SEO

  return (
    <div className='flex items-center text-black'>
      <Link href={{ pathname: '/' }}>
        <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>Scan</div>
      </Link>
      {props.items.map(item => (
        <div className='flex' key={item.path}>
          <div className='px-1'>
            <MdChevronRight className='h-6 w-6 opacity-60' />
          </div>
          <Link href={{ pathname: item.path }}>
            <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>{item.name}</div>
          </Link>
        </div>
      ))}
    </div>
  )
}
