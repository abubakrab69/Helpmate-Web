import { useState } from 'react'

const contactInfo = [
  { icon: '📧', label: 'Email', value: 'hello@helpmate.com', href: 'mailto:hello@helpmate.com' },
  { icon: '📞', label: 'Phone', value: '+1 (234) 567-890', href: 'tel:+1234567890' },
  { icon: '📍', label: 'Address', value: '123 Main Street, New York, NY 10001', href: null },
  { icon: '🕐', label: 'Hours', value: 'Mon–Fri, 9AM–6PM', href: null },
]

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="px-6 md:px-12 py-10 md:py-16">
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-up">
          <span className="inline-block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-3">Contact</span>
          <h1 className="text-[var(--color-text-h)] text-4xl md:text-5xl font-bold mb-4">Get in Touch</h1>
          <p className="text-[var(--color-text)] text-lg max-w-[540px] mx-auto">
            Have a question, feedback, or want to partner with us? We&apos;d love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-[1fr_1.5fr] gap-12 items-start max-md:grid-cols-1">
          {/* Contact Info */}
          <div className="space-y-6 animate-fade-up">
            {contactInfo.map((info) => (
              <div
                key={info.label}
                className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:shadow-[var(--shadow-hover,0_8px_24px_rgba(0,0,0,0.06))]"
              >
                <span className="text-3xl shrink-0">{info.icon}</span>
                <div>
                  <span className="block text-[13px] font-semibold tracking-wider uppercase text-[var(--color-accent)] mb-0.5">{info.label}</span>
                  {info.href ? (
                    <a href={info.href} className="text-[var(--color-text-h)] text-[15px] no-underline transition-colors duration-300 hover:text-[var(--color-accent)]">
                      {info.value}
                    </a>
                  ) : (
                    <span className="text-[var(--color-text-h)] text-[15px]">{info.value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-8 animate-fade-up" style={{ animationDelay: '0.1s' }}>
            {submitted ? (
              <div className="text-center py-12">
                <span className="text-5xl block mb-4">✅</span>
                <h3 className="text-[var(--color-text-h)] text-xl font-bold mb-2">Message Sent!</h3>
                <p className="text-[var(--color-text)]">Thank you for reaching out. We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <>
                <h3 className="text-[var(--color-text-h)] text-xl font-bold mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                    <div>
                      <label htmlFor="name" className="block text-[14px] font-medium text-[var(--color-text)] mb-1.5">Name</label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={handleChange}
                        className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-h)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)]"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-[14px] font-medium text-[var(--color-text)] mb-1.5">Email</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-h)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)]"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-[14px] font-medium text-[var(--color-text)] mb-1.5">Subject</label>
                    <input
                      id="subject"
                      name="subject"
                      type="text"
                      required
                      value={form.subject}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-h)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)]"
                      placeholder="How can we help?"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-[14px] font-medium text-[var(--color-text)] mb-1.5">Message</label>
                    <textarea
                      id="message"
                      name="message"
                      rows={5}
                      required
                      value={form.message}
                      onChange={handleChange}
                      className="w-full bg-[var(--color-bg)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-[15px] text-[var(--color-text-h)] outline-none transition-colors duration-300 focus:border-[var(--color-accent)] resize-none"
                      placeholder="Tell us more about your inquiry..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-[var(--color-accent)] text-white text-base font-semibold px-8 py-3.5 rounded-xl border-none cursor-pointer transition-all duration-300 hover:bg-[var(--color-accent-light)] hover:-translate-y-0.5 active:scale-96"
                  >
                    Send Message →
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
