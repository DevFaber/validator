'use strict'

const User = use('App/Models/User')

class UserController {
  async store ({ request }) {
    const data = request.only([
      'company_id',
      'name',
      'cpf',
      'office',
      'email',
      'password',
      'is_admin',
      'is_active',
      'department_id'
    ])

    const user = User.create(data)

    return user
  }

  async index ({ request, response, view }) {
    const { company_id, cpf } = request.all()

    let users = []

    if (company_id && !cpf) {
      users = await User.query()
        .where('company_id', company_id)
        .with('departments', (department) => {
          department.setVisible(['name'])
        })
        .with('companies', (company) => {
          company.setVisible(['razao'])
        })
        .setVisible(['id', 'name', 'cpf', 'email', 'office'])
        .orderBy('id', 'asc')
        .fetch()
    } else if

    (!company_id && cpf) {
      users = await User.query()
        .where('cpf', cpf)
        .with('departments', (department) => {
          department.setVisible(['name'])
        })
        .with('companies', (company) => {
          company.setVisible(['razao'])
        })
        .setVisible(['id', 'name', 'cpf', 'email', 'office'])
        .orderBy('id', 'asc')
        .fetch()
    } else if
    (!company_id && !cpf) {
      users = await User.query()
        .with('departments', (department) => {
          department.setVisible(['name'])
        })
        .with('companies', (company) => {
          company.setVisible(['razao'])
        })
        .setVisible(['id', 'name', 'cpf', 'email', 'office'])
        .orderBy('id', 'asc')
        .fetch()
    }

    return users
  }

  async show ({ params, response }) {
    const user = await User.findOrFail(params.id)

    if (!user) {
      return response.status(404).json({ message: 'Usuario não existe' })
    }

    await user.load('departments', departments => {
      departments.setVisible(['id', 'name'])
    })

    await user.load('companies', company => {
      company.setVisible(['id', 'razao'])
    })

    const data = await user.toJSON()

    const userData = {
      id: data.id,
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      office: data.office,
      is_active: data.is_active,
      is_admin: data.is_admin,
      password: data.password,
      company: data && data.companies && data.companies.razao,
      company_id: data && data.companies && data.companies.id,
      department_id: data && data.departments && data.departments.id,
      department: data && data.departments && data.departments.name,
      created_at: data.created_at
    }

    return userData
  }

  async update ({ params, request }) {
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
      'department_id'
    ])

    user.merge(data)

    await user.save()

    return user
  }

  async destroy ({ params }) {
    const user = User.findOrFail(params.id)

    await user.delete()
  }
}

module.exports = UserController
