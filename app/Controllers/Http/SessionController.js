'use strict'

const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()

    const session = await User.findByOrFail('email', email)

    await session.load('departments', departments => {
      departments.setVisible(['id', 'name'])
    })

    await session.load('companies', company => {
      company.setVisible(['id', 'razao'])
    })

    const data = await session.toJSON()

    const user = {
      id: data.id,
      name: data.name,
      email: data.email,
      is_admin: data.is_admin,
      password: data.password,
      file_id: data.file_id,
      terminal_id: data.terminal_id,
      company: data && data.companies && data.companies.razao,
      company_id: data && data.companies && data.companies.id,
      department: data && data.departments && data.departments.name
    }

    if (!user.email) {
      return response.status(401).json({ error: 'User not found' })
    }

    const token = await auth.attempt(email, password)

    return { user, ...token }
  }
}

module.exports = SessionController
