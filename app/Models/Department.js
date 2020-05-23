'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Department extends Model {
  companies() {
    return this.belongsTo('App/Models/Company')
  }
}

module.exports = Department
