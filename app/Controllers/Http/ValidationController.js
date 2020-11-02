'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const User = use('App/Models/User')
const Validation = use('App/Models/Validation')
const { subHours } = require('date-fns')

class ValidationController {
  async store ({ request, response }) {
    const presentTime = new Date()
    const period = subHours(presentTime, 2)

    try {
      const data = request.only(['cpf'])
      const user = await User.findByOrFail(data)

      await user.load('departments', departments => {
        departments.setVisible(['id', 'name'])
      })

      await user.load('companies', company => {
        company.setVisible(['razao'])
      })

      const hasValidate = await Validation.query()
        .where('user_id', user.id)
        .whereBetween('created_at', [period, presentTime])
        .fetch()

      const hasValidateData = await hasValidate.toJSON()
      if (hasValidateData[0]) {
        return response.status(404).json({ message: 'É permitida uma única refeição por período!' })
      }

      const validation = await Validation.create({
        user_id: user.id,
        department_id: user.department_id,
        company_id: user.company_id
      })

      const userData = await user.toJSON()

      const details = {
        id: userData.id,
        name: userData.name,
        office: userData.office,
        departments: userData.departments.name,
        companies: userData.companies.razao,
        created: validation.created_at,
        validation_id: validation.id
      }

      return details
    } catch (error) {
      return response.status(404).json({ message: 'Usuario não cadastrado' })
    }
  }

  async index ({ request, response }) {
    const { company_id, user_id, data1, data2 } = request.all()
    const { page } = request.get()

    let validations = []

    if (!company_id && !user_id) {
      validations = await Validation.query()
        .setVisible(['id', 'user_id', 'created_at'])
        .whereBetween('created_at', [data1, data2])
        .with('companies')
        .with('users', (builder) => {
          builder.setVisible(['id', 'name', 'is_active', 'cpf', 'office'])
        })
        .with('departments', (department) => {
          department.setVisible(['id', 'name', 'company_id'])
        })
        .paginate(page, 10000)
    }

    if (company_id && !user_id) {
      validations = await Validation.query()
        .where('company_id', company_id)
        .whereBetween('created_at', [data1, data2])
        .with('users', (user) => {
          user.setVisible([
            'id',
            'name',
            'is_active',
            'cpf',
            'office',
            'departments.name'
          ])
        })
        .with('companies', (company) => {
          company.setVisible(['id', 'razao', 'cidade', 'CNPJ'])
        })
        .with('departments', (department) => {
          department.setVisible(['id', 'name', 'company_id'])
        })
        .setVisible(['id', 'user_id', 'created_at'])
        .orderBy('id', 'asc')
        .paginate(page, 10000)
    }

    if (company_id && user_id) {
      validations = await Validation.query()
        .whereBetween('created_at', [data1, data2])
        .where('company_id', company_id)
        .where('user_id', user_id)
        .with('users', (user) => {
          user.setVisible([
            'id',
            'name',
            'is_active',
            'cpf',
            'office',
            'departments.name'
          ])
        })
        .with('companies', (company) => {
          company.setVisible(['id', 'razao', 'cidade', 'CNPJ'])
        })
        .with('departments', (department) => {
          department.setVisible(['id', 'name', 'company_id'])
        })
        .paginate(page, 10000)
    }

    return validations.toJSON().data
  }
}

module.exports = ValidationController
