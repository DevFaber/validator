'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
  companies() {
    return this.belongsTo('App/Models/Company')
  }
  users() {
    return this.hasMany('App/Models/User')
  }
  validations() {
    return this.hasMany('App/Models/Validation')
  }
}

module.exports = Department
