'use client'

import { createContext, useContext, useState, useCallback } from 'react'
import CustomAlert from '@/components/app-components/alert/CustomAlert'

const AlertContext = createContext({})

export const useAlert = () => {
  const context = useContext(AlertContext)
  if (context === undefined) {
    throw new Error('useAlert must be used within an AlertProvider')
  }
  return context
}

export const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState(null)
  const [isVisible, setIsVisible] = useState(false)

  const showAlert = useCallback((message, type = 'info', duration = 5000) => {
    setAlert({ message, type, duration })
    setIsVisible(true)
  }, [])

  const hideAlert = useCallback(() => {
    setIsVisible(false)
    setTimeout(() => setAlert(null), 400)
  }, [])

  return (
    <AlertContext.Provider value={{ showAlert, hideAlert }}>
      {children}
      {alert && <CustomAlert type={alert.type} message={alert.message} duration={alert.duration} onClose={hideAlert} />}
    </AlertContext.Provider>
  )
}

export default AlertContext
