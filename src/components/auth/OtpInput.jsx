import { useRef, useState, useEffect } from 'react'

function OtpInput({ length = 6, onComplete, disabled = false }) {
  const [otp, setOtp] = useState(Array(length).fill(''))
  const inputs = useRef([])

  useEffect(() => {
    inputs.current[0]?.focus()
  }, [])

  useEffect(() => {
    if (otp.every((d) => d !== '') && onComplete) {
      onComplete(otp.join(''))
    }
  }, [otp, onComplete])

  const handleChange = (index, value) => {
    if (!/^\d?$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    if (value && index < length - 1) {
      inputs.current[index + 1]?.focus()
    }
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    e.preventDefault()
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, length)
    if (!pasted) return
    const newOtp = Array(length).fill('')
    pasted.split('').forEach((d, i) => { newOtp[i] = d })
    setOtp(newOtp)
    const nextIndex = pasted.length < length ? pasted.length : length - 1
    inputs.current[nextIndex]?.focus()
  }

  return (
    <div className="flex gap-3 justify-center">
      {otp.map((digit, index) => (
        <input
          key={index}
          ref={(el) => { inputs.current[index] = el }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={index === 0 ? handlePaste : undefined}
          disabled={disabled}
          className="w-12 h-14 text-center text-xl font-bold rounded-xl border-2 border-[var(--color-border)] bg-[var(--color-bg)] text-[var(--color-text-h)] outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:opacity-50"
        />
      ))}
    </div>
  )
}

export default OtpInput
