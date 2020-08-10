export const useFormRules = () => {
  const required = (value) => !!value || 'Required.'
  const digitonly = (value) => {
    const pattern = /\D/
    return pattern.test(value) ? 'Invalid Input.' : true
  }
  const email = (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  }
  const textonly = (value) => {
    const pattern = /[0-9~`!@#$%^&*()_\\\-+={[\]}|;:'",<.>/?]/
    return pattern.test(value) ? 'Invalid Input.' : false
  }

  return {
    digitonly,
    email,
    required,
    textonly,
  }
}
