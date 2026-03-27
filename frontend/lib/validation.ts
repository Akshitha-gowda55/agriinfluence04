// lib/validation.ts

import { Address, Review } from '@/types'

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface LoginFormValues {
  email: string
  password: string
}

export interface SignupFormValues {
  name: string
  email: string
  password: string
  confirmPassword: string
  phone?: string
}

export interface SupportFormValues {
  name: string
  email: string
  subject: string
  message: string
}

export interface ReviewFormValues {
  rating: number
  comment: string
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
}

export function isValidPhone(phone: string): boolean {
  return /^[6-9]\d{9}$/.test(phone.trim())
}

export function isValidPincode(pincode: string): boolean {
  return /^\d{6}$/.test(pincode.trim())
}

export function validateLogin(values: LoginFormValues): ValidationResult {
  const errors: Record<string, string> = {}

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateSignup(values: SignupFormValues): ValidationResult {
  const errors: Record<string, string> = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  } else if (values.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.password.trim()) {
    errors.password = 'Password is required'
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 characters'
  }

  if (!values.confirmPassword.trim()) {
    errors.confirmPassword = 'Confirm password is required'
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  if (values.phone && values.phone.trim() && !isValidPhone(values.phone)) {
    errors.phone = 'Enter a valid 10-digit phone number'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateAddress(address: Address): ValidationResult {
  const errors: Record<string, string> = {}

  if (!address.fullName.trim()) {
    errors.fullName = 'Full name is required'
  }

  if (!address.phone.trim()) {
    errors.phone = 'Phone number is required'
  } else if (!isValidPhone(address.phone)) {
    errors.phone = 'Enter a valid 10-digit phone number'
  }

  if (!address.addressLine1.trim()) {
    errors.addressLine1 = 'Address line 1 is required'
  }

  if (!address.city.trim()) {
    errors.city = 'City is required'
  }

  if (!address.state.trim()) {
    errors.state = 'State is required'
  }

  if (!address.pincode.trim()) {
    errors.pincode = 'Pincode is required'
  } else if (!isValidPincode(address.pincode)) {
    errors.pincode = 'Enter a valid 6-digit pincode'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateSupportForm(
  values: SupportFormValues
): ValidationResult {
  const errors: Record<string, string> = {}

  if (!values.name.trim()) {
    errors.name = 'Name is required'
  }

  if (!values.email.trim()) {
    errors.email = 'Email is required'
  } else if (!isValidEmail(values.email)) {
    errors.email = 'Enter a valid email address'
  }

  if (!values.subject.trim()) {
    errors.subject = 'Subject is required'
  }

  if (!values.message.trim()) {
    errors.message = 'Message is required'
  } else if (values.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateReview(values: ReviewFormValues): ValidationResult {
  const errors: Record<string, string> = {}

  if (!values.rating || values.rating < 1 || values.rating > 5) {
    errors.rating = 'Rating must be between 1 and 5'
  }

  if (!values.comment.trim()) {
    errors.comment = 'Review comment is required'
  } else if (values.comment.trim().length < 5) {
    errors.comment = 'Review must be at least 5 characters'
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function validateRequiredText(
  value: string,
  fieldName: string
): string {
  if (!value.trim()) {
    return `${fieldName} is required`
  }

  return ''
}

export function validatePositiveNumber(
  value: number,
  fieldName: string
): string {
  if (Number.isNaN(value) || value < 0) {
    return `${fieldName} must be a valid positive number`
  }

  return ''
}

export function canSubmitOrder(address: Address, itemsCount: number): boolean {
  const addressValidation = validateAddress(address)
  return addressValidation.isValid && itemsCount > 0
}

export function sanitizeInput(value: string): string {
  return value.trim().replace(/\s+/g, ' ')
}