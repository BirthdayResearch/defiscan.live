import { Head } from '@components/commons/Head'
import { Link } from '@components/commons/Link'
import { MdChevronRight } from 'react-icons/md'
import { jsonLdScriptProps } from 'react-schemaorg'
import { BreadcrumbList } from 'schema-dts'

const DOMAIN = 'https://defiscan.live'

export interface BreadcrumbItem {
  path: string
  name: string
  hide?: boolean
  canonical?: boolean
}

/**
 * Breadcrumb of the page
 *
 * When breadcrumb is added, https://schema.org "BreadcrumbList" will be interpolated and injected in script.
 *
 * @param {string} props.items.path of the Breadcrumb with `/` prefix
 * @param {string} props.items.name of the Breadcrumb
 * @param {boolean} [props.items.hide=false] to hide this breadcrumb from displaying, will still be added in schema.org
 * @param {boolean} [props.items.canonical=false] set the canonical path of the page and og:url
 */
export function Breadcrumb (props: { items: BreadcrumbItem[] }): JSX.Element {
  const canonical = props.items.filter(value => value.canonical === true)

  return (
    <div className='flex items-center text-black'>
      <Head>
        <SchemaOrgBreadcrumbList items={props.items} />

        {canonical.length > 0 ? (
          <>
            <link key='canonical' rel='canonical' href={`${DOMAIN}${canonical[0].path}`} />
            <meta key='og:url' name='og:url' content={`${DOMAIN}${canonical[0].path}`} />
          </>
        ) : null}
      </Head>

      <Link href={{ pathname: '/' }}>
        <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>Scan</div>
      </Link>

      {props.items
        .filter(({ hide }) => hide === undefined || !hide)
        .map(item => <BreadcrumbNext key={item.path} {...item} />)}
    </div>
  )
}

function BreadcrumbNext (props: BreadcrumbItem): JSX.Element {
  return (
    <div className='flex' key={props.path}>
      <div className='px-1'>
        <MdChevronRight className='h-6 w-6 opacity-60' />
      </div>
      <Link href={{ pathname: props.path }}>
        <div className='cursor-pointer hover:text-primary opacity-60 hover:opacity-100'>{props.name}</div>
      </Link>
    </div>
  )
}

function SchemaOrgBreadcrumbList (props: { items: BreadcrumbItem[] }): JSX.Element {
  return (
    <script
      {...jsonLdScriptProps<BreadcrumbList>({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: props.items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          item: {
            '@id': `${DOMAIN}${item.path}`,
            name: item.name
          }
        }))
      })}
    />
  )
}
