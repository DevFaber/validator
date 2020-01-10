'use strict'
const Antl = use('Antl')

class Company {
  get validateAll() {
    return true
  }

  get rules() {
    return {
      razao: 'required|unique:companies',
      bairro: 'required',
      cidade: 'required',
      is_active: 'required',
    }
  }
  get messages() {
    return Antl.list('validation')
  }
}

module.exports = Company
