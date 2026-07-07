function Select({ label, error, id, options, placeholder, ...props }) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-[var(--color-text-h)]">
          {label}
        </label>
      )}
      <select
        id={id}
        className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text-h)] text-sm outline-none transition-all duration-200 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 ${
          error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--color-border)]'
        }`}
        {...props}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options?.map((opt) => (
          <option key={opt.value || opt.id} value={opt.value || opt.id}>
            {opt.label || opt.name}
          </option>
        ))}
      </select>
      {error && <p className="text-red-500 text-xs mt-0.5">{error}</p>}
    </div>
  )
}

export default Select
