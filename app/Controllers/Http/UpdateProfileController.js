'use strict'

const User = use('App/Models/User')
const Hash = use('Hash')

class UpdateProfileController {
  async show ({ params, response }) {}

  async update ({ params, request, response }) {
    try {
      const user = await User.find(params.id)

      const { name, email, old_password, password } = request.all()

      if (email !== user.email) {
        const checkEmail = await User.findBy('email', email)

        if (checkEmail) {
          return response.status(404).json({ message: 'Email já existe!' })
        }
      }

      if (old_password || password) {
        const confirmPass = await Hash.verify(old_password, user.password)

        if (!confirmPass) {
          return response.status(404).json({ message: 'Senha antiga não confere!' })
        }
      }

      const data = {
        name,
        email,
        password
      }

      user.merge(data)

      await user.save()

      return user
    } catch (error) {
      return response.status(404).json({ message: 'Falha ao atualizar perfil, confira seus dados!' })
    }
  }
}

module.exports = UpdateProfileController
