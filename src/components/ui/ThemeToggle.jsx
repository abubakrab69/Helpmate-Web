import { useTheme } from '../../contexts'

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      className="w-10 h-10 rounded-lg  cursor-pointer flex items-center justify-center transition-all duration-300 mr-2 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-bg,transparent)]"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      <span className="text-lg leading-none block">
        {theme === 'dark' ? '☀️' : '🌙'}
      </span>
    </button>
  )
}

export default ThemeToggle
