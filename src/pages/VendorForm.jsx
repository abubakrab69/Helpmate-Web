import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { authService } from '../services/authService'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../components/ui/Toast'
import { Input, Select, Spinner } from '../components/ui'
import { ROUTES } from '../constants'

function VendorForm() {
  const navigate = useNavigate()
  const location = useLocation()
  const { saveAuth } = useAuth()
  const { addToast } = useToast()

  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [nicheDetail, setNicheDetail] = useState(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({})
  const [fileMap, setFileMap] = useState({})
  const [errors, setErrors] = useState({})

  const vendorData = location.state?.vendorData || {}

  useEffect(() => {
    if (!vendorData.nieche_id) {
      navigate(ROUTES.VENDOR_SELECT_NICHE, { replace: true })
      return
    }
    loadNicheDetail(vendorData.nieche_id)
  }, [])

  const loadNicheDetail = async (nicheId) => {
    setLoading(true)
    try {
      const data = await authService.getNicheDetail(nicheId)
      setNicheDetail(data.data || data)
    } catch (err) {
      addToast(err.message || 'Failed to load form fields', 'error')
      navigate(ROUTES.VENDOR_SELECT_NICHE, { replace: true })
    } finally {
      setLoading(false)
    }
  }

  const steps = nicheDetail?.steps || []
  const allFields = nicheDetail?.fields || []
  const fieldsByStep = nicheDetail?.steps?.map((step) => {
    return (step.fields || []).map((f) => allFields.find((af) => af.name === f || af.id === f)).filter(Boolean)
  }) || (allFields.length > 0 ? [allFields] : [])

  const getFieldValue = useCallback((fieldName) => {
    if (fileMap[fieldName]) return fileMap[fieldName].name
    return formData[fieldName] ?? ''
  }, [formData, fileMap])

  const handleFieldChange = useCallback((field, value) => {
    if (field.type === 'file') {
      const file = value
      if (file) {
        setFileMap((prev) => ({ ...prev, [field.name]: file }))
      }
    } else {
      setFormData((prev) => ({ ...prev, [field.name]: value }))
    }
    setErrors((prev) => ({ ...prev, [field.name]: '' }))
  }, [])

  const validateStep = (stepIndex) => {
    const stepFields = fieldsByStep[stepIndex] || []
    const errs = {}
    stepFields.forEach((field) => {
      if (field.required !== false && field.required !== undefined) {
        const val = field.type === 'file' ? fileMap[field.name] : formData[field.name]
        if (!val || (typeof val === 'string' && !val.trim())) {
          errs[field.name] = `${field.label || field.name} is required`
        }
      }
      if (field.type === 'email' && formData[field.name]) {
        if (!/\S+@\S+\.\S+/.test(formData[field.name])) {
          errs[field.name] = 'Invalid email address'
        }
      }
    })
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0))
  }

  const handleSubmit = async () => {
    for (let i = 0; i < steps.length; i++) {
      if (!validateStep(i)) {
        setCurrentStep(i)
        addToast('Please fix the errors before submitting', 'error')
        return
      }
    }

    setSubmitting(true)
    try {
      const payload = {
        nieche_id: vendorData.nieche_id,
        data: { ...formData },
      }

      const submitData = new FormData()
      submitData.append('nieche_id', vendorData.nieche_id)
      for (const key in formData) {
        submitData.append(`data[${key}]`, formData[key])
      }
      for (const key in fileMap) {
        submitData.append(`data[${key}]`, fileMap[key])
      }

      const result = await authService.submitVendorForm(submitData)

      if (result.token || result.access_token) {
        saveAuth(result.token || result.access_token, result.user || result.data)
        addToast('Vendor registration submitted!', 'success')
        navigate(ROUTES.DASHBOARD, { replace: true })
      } else {
        addToast('Registration submitted for review!', 'success')
        navigate(ROUTES.VENDOR_STATUS, { replace: true })
      }
    } catch (err) {
      addToast(err.message || 'Failed to submit form', 'error')
    } finally {
      setSubmitting(false)
    }
  }

  const renderField = (field) => {
    const commonProps = {
      id: field.name,
      name: field.name,
      label: field.label || field.name,
      placeholder: field.placeholder || `Enter ${field.label || field.name}`,
      error: errors[field.name],
      disabled: submitting,
    }

    if (field.type === 'file') {
      return (
        <div key={field.name} className="flex flex-col gap-1.5">
          <label htmlFor={field.name} className="text-sm font-medium text-[var(--color-text-h)]">
            {field.label || field.name}
          </label>
          <div className="relative">
            <input
              id={field.name}
              type="file"
              accept={field.accept || '*'}
              onChange={(e) => handleFieldChange(field, e.target.files[0])}
              disabled={submitting}
              className="w-full text-sm text-[var(--color-text)] file:mr-4 file:py-2.5 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-[var(--color-accent)]/10 file:text-[var(--color-accent)] hover:file:bg-[var(--color-accent)]/20 file:cursor-pointer cursor-pointer"
            />
          </div>
          {fileMap[field.name] && (
            <p className="text-xs text-[var(--color-text)]">Selected: {fileMap[field.name].name}</p>
          )}
          {errors[field.name] && <p className="text-red-500 text-xs mt-0.5">{errors[field.name]}</p>}
        </div>
      )
    }

    if (field.type === 'select') {
      return (
        <Select
          key={field.name}
          {...commonProps}
          options={field.options || []}
          value={formData[field.name] || ''}
          onChange={(e) => handleFieldChange(field, e.target.value)}
        />
      )
    }

    if (field.type === 'textarea') {
      return (
        <div key={field.name} className="flex flex-col gap-1.5">
          {commonProps.label && (
            <label htmlFor={commonProps.id} className="text-sm font-medium text-[var(--color-text-h)]">
              {commonProps.label}
            </label>
          )}
          <textarea
            id={commonProps.id}
            name={commonProps.name}
            placeholder={commonProps.placeholder}
            value={formData[field.name] || ''}
            onChange={(e) => handleFieldChange(field, e.target.value)}
            disabled={commonProps.disabled}
            rows={4}
            className={`w-full px-4 py-3 rounded-xl border bg-[var(--color-bg)] text-[var(--color-text-h)] text-sm outline-none transition-all duration-200 placeholder:text-[var(--color-text)]/50 focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 resize-none ${
              errors[field.name] ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : 'border-[var(--color-border)]'
            }`}
          />
          {errors[field.name] && <p className="text-red-500 text-xs mt-0.5">{errors[field.name]}</p>}
        </div>
      )
    }

    if (field.type === 'checkbox') {
      return (
        <div key={field.name} className="flex items-center gap-3">
          <input
            type="checkbox"
            id={field.name}
            name={field.name}
            checked={formData[field.name] || false}
            onChange={(e) => handleFieldChange(field, e.target.checked)}
            disabled={submitting}
            className="w-4 h-4 rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
          />
          <label htmlFor={field.name} className="text-sm text-[var(--color-text-h)] cursor-pointer">
            {field.label || field.name}
          </label>
        </div>
      )
    }

    return (
      <Input
        key={field.name}
        {...commonProps}
        type={field.type === 'password' ? 'password' : field.type === 'number' ? 'number' : 'text'}
        value={formData[field.name] || ''}
        onChange={(e) => handleFieldChange(field, e.target.value)}
      />
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <Spinner size={32} />
      </div>
    )
  }

  if (!nicheDetail) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <p className="text-[var(--color-text)]">Form data not available.</p>
      </div>
    )
  }

  const progress = steps.length > 1 ? ((currentStep + 1) / steps.length) * 100 : 100

  return (
    <div className="min-h-screen flex items-start justify-center px-4 pt-28 pb-12">
      <div className="w-full max-w-2xl">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-[var(--color-text-h)]">{nicheDetail.name || 'Complete Your Profile'}</h1>
          {nicheDetail.description && (
            <p className="text-[var(--color-text)] mt-1 text-sm">{nicheDetail.description}</p>
          )}
        </div>

        {steps.length > 1 && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {steps.map((step, i) => (
                <button
                  key={i}
                  onClick={() => i <= currentStep && setCurrentStep(i)}
                  disabled={i > currentStep}
                  className={`text-xs font-medium px-3 py-1 rounded-full border transition-all duration-200 cursor-pointer ${
                    i === currentStep
                      ? 'bg-[var(--color-accent)] text-white border-[var(--color-accent)]'
                      : i < currentStep
                      ? 'bg-[var(--color-accent)]/10 text-[var(--color-accent)] border-[var(--color-accent)]/30'
                      : 'bg-transparent text-[var(--color-text)] border-[var(--color-border)] cursor-not-allowed'
                  }`}
                >
                  {step.title || step.label || `Step ${i + 1}`}
                </button>
              ))}
            </div>
            <div className="w-full h-1.5 bg-[var(--color-border)] rounded-full overflow-hidden">
              <div
                className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="bg-[var(--color-card)] border border-[var(--color-border)] rounded-2xl p-6 sm:p-8">
          <div className="flex flex-col gap-5">
            {fieldsByStep[currentStep]?.map(renderField)}
            {(steps.length === 0 || (fieldsByStep[currentStep] && fieldsByStep[currentStep].length === 0)) && (
              <p className="text-center text-[var(--color-text)] py-8">No fields in this step.</p>
            )}
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[var(--color-border)]">
            {currentStep > 0 ? (
              <button
                onClick={handlePrev}
                disabled={submitting}
                className="px-6 py-2.5 rounded-full border border-[var(--color-border)] text-[var(--color-text-h)] text-sm font-medium bg-transparent cursor-pointer transition-all duration-200 hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] disabled:opacity-50"
              >
                Previous
              </button>
            ) : (
              <div />
            )}

            {currentStep < steps.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-[var(--color-accent-light)]"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="px-6 py-2.5 rounded-full bg-[var(--color-accent)] text-white text-sm font-semibold border-none cursor-pointer transition-all duration-200 hover:bg-[var(--color-accent-light)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
              >
                {submitting && <Spinner size={16} />}
                {submitting ? 'Submitting...' : 'Submit'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default VendorForm
