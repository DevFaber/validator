'use strict'

const Company = use('App/Models/Company')

class CompanyController {
  async index({ request, response, view }) {
    const companies = await Company.all()

    return companies
  }

  async store({ request }) {
    const data = request.only([
      'razao',
      'bairro',
      'cidade',
      'CNPJ',
      'is_active',
    ])

    const company = Company.create(data)

    // não precisa usar o metodo de response pois a flag api--only do Adonis ja retorna JSON automatico
    return company
  }

  async show({ params, request, response, view }) {
    const company = Company.findOrFail(params.id)

    return company
  }

  async edit({ params, request, response, view }) {}

  async update({ params, request, response }) {
    const company = await Company.findOrFail(params.id)
    const data = request.only([
      'razao',
      'bairro',
      'cidade',
      'CNPJ',
      'is_active',
    ])

    company.merge(data)

    await company.save()

    return company
  }

  async destroy({ params }) {
    const company = await Company.findOrFail(params.id)

    await company.delete()
  }
}

module.exports = CompanyController
