import { Link } from 'react-router-dom'

const milestones = [
  { year: '2020', title: 'Founded', desc: 'Helpmate was born with a simple mission — connect homeowners with trusted professionals.' },
  { year: '2021', title: '500+ Pros', desc: 'Growing community of verified service professionals across the city.' },
  { year: '2022', title: '10K Jobs Done', desc: 'Reached a milestone of 10,000 completed jobs with 4.9 avg rating.' },
  { year: '2023', title: 'Expanded Services', desc: 'Added 50+ new service categories to cover every home need.' },
]

const values = [
  { icon: '🤝', title: 'Trust', desc: 'Every professional is thoroughly vetted and verified.' },
  { icon: '⚡', title: 'Speed', desc: 'Book a service in minutes, not hours.' },
  { icon: '💎', title: 'Quality', desc: 'We stand behind every job with a satisfaction guarantee.' },
  { icon: '🌱', title: 'Growth', desc: 'We help local professionals grow their businesses.' },
]

function About() {
  return (
    <div className="px-6 md:px-12 py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">About Us</span>
          <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold mb-4">Who We Are</h1>
          <p className="text-[var(--color-text)] text-lg max-w-[640px] mx-auto">
            Helpmate is your trusted platform for finding professional home services. We connect you with verified experts for cleaning, repairs, plumbing, electrical work, and more.
          </p>
        </div>

        {/* Story */}

        <div className="grid grid-cols-2 gap-12 mb-20 items-center max-md:grid-cols-1">
          <div className="animate-fade-up">
            <h2 className="text-[var(--color-text-h)] text-2xl font-bold mb-4">Our Story</h2>
            <p className="text-[var(--color-text)] leading-relaxed mb-4">
              Helpmate started with a simple observation: finding reliable home help was frustrating. Phone calls, uncertain pricing, and no way to verify quality.
            </p>
            <p className="text-[var(--color-text)] leading-relaxed mb-4">
              We built Helpmate to change that. A platform where every professional is verified, every booking is instant, and every job is backed by a satisfaction guarantee.
            </p>
            <p className="text-[var(--color-text)] leading-relaxed">
              Today, thousands of customers trust us for their home service needs, and hundreds of pros rely on us to grow their business.
            </p>
          </div>
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <h3 className="text-[var(--color-text-h)] text-xl font-bold mb-4">By the Numbers</h3>
            <div className="grid grid-cols-2 gap-6">
              {[
                { value: '50K+', label: 'Jobs Completed' },
                { value: '500+', label: 'Expert Pros' },
                { value: '10K+', label: 'Happy Customers' },
                { value: '4.9', label: 'Avg. Rating' },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <span className="block text-[36px] font-extrabold text-[var(--color-accent)] leading-none mb-1">{s.value}</span>
                  <span className="text-[14px] text-[var(--color-text)]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-20">
          <h2 className="text-[var(--color-text-h)] text-2xl font-bold text-center mb-10">Our Journey</h2>
          <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
            {milestones.map((m, i) => (
              <div
                key={m.year}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 text-left animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-[var(--color-accent)] text-sm font-bold tracking-wider">{m.year}</span>
                <h3 className="text-[var(--color-text-h)] text-lg font-semibold mt-2 mb-2">{m.title}</h3>
                <p className="text-[14px] text-[var(--color-text)] leading-relaxed m-0">{m.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="text-[var(--color-text-h)] text-2xl font-bold text-center mb-4">What We Stand For</h2>
          <p className="text-[var(--color-text)] text-center max-w-[540px] mx-auto mb-10">Our core values guide everything we do.</p>
          <div className="grid grid-cols-4 gap-6 max-md:grid-cols-2 max-sm:grid-cols-1">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 text-center animate-fade-up"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <span className="text-4xl block mb-4">{v.icon}</span>
                <h3 className="text-[var(--color-text-h)] text-lg font-semibold mb-2">{v.title}</h3>
                <p className="text-[14px] text-[var(--color-text)] m-0 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-[var(--color-bg-alt)] border border-[var(--color-border)] rounded-2xl p-12 animate-fade-up">
          <h2 className="text-[var(--color-text-h)] text-2xl font-bold mb-3">Want to be part of our story?</h2>
          <p className="text-[var(--color-text)] mb-8">Whether you need a service or want to offer one, we&apos;d love to hear from you.</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/contact" className="inline-flex items-center gap-2 bg-[var(--color-accent)] text-white text-base font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:-translate-y-0.5 active:scale-96">
              Contact Us →
            </Link>
            <Link to="/" className="inline-flex items-center gap-2 bg-transparent border border-[var(--color-border)] text-[var(--color-text)] text-base font-semibold px-8 py-3.5 rounded-full transition-all duration-300 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] active:scale-96">
              Browse Services
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About
