import { Link } from 'react-router-dom'

const socials = [
  { label: 'FB', href: '#', icon: 'f' },
  { label: 'X', href: '#', icon: '𝕏' },
  { label: 'IG', href: '#', icon: '◻' },
  { label: 'LI', href: '#', icon: 'in' },
]

const quickLinks = [
  { label: 'About Us', to: '#' },
  { label: 'Contact', to: '#' },
  { label: 'FAQ', to: '#' },
  { label: 'Privacy Policy', to: '#' },
]

const services = [
  { label: 'Home Cleaning', to: '/order' },
  { label: 'Plumbing', to: '/order' },
  { label: 'Electrical', to: '/order' },
  { label: 'Gardening', to: '/order' },
]

function Footer() {
  return (
    <footer className="footer bg-[#1a120e] text-[#c4bdb8] text-[14px] mt-auto p-0">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-12 py-16 pb-12 text-left max-md:grid-cols-2 max-sm:grid-cols-1">
          <div>
            <div className="text-[22px] font-extrabold text-white mb-4">
              <span className="text-[var(--color-accent)]">H</span>elpmate
            </div>
            <p className="text-[14px] leading-relaxed text-[#9e9490] max-w-[320px] mb-5">
              Your trusted platform for finding professional help with home services, repairs, and more.
            </p>
            <div className="flex gap-2.5">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="w-10 h-10 rounded-lg bg-white/6 flex items-center justify-center text-[#c4bdb8] text-base no-underline transition-all duration-300 hover:bg-[var(--color-accent)] hover:text-white hover:-translate-y-1" aria-label={s.label}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase mb-5">Quick Links</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {quickLinks.map(l => (
                <li key={l.label}><Link to={l.to} className="text-[#9e9490] text-[14px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">{l.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase mb-5">Services</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              {services.map(s => (
                <li key={s.label}><Link to={s.to} className="text-[#9e9490] text-[14px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">{s.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[14px] font-bold text-white tracking-wider uppercase mb-5">Support</h4>
            <ul className="list-none m-0 p-0 flex flex-col gap-3">
              <li><a href="mailto:hello@helpmate.com" className="text-[#9e9490] text-[14px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">hello@helpmate.com</a></li>
              <li><a href="tel:+1234567890" className="text-[#9e9490] text-[14px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">+1 (234) 567-890</a></li>
              <li className="text-[#7a7270]">Mon–Fri, 9AM–6PM</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/6 py-6 flex items-center justify-between gap-4 flex-wrap text-[13px] text-[#7a7270]">
          <span>&copy; {new Date().getFullYear()} Helpmate. All rights reserved.</span>
          <div className="flex gap-6">
            <a href="#" className="text-[#7a7270] text-[13px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">Terms</a>
            <a href="#" className="text-[#7a7270] text-[13px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">Privacy</a>
            <a href="#" className="text-[#7a7270] text-[13px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
