'use strict'

const Route = use('Route')

Route.post('validations', 'ValidationController.store')
Route.post('passwords', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)

Route.put('passwords', 'ForgotPasswordController.update').validator(
  'ResetPassword'
)

Route.post('sessions', 'SessionController.store').validator('Session')

Route.group(() => {
  Route.get('home', 'HomeController.index')

  Route.get('companies', 'CompanyController.index')
  Route.get('companies/:id', 'CompanyController.show')
  Route.put('companies/:id', 'CompanyController.update')

  Route.get('users', 'UserController.index')
  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.destroy')

  Route.get('listvalidations', 'ValidationController.index')
  Route.get('validations', 'ValidationController.index')
  Route.get('validations/users/:id', 'ValidationController.index')
  Route.get('validations/companies/:id', 'ValidationController.index')

  Route.post('companies', 'CompanyController.store').validator('Company')
  Route.post('users', 'UserController.store').validator('User')
  Route.post('files', 'FileController.store')
  Route.delete('companies/:id', 'CompanyController.destroy')

  Route.get('files/:id', 'FileController.show')
}).middleware(['auth'])
