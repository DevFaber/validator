'use strict'

const User = use('App/Models/User')

class UserController {
  async store({ request }) {
    const data = request.only([
      'company_id',
      'name',
      'cpf',
      'office',
      'email',
      'password',
      'is_admin',
      'is_active',
    ])

    const user = User.create(data)

    return user
  }

  async index({ request, response, view }) {
    const { company_id } = request.all()

    let users = []

    if (company_id) {
      users = await User.query()
        .where('company_id', company_id)
        .setVisible(['id', 'name', 'cpf', 'email', 'office'])
        .orderBy('id', 'asc')
        .fetch()
    } else {
      users = await User.query()
        .setVisible(['id', 'name', 'cpf', 'email', 'office'])
        .orderBy('id', 'asc')
        .fetch()
    }

    return users
  }

  async update({ params, request }) {
    const user = await User.findOrFail(params.id)

    const data = request.only([
      'company_id',
      'name',
      'cpf',
      'office',
      'email',
      'password',
      'is_admin',
      'is_active',
      'file_id',
    ])

    user.merge(data)

    await user.save()

    return user
  }
  async show({ params }) {
    const user = await User.findOrFail(params.id)

    return user
  }

  async destroy({ params }) {
    const user = User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
