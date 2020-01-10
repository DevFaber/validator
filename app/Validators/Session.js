'use strict'

const Antl = use('Antl')

class Session {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      email: 'required|email',
      password: 'required|min:6',
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Session
