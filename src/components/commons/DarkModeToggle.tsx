import { BsMoonFill, BsFillSunFill } from 'react-icons/bs'
import { useTheme } from '@contexts/ThemeContext'
import classNames from 'classnames'

export function DarkModeToggle (props: { className?: string }): JSX.Element {
  const {
    theme,
    setTheme
  } = useTheme()

  function handleToggle (): void {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className={classNames('h-8 w-8 cursor-pointer flex items-center', props.className)} onClick={handleToggle}>
      <button data-testid='DarkModeToggle'>
        {theme === 'dark' ? (
          <BsMoonFill size={18} className='text-blueDark-300' />
        ) : (
          <BsFillSunFill size={20} className='text-orange-500' />
        )}
      </button>
    </div>
  )
}
