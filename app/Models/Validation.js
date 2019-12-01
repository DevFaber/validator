'use strict'

const Model = use('Model')

class Validation extends Model {
  users() {
    return this.belongsTo('App/Models/User')
  }
  companies() {
    return this.belongsTo('App/Models/Company')
  }
}

module.exports = Validation
