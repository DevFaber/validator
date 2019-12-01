'use strict'

const Model = use('Model')

class Company extends Model {
  users() {
    return this.hasMany('App/Models/User')
  }
  validations() {
    return this.hasMany('App/Models/Validation')
  }
}

module.exports = Company
