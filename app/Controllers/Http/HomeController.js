'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Validation = use('App/Models/Validation')

class ValidationController {
  async index({ request, response }) {
    const { company_id, user_id, data1, data2 } = request.all()

    // const validations = await Validation.query()
    //   .select('user_id', 'COUNT(user_id)')
    //   .groupBy('user_id')
    //   .fetch()

    const validations = await Validation.query()

      //.countDistinct('user_id as user_id')
      .select('user_id')
      .groupBy('user_id')
      .count('* as total')

    console.log(validations)

    return validations
  }
}

module.exports = ValidationController
