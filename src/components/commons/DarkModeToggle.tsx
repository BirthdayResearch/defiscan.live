import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from '@contexts/ThemeContext'
import classNames from 'classnames'

export function DarkModeToggle (props: {className?: string}): JSX.Element {
  const { theme, setTheme } = useTheme()

  function handleToggle (): void {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }
  return (
    <div className={classNames('h-8 w-8 border-[1px] border-gray-600 border-opacity-40 flex items-center justify-center cursor-pointer shadow-xl rounded-lg hover:bg-white bg-darkprimary-800 dark:bg-gray-900 dark:hover:bg-white ', props.className)} onClick={handleToggle}>
      <button className='text-[#FACC15] hover:text-black p-2' data-testid='DarkModeToggle'>
        {theme === 'dark' ? (
          <BsMoonFill fontSize={16} />
        ) : (
          <BsFillSunFill fontSize={16} />
        )}
      </button>
    </div>
  )
}
