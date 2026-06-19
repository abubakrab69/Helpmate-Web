const services = [
  { id: 1, title: 'Home Cleaning', desc: 'Professional deep cleaning for your entire home. Dusting, mopping, vacuuming, and more.', price: '$49', icon: '🧹', popular: true },
  { id: 2, title: 'Plumbing', desc: 'Fix leaks, unclog drains, install fixtures, and handle all plumbing repairs.', price: '$79', icon: '🔧' },
  { id: 3, title: 'Electrical', desc: 'Wiring, outlet installation, light fitting, and electrical troubleshooting.', price: '$69', icon: '⚡' },
  { id: 4, title: 'Gardening', desc: 'Lawn mowing, planting, weeding, pruning, and complete landscaping.', price: '$59', icon: '🌿' },
  { id: 5, title: 'Painting', desc: 'Interior and exterior painting with premium materials and clean finish.', price: '$89', icon: '🎨' },
  { id: 6, title: 'Moving Help', desc: 'Packing, loading, transportation, and unloading for stress-free moves.', price: '$99', icon: '📦' },
]

const categories = ['All', 'Cleaning', 'Repairs', 'Maintenance', 'Moving']

function Order() {
  return (
    <section className="animate-fade-up">
      <div className="px-6 md:px-12 py-10 md:py-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Our Services</span>
            <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold max-w-[600px] mx-auto mb-4">What can we help you with?</h1>
            <p className="text-[var(--color-text)] max-w-[540px] mx-auto text-lg">Browse our range of professional services and book the help you need.</p>
          </div>

          <div className="flex gap-2 justify-center flex-wrap mb-12">
            {categories.map(c => (
              <button key={c} className={`px-6 py-2.5 rounded-full border text-[14px] font-medium cursor-pointer transition-all duration-300 font-sans
                ${c === 'All'
                  ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                  : 'bg-[var(--color-card)] text-[var(--color-text)] border-[var(--color-border)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-bg,transparent)]'}`}>
                {c}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6 pb-10">
            {services.map((service, i) => (
              <div key={service.id} className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl px-7 py-8 text-left flex flex-col gap-2 transition-all duration-300 relative animate-fade-up hover:shadow-[var(--shadow-hover,0_16px_48px_rgba(0,0,0,0.1))] hover:-translate-y-1 hover:border-transparent"
                style={{ animationDelay: `${i * 0.05}s` }}>
                {service.popular && (
                  <span className="absolute top-4 right-4 bg-[var(--color-accent-bg,transparent)] text-[var(--color-accent)] text-[11px] font-bold tracking-wider uppercase px-3 py-1 rounded-full">Popular</span>
                )}
                <span className="text-[40px] block mb-2">{service.icon}</span>
                <h3 className="text-[var(--color-text-h)] text-xl m-0">{service.title}</h3>
                <p className="text-[14px] leading-relaxed text-[var(--color-text)] m-0 flex-1">{service.desc}</p>
                <div className="flex items-center justify-between mt-4 gap-3">
                  <span className="text-2xl font-bold text-[var(--color-accent)]">{service.price}</span>
                  <button className="bg-[var(--color-accent)] text-white text-[14px] font-semibold px-5 py-2.5 rounded-xl border-none cursor-pointer transition-all duration-300 shadow-[0_4px_14px_var(--color-accent-border,transparent)] hover:bg-[var(--color-accent-light)] hover:shadow-[0_8px_24px_var(--color-accent-border,transparent)] hover:-translate-y-0.5 active:scale-96">
                    Book Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Order
