'use strict'

const Route = use('Route')

Route.post('validations', 'ValidationController.store')
Route.post('passwords', 'ForgotPasswordController.store')
Route.put('passwords', 'ForgotPasswordController.update')
Route.post('sessions', 'SessionController.store')

Route.group(() => {
  Route.post('companies', 'CompanyController.store')
  Route.get('companies', 'CompanyController.index')

  Route.post('users', 'UserController.store')
  Route.get('users', 'UserController.index')

  Route.get('listvalidations', 'ValidationController.index')
  Route.get('validations', 'ValidationController.index')
  Route.post('files', 'FileController.store')
  Route.get('files/:id', 'FileController.show')
}).middleware(['auth'])
