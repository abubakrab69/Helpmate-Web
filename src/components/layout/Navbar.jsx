import { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import ThemeToggle from '../ui/ThemeToggle'
import { useCart } from '../../contexts/CartContext'

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
  { to: '/order', label: 'Order History' },
]

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { totalItems } = useCart()

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
    `no-underline text-[var(--color-text)] text-[15px] px-5 md:px-3 lg:px-5 py-2 rounded-lg transition-all duration-300 font-medium relative
    after:content-[''] after:absolute after:bottom-1 after:left-1/2 after:-translate-x-1/2 after:scale-x-0 after:w-3/5 after:h-[2px] after:bg-[var(--color-accent)] after:rounded-sm after:transition-transform after:duration-300
    hover:bg-[var(--color-accent-bg,transparent)] hover:text-[var(--color-accent)]
    ${isActive ? 'bg-[var(--color-accent-bg,transparent)] text-[var(--color-accent)] font-semibold after:scale-x-100' : ''}`

  return (
    <>
      <nav className="navbar flex items-center px-4 sm:px-6 md:px-12 h-[72px] border-b border-[var(--color-border)] backdrop-blur-xl bg-[var(--color-bg)]/70 fixed top-4 left-1/2 -translate-x-1/2 w-[95%] sm:w-[92%] md:w-[92%] lg:w-[85%] xl:w-[79%] z-100 transition-[background,border-color] duration-300 rounded-full">
        <div className="flex items-center justify-between w-full max-w-[1200px] mx-auto">
          <NavLink to="/" onClick={closeMenu} className="text-[22px] font-extrabold text-white bg-gradient-to-br from-[var(--color-accent)] to-[var(--color-accent-light)] w-11 h-11 flex items-center justify-center rounded-xl no-underline shadow-[0_4px_12px_var(--color-accent-border,transparent)] transition-all duration-500 hover:scale-105 hover:-rotate-3 shrink-0">
            H
          </NavLink>

          {/* Desktop nav */}
          <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink to={to} end={to === '/'} className={linkClass}>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>


          <div className="hidden md:flex items-center gap-1">
            <NavLink
              to="/cart"
              className="relative w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg,#fff)] cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-bg,transparent)] no-underline text-[var(--color-text)]"
              aria-label="Cart"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </NavLink>
            <ThemeToggle />
            <button className="bg-[var(--color-accent)] text-white text-[15px] md:text-[14px] lg:text-[15px] font-semibold px-7 md:px-5 lg:px-7 py-2.5 rounded-full border-none cursor-pointer transition-all duration-300 shadow-[0_4px_16px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96">
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
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3 px-5">
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className="relative w-10 h-10 rounded-lg border border-[var(--color-border)] bg-[var(--color-bg,#fff)] cursor-pointer flex items-center justify-center transition-all duration-300 hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-bg,transparent)] no-underline text-[var(--color-text)] shrink-0"
            aria-label="Cart"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[11px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
                {totalItems > 99 ? '99+' : totalItems}
              </span>
            )}
          </NavLink>
          <ThemeToggle />
          <button
            onClick={closeMenu}
            className="flex-1 bg-[var(--color-accent)] text-white text-[15px] font-semibold px-2 py-3 rounded-full border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)]"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  )
}

export default Navbar
