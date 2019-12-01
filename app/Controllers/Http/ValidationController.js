'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Validation = use('App/Models/Validation')

class ValidationController {
  async store({ request, response }) {
    const data = request.only(['cpf'])

    const user = await User.findByOrFail(data)

    if (!user) {
      return response
        .status(err.status)
        .send({ error: { message: 'Usuario não cadastrado' } })
    }

    const { id, company_id } = user

    const validation = await Validation.create({
      user_id: id,
      company_id: company_id,
    })

    return validation
  }

  async index({ request }) {
    const { company_id } = request.all()

    const list = await Validation.query()
      .where('company_id', company_id)
      .with('users')
      .with('companies')
      //.orderBy()
      .fetch()

    return list
  }

  async index() {
    const validations = Validation.query()
      .with('users')
      .with('companies')
      .fetch()

    return validations
  }
}

module.exports = ValidationController
