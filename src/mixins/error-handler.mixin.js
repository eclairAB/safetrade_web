// Mixin for parsing and coverting backend error response
// into an accessible data that can be used to display
// error messages in the form

export default {
  data() {
    return {
      errorData: {},
    }
  },
  methods: {
    clearErrorData() {
      this.errorData = {}
    },
    getErrorMessages(fieldName) {
      /*
        Returns array of error messages based on the given `key`.
      */
      if (!fieldName) {
        return []
      }
      let error = this.errorData
      for (let _key of fieldName.split('.')) {
        if (!error) {
          break
        }
        error = error[_key]
      }
      if (error) {
        if (Array.isArray(error)) {
          return error
        } else if (typeof error === 'string') {
          return [error]
        } else if (typeof error === 'object' && 'message' in error) {
          return Array.isArray(error.message) ? error.message : [error.message]
        }
      }
      return []
    },
    setErrorData(err) {
      if (err.errors) {
        this.errorData = { ...err.errors }
      } else {
        this.clearErrorData()
      }
    },
    showCommonErrorMessage() {
      const message = this.getErrorMessages('non_field_errors')
      if (message.length > 0) {
        global.toastr['error'](message[0], 'Error')
      }
    },
  },
}
