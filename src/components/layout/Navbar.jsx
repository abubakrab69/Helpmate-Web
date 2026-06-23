import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import { useCart } from '../../contexts/CartContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/order', label: 'Order' },
  { to: '/cart', label: 'Cart' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

  const cartLabel = totalItems > 0 ? `Cart (${totalItems})` : 'Cart'

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)

  const linkClass = ({ isActive }) =>
    `no-underline text-[var(--color-text)] text-[15px] px-5 py-2 rounded-lg transition-all duration-300 font-medium relative
    after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:scale-x-0 after:w-3/5 after:h-[2px] after:bg-[var(--color-accent)] after:rounded-sm after:transition-transform after:duration-300
    hover:bg-[var(--color-accent-bg,transparent)] hover:text-[var(--color-accent)]
    ${isActive ? 'bg-[var(--color-accent-bg,transparent)] text-[var(--color-accent)] font-semibold after:scale-x-100' : ''}`

  return (
    <>
      <nav className="navbar flex items-center px-4 sm:px-6 md:px-12 h-[72px] border-b border-[var(--color-border)] backdrop-blur-xl fixed top-4 left-1/2 -translate-x-1/2 w-[79%] z-100 transition-[background,border-color] duration-300 rounded-full">
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <NavLink to="/" onClick={closeMenu} className="text-[22px] font-extrabold text-white bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] w-11 h-11 flex items-center justify-center rounded-xl no-underline shadow-[0_4px_12px_var(--color-accent-border,transparent)] transition-all duration-500 hover:scale-105 hover:-rotate-3 shrink-0">
            H
          </NavLink>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={linkClass}>
                  {to === '/cart' ? cartLabel : label}
                </NavLink>
              </li>
            ))}
          </ul>


          <div className="hidden md:flex items-center gap-1">

            <ThemeToggle />
            <button className="bg-[var(--color-accent)] text-white text-[15px] font-semibold px-7 py-2.5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96">
              Sign Up
            </button>
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(p => !p)}
            className="md:hidden w-10 h-10 rounded-lg border border-[var(--color-border)] bg-transparent cursor-pointer flex flex-col items-center justify-center gap-1.5 transition-all duration-300 hover:border-[var(--color-accent)]"
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className={`block w-5 h-[2px] rounded-sm bg-[var(--color-text-h)] transition-all duration-300 ${menuOpen ? 'translate-y-[3.5px] rotate-45' : ''}`} />
            <span className={`block w-5 h-[2px] rounded-sm bg-[var(--color-text-h)] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-[2px] rounded-sm bg-[var(--color-text-h)] transition-all duration-300 ${menuOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-200 bg-black/40 backdrop-blur-sm md:hidden"
          onClick={closeMenu}
        />
      )}

      {/* Mobile drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] z-300 bg-[var(--color-bg)] border-l border-[var(--color-border)] flex flex-col pt-24 px-6 transition-transform duration-300 md:hidden ${menuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
      >
        <ul className="flex flex-col gap-1 list-none m-0 p-0 mb-8">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                onClick={closeMenu}
                className={({ isActive }) =>
                  `no-underline text-[var(--color-text)] text-[17px] px-5 py-3 rounded-xl transition-all duration-300 font-medium block
                  hover:bg-[var(--color-accent-bg,transparent)] hover:text-[var(--color-accent)]
                  ${isActive ? 'bg-[var(--color-accent-bg,transparent)] text-[var(--color-accent)] font-semibold' : ''}`
                }
              >
                {to === '/cart' ? cartLabel : label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 px-5">
          <ThemeToggle />
          <button
            onClick={closeMenu}
            className="flex-1 bg-[var(--color-accent)] text-white text-[15px] font-semibold px-7 py-3 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
