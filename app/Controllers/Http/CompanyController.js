'use strict'

const Company = use('App/Models/Company')

class CompanyController {
  async index ({ request, response, view }) {
    const { id } = request.all()

    let company = []

    if (id) {
      company = await Company.query()
        .where('id', id)
        .setVisible(['id', 'razao', 'CNPJ', 'bairro'])
        .fetch()
    } else if (!id) {
      company = await Company.query()
        .setVisible(['id', 'razao', 'CNPJ', 'bairro'])
        .orderBy('id', 'asc')
        .fetch()
    }
    return company
  }

  async store ({ request }) {
    const data = request.only([
      'razao',
      'bairro',
      'cidade',
      'CNPJ',
      'is_active'
    ])

    const company = Company.create(data)

    return company
  }

  async show ({ params, request }) {}
  //   const { id } = request.all()
  //   const company = await Company.query()
  //     .where('id', id)
  //     .setVisible(['id', 'razao', 'CNPJ', 'bairro'])
  //     .fetch()

  //   return company
  // }

  async edit ({ params, request, response, view }) {}

  async update ({ params, request, response }) {
    const company = await Company.findOrFail(params.id)
    const data = request.only([
      'razao',
      'bairro',
      'cidade',
      'CNPJ',
      'is_active'
    ])

    company.merge(data)

    await company.save()

    return company
  }

  async destroy ({ params }) {
    const company = await Company.findOrFail(params.id)

    await company.delete()
  }
}

module.exports = CompanyController
