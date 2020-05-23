'use strict'

const Route = use('Route')

Route.post('validations', 'ValidationController.store')
Route.post('passwords', 'ForgotPasswordController.store')

Route.put('passwords', 'ForgotPasswordController.update')

Route.post('sessions', 'SessionController.store')

Route.post('users', 'UserController.store')
Route.post('companies', 'CompanyController.store')

Route.get('users', 'UserController.index')
Route.get('users/:id', 'UserController.show')

Route.group(() => {
  Route.resource('departments', 'DepartmentController').apiOnly()
  Route.get('home', 'HomeController.index')

  Route.get('companies', 'CompanyController.index')
  Route.get('companies/:id', 'CompanyController.show')
  Route.get('reports/users/:id', 'ReportsController.show')

  Route.put('companies/:id', 'CompanyController.update')

  Route.put('users/:id', 'UserController.update')
  Route.delete('users/:id', 'UserController.destroy')

  Route.get('listvalidations', 'ValidationController.index')
  Route.get('validations', 'ValidationController.index')
  Route.get('validations/users/:id', 'ValidationController.index')
  Route.get('validations/companies/:id', 'ValidationController.index')
  Route.get('counters', 'CountController.index')

  Route.post('files', 'FileController.store')
  Route.delete('companies/:id', 'CompanyController.destroy')

  Route.get('files/:id', 'FileController.show')
}).middleware(['auth'])
