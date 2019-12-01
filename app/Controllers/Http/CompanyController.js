'use strict'

const Company = use('App/Models/Company')

class CompanyController {
  async index({ request, response, view }) {
    const companies = await Company.all()

    return companies
  }

  async store({ request }) {
    const data = request.only(['razao', 'bairro', 'cidade'])

    const company = Company.create(data)

    // não precisa usar o metodo de response pois a flag api--only do Adonis ja retorna JSON automatico
    return company
  }

  async show({ params, request, response, view }) {}

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {}

  async destroy({ params, request, response }) {}
}

module.exports = CompanyController
