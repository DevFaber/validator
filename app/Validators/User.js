'use strict'

const Antl = use('Antl')

class User {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      company_id: 'required',
      name: 'required',
      cpf: 'required|min:11|unique:users',
      office: 'required',
      email: 'email|unique:users',
      password: 'min:6',
      is_admin: 'required',
      is_active: 'required',
    }
  }

  get messages() {
    return Antl.list('validation')
  }
}

module.exports = User
