'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Validation = use('App/Models/Validation')

class ValidationController {
  async store({ request, response }) {
    try {
      const data = request.only(['cpf'])

      const user = await User.findByOrFail(data)

      if (!user) {
        return response.status(404).json({ message: 'Usuario não cadastrado' })
      }

      const { id, company_id } = user

      const validation = await Validation.create({
        user_id: id,
        company_id: company_id,
      })

      return validation
    } catch (error) {
      return response.status(404).json({ message: 'Falha no registro' })
    }
  }

  async index({ request, response }) {
    const { company_id, user_id, data1, data2 } = request.all()
    const { page } = request.get()

    let validations = []

    if (!company_id && !user_id) {
      validations = await Validation.query()
        .setVisible(['id', 'user_id', 'created_at'])
        .whereBetween('created_at', [data1, data2])
        .with('companies')
        .with('users')
        .paginate(page)
    }

    if (company_id && !user_id) {
      validations = await Validation.query()
        .where('company_id', company_id)
        .whereBetween('created_at', [data1, data2])
        .with('users')
        .with('companies')
        .setVisible(['id', 'user_id', 'created_at'])
        .paginate(page, 7)
    }

    if (company_id && user_id) {
      validations = await Validation.query()
        .whereBetween('created_at', [data1, data2])
        .where('company_id', company_id)
        .where('user_id', user_id)
        .with('users')
        .with('companies')
        .paginate(page, 10)
    }

    return validations.toJSON().data
  }
}

module.exports = ValidationController
