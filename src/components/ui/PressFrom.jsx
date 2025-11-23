'use client'

import { useState, useCallback, useMemo, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import CustomAlert from '@/components/app-components/alert/CustomAlert'
import MainBtn from '@/components/ui/buttons/MainBtn.jsx'

const COUNTRY_CODES = [
  { code: '+20', country: '🇪🇬 Egypt', flag: '🇪🇬' },
  { code: '+966', country: '🇸🇦 Saudi Arabia', flag: '🇸🇦' },
  { code: '+965', country: '🇰🇼 Kuwait', flag: '🇰🇼' },
  { code: '+44', country: '🇬🇧 United Kingdom', flag: '🇬🇧' },
  { code: '+1', country: '🇺🇸 United States', flag: '🇺🇸' },
  { code: '+49', country: '🇩🇪 Germany', flag: '🇩🇪' },
  { code: '+91', country: '🇮🇳 India', flag: '🇮🇳' },
  { code: '+34', country: '🇪🇸 Spain', flag: '🇪🇸' },
  { code: '+39', country: '🇮🇹 Italy', flag: '🇮🇹' },
  { code: '+55', country: '🇧🇷 Brazil', flag: '🇧🇷' },
  { code: '+61', country: '🇦🇺 Australia', flag: '🇦🇺' },
  { code: '+81', country: '🇯🇵 Japan', flag: '🇯🇵' },
  { code: '+86', country: '🇨🇳 China', flag: '🇨🇳' },
  { code: '+33', country: '🇫🇷 France', flag: '🇫🇷' },
]
const INITIAL_FORM_DATA = {
  firstName: '',
  lastName: '',
  company: '',
  email: '',
  countryCode: '+20',
  phone: '',
  updates: 'No',
  agree: false,
}
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const MIN_PHONE_LENGTH = 8
const ALERT_TIMEOUT = 5000
// EmailJS Configuration - Replace with your actual values
const EMAILJS_CONFIG = {
  serviceId: 'YOUR_SERVICE_ID',
  templateId: 'YOUR_TEMPLATE_ID',
  publicKey: 'YOUR_PUBLIC_KEY',
}
const AUTO_SAVE_KEY = 'jadar_press_form_draft'
const AUTO_SAVE_INTERVAL = 2000
const calculateProgress = (formData) => {
  const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'agree']
  const optionalFields = ['company', 'updates']

  let filledRequired = 0
  let filledOptional = 0

  requiredFields.forEach((field) => {
    if (field === 'agree') {
      if (formData[field]) filledRequired++
    } else if (field === 'phone') {
      if (formData[field].replace(/\D/g, '').length >= MIN_PHONE_LENGTH) filledRequired++
    } else {
      if (formData[field].trim()) filledRequired++
    }
  })

  optionalFields.forEach((field) => {
    if (field === 'updates') {
      filledOptional++
    } else if (formData[field].trim()) {
      filledOptional++
    }
  })

  const requiredProgress = (filledRequired / requiredFields.length) * 80 // 80% for required
  const optionalProgress = (filledOptional / optionalFields.length) * 20 // 20% for optional

  return Math.round(requiredProgress + optionalProgress)
}

export default function PressForm() {
  const [formData, setFormData] = useState(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [alert, setAlert] = useState({ show: false, type: '', message: '' })
  const [progress, setProgress] = useState(0)
  const [isAutoSaved, setIsAutoSaved] = useState(false)
  const [lastSaved, setLastSaved] = useState(null)

  useEffect(() => {
    const savedData = localStorage.getItem(AUTO_SAVE_KEY)
    if (savedData) {
      try {
        const parsedData = JSON.parse(savedData)
        setFormData(parsedData)
        setProgress(calculateProgress(parsedData))
        setLastSaved(new Date())
        showAlert('info', 'Previous form data restored')
      } catch (error) {
        console.error('Error loading saved form data:', error)
        localStorage.removeItem(AUTO_SAVE_KEY)
      }
    }
  }, [])

  // auto-save data
  useEffect(() => {
    const saveTimer = setTimeout(() => {
      // Only save if form has meaningful data
      const hasData = Object.values(formData).some((value) => (typeof value === 'string' ? value.trim() : value === true))

      if (hasData && !submitted) {
        localStorage.setItem(AUTO_SAVE_KEY, JSON.stringify(formData))
        setIsAutoSaved(true)
        setLastSaved(new Date())

        // Hide auto-save indicator after 2 seconds
        setTimeout(() => setIsAutoSaved(false), 2000)
      }
    }, AUTO_SAVE_INTERVAL)

    return () => clearTimeout(saveTimer)
  }, [formData, submitted])

  // update progress when data changes
  useEffect(() => {
    setProgress(calculateProgress(formData))
  }, [formData])

  // utility funcs
  const formatPhoneNumber = useCallback((value, countryCode) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '')

    // Apply formatting based on country code
    switch (countryCode) {
      case '+1': // US/Canada: (XXX) XXX-XXXX
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`
        return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`

      case '+44': // UK: XXXX XXX XXXX
        if (digits.length <= 4) return digits
        if (digits.length <= 7) return `${digits.slice(0, 4)} ${digits.slice(4)}`
        return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7, 11)}`

      case '+20': // Egypt: XXX XXX XXXX
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 10)}`

      case '+33': // France: XX XX XX XX XX
        return digits.replace(/(\d{2})(?=\d)/g, '$1 ').trim()

      case '+49': // Germany: XXX XXXXXXX
        if (digits.length <= 3) return digits
        return `${digits.slice(0, 3)} ${digits.slice(3)}`

      default: // Generic formatting: XXX XXX XXXX
        if (digits.length <= 3) return digits
        if (digits.length <= 6) return `${digits.slice(0, 3)} ${digits.slice(3)}`
        return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`
    }
  }, [])

  const showAlert = useCallback((type, message) => {
    setAlert({ show: true, type, message })
    setTimeout(() => setAlert((prev) => ({ ...prev, show: false })), ALERT_TIMEOUT)
  }, [])

  const clearSavedData = useCallback(() => {
    localStorage.removeItem(AUTO_SAVE_KEY)
    setIsAutoSaved(false)
    setLastSaved(null)
  }, [])

  const scrollToError = useCallback((fieldName) => {
    const errorElement = document.querySelector(`[name="${fieldName}"]`)
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' })
      errorElement.focus()
    }
  }, [])

  const validateForm = useCallback(() => {
    const newErrors = {}

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'Please enter your first name'
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Please enter your last name'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email address is required'
    } else if (!EMAIL_REGEX.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    const phoneDigits = formData.phone.replace(/\D/g, '')
    if (!phoneDigits) {
      newErrors.phone = 'Phone number is required'
    } else if (phoneDigits.length < MIN_PHONE_LENGTH) {
      newErrors.phone = 'Phone number is too short'
    }

    if (!formData.agree) {
      newErrors.agree = 'You must agree to the terms before submitting'
    }

    return newErrors
  }, [formData])

  const handleChange = useCallback(
    (e) => {
      const { name, value, type, checked } = e.target

      setFormData((prev) => {
        const newData = {
          ...prev,
          [name]: type === 'checkbox' ? checked : value,
        }

        // Auto-format phone number
        if (name === 'phone') {
          newData.phone = formatPhoneNumber(value, prev.countryCode)
        }

        // Re-format phone when country code changes
        if (name === 'countryCode') {
          newData.phone = formatPhoneNumber(prev.phone, value)
        }

        return newData
      })

      // Clear error when user starts typing
      if (errors[name]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[name]
          return newErrors
        })
      }
    },
    [errors, formatPhoneNumber]
  )

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const validationErrors = validateForm()
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        showAlert('error', 'Please fix the errors in the form')
        scrollToError(Object.keys(validationErrors)[0])
        return
      }

      setErrors({})
      setLoading(true)

      const templateParams = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        company: formData.company,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`,
        updates: formData.updates,
        agree: formData.agree ? 'Yes' : 'No',
      }

      try {
        await emailjs.send(EMAILJS_CONFIG.serviceId, EMAILJS_CONFIG.templateId, templateParams, EMAILJS_CONFIG.publicKey)

        setSubmitted(true)
        clearSavedData()
        showAlert('success', 'Your message has been sent successfully!')
      } catch (error) {
        console.error('EmailJS Error:', error)
        showAlert('error', 'Something went wrong. Please try again later.')
      } finally {
        setLoading(false)
      }
    },
    [formData, validateForm, showAlert, scrollToError, clearSavedData]
  )

  const inputClassName = useCallback(
    (hasError) =>
      `w-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-main duration-300 ${hasError ? 'border-main' : 'border-bg/35'}`,
    []
  )

  const countryOptions = useMemo(
    () =>
      COUNTRY_CODES.map(({ code, country }) => (
        <option key={code} value={code}>
          {country} ({code})
        </option>
      )),
    []
  )

  const ProgressIndicator = () => (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-bg">Form Progress</span>
        <span className="text-sm text-bg">{progress}%</span>
      </div>
      <div className="w-full bg-bg/20 rounded-full h-2">
        <div className="bg-main h-2 rounded-full transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="flex justify-between items-center mt-1 text-xs text-bg/70">
        <span>Complete the required fields to submit</span>
        {isAutoSaved && <span className="text-green-400 animate-pulse">✓ Auto-saved</span>}
        {lastSaved && !isAutoSaved && <span>Last saved: {lastSaved.toLocaleTimeString()}</span>}
      </div>
    </div>
  )

  if (submitted) {
    return (
      <section className="relative w-screen overflow-hidden bg-text text-bg py-24 px-4">
        <div className="text-center">
          <h2 className="text-2xl text-green-600 font-semibold mb-4">✅ Thank you for contacting us!</h2>
          <p className="text-bg">
            We will get back to you shortly at <b>{formData.email}</b>.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section dir="ltr" className="relative w-screen overflow-hidden bg-text text-bg py-24 px-4">
      {alert.show && (
        <div className="fixed bottom-4 right-4 z-50">
          <CustomAlert type={alert.type} message={alert.message} />
        </div>
      )}

      <h1 className="text-5xl max-sm:text-3xl font-light text-bg mb-8 uppercase">Your contact details</h1>

      <ProgressIndicator />

      <form onSubmit={handleSubmit} className="space-y-6 font-light uppercase">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label className="block text-sm mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={inputClassName(errors.firstName)}
            />
            {errors.firstName && <CustomAlert type="error" message={errors.firstName} className="mt-1" />}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={inputClassName(errors.lastName)}
            />
            {errors.lastName && <CustomAlert type="error" message={errors.lastName} className="mt-1" />}
          </div>

          {/* Company Name */}
          <div>
            <label className="block text-sm mb-1">Company Name</label>
            <input type="text" name="company" value={formData.company} onChange={handleChange} className={inputClassName(false)} />
          </div>

          {/* Email Address */}
          <div>
            <label className="block text-sm mb-1">Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} className={inputClassName(errors.email)} />
            {errors.email && <CustomAlert type="error" message={errors.email} className="mt-1" />}
          </div>

          {/* Phone Number with Auto-formatting */}
          <div>
            <label className="block text-sm mb-1">Phone Number</label>
            <div className="flex gap-3">
              <select
                name="countryCode"
                value={formData.countryCode}
                onChange={handleChange}
                className="px-3 py-2 border focus:outline-none focus:ring-2 focus:ring-main duration-300 border-bg/35"
              >
                {countryOptions}
              </select>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                className={inputClassName(errors.phone) + ' flex-1'}
              />
            </div>
            {errors.phone && <CustomAlert type="error" message={errors.phone} className="mt-1" />}
          </div>

          {/* Updates Preference */}
          <div className="flex justify-between items-center gap-4">
            <label className="block text-sm">Would you like to receive updates from JADAR?</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input type="radio" name="updates" value="Yes" checked={formData.updates === 'Yes'} onChange={handleChange} />
                Yes
              </label>
              <label className="flex items-center gap-2">
                <input type="radio" name="updates" value="No" checked={formData.updates === 'No'} onChange={handleChange} />
                No
              </label>
            </div>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-center gap-2">
            <input id="agree" type="checkbox" name="agree" checked={formData.agree} onChange={handleChange} className="h-4 w-4" />
            <label htmlFor="agree" className="text-sm select-none">
              I agree to be contacted by <b>JADAR</b>.
            </label>
            {errors.agree && <CustomAlert type="error" message={errors.agree} className="mt-1" />}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || progress < 80}
            className={`py-3 px-6 text-base mt-4 text-text transition disabled:cursor-not-allowed cursor-pointer ${
              progress < 80 ? 'bg-bg/50 opacity-50' : 'bg-main hover:bg-main/90 disabled:opacity-50'
            }`}
            title={progress < 80 ? 'Please complete all required fields' : ''}
          >
            {loading ? 'Sending...' : `Submit ${progress < 100 ? `(${progress}%)` : ''}`}
          </button>

          {/* Clear Saved Data Button */}
          {lastSaved && !submitted && (
            <MainBtn
              text="Clear"
              look="outline"
              fullWidth
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all saved form data?')) {
                  setFormData(INITIAL_FORM_DATA)
                  clearSavedData()
                  setProgress(0)
                  showAlert('info', 'Form data cleared')
                }
              }}
              className="mt-4 text-bg! border-bg/30! hover:bg-main/10"
            />
          )}
        </div>
      </form>
    </section>
  )
}
