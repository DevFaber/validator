'use strict'

const Model = use('Model')

class Validation extends Model {
  users() {
    return this.belongsTo('App/Models/User')
  }
  companies() {
    return this.belongsTo('App/Models/Company')
  }
  departments() {
    return this.belongsTo('App/Models/Department')
  }
}

module.exports = Validation
