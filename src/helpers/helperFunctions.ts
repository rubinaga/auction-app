export function formatDate(dateSet: number) {
  const date = new Date(dateSet)
  const day = date.getDate().toString().padStart(2, '0')
  const month = (date.getMonth() + 1).toString().padStart(2, '0')
  const year = date.getFullYear().toString()

  return `${day}.${month}.${year}`
}

export function daysLeftFromThisMoment(date: number) {
  const currentDate = new Date().getTime()
  const ONE_DAY = 1000 * 60 * 60 * 24
  const differenceMs = Math.abs(date - currentDate)
  const daysDifference = Math.round(differenceMs / ONE_DAY)

  return daysDifference > 1 ? `${daysDifference} days left` : `${daysDifference} day left`
}

export function formatTime(unixTime: number) {
  const date = new Date(unixTime)
  const hours = date.getHours()
  const minutes = date.getMinutes()
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`
  return formattedTime
}

export function combineDateAndTime(unixTimestamp1: number, unixTimestamp2: number) {
  const date1 = new Date(unixTimestamp1) // Multiply by 1000 to convert seconds to milliseconds
  const date2 = new Date(unixTimestamp2)
  const year = date1.getFullYear()
  const month = date1.getMonth()
  const day = date1.getDate()

  const hours = date2.getHours()
  const minutes = date2.getMinutes()

  const combinedDate = new Date(year, month, day, hours, minutes).getTime()

  return combinedDate
}

function validateEmail(email: string) {
  const regex = /^[\w.-]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,})+$/
  return regex.test(email)
}

export function validateForm({ name = '', surname = '', email = '', password = '', confirmPassword = '' }) {
  const formErrors: any = {}

  if (name === '') {
    formErrors.name = 'You must fill in the name'
  }
  if (password === '') {
    formErrors.password = 'You must fill in the password'
  }

  if (email === '') {
    formErrors.email = 'You must fill in the email'
  } else if (!validateEmail(email)) {
    formErrors.email = 'Invalid email'
  }

  if (!password) {
    formErrors.password = 'You must enter a password'
  } else if (password !== confirmPassword) {
    if (!confirmPassword) {
      formErrors.confirmPassword = 'Please confirm the password'
    }
    formErrors.confirmPassword = 'Passwords do not match'
  }
  return formErrors
}
