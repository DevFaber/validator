'use strict'

const Model = use('Model')

const Hash = use('Hash')

class User extends Model {
  static boot() {
    super.boot()

    this.addHook('beforeSave', async userInstance => {
      if (userInstance.dirty.password) {
        userInstance.password = await Hash.make(userInstance.password)
      }
    })
  }
  companies() {
    return this.belongsTo('App/Models/Company')
  }

  tokens() {
    return this.hasMany('App/Models/Token')
  }

  validatinos() {
    return this.hasMany('App/Models/Validation')
  }

  files() {
    return this.hasMany('App/Models/File')
  }
  departments() {
    return this.belongsTo('App/Models/Department')
  }
}

module.exports = User
