'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request }) {
    const data = request.only([
      'company_id',
      'name',
      'cpf',
      'email',
      'password',
      'is_admin',
    ])

    const user = User.create(data)

    return user
  }

  async index({ reques, response, view }) {
    const users = await User.all()

    return users
  }
}

module.exports = UserController
