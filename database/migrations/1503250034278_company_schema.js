'use strict'

const Schema = use('Schema')

class CompanySchema extends Schema {
  up() {
    this.create('companies', table => {
      table.increments()
      table.string('razao', 80).notNullable()
      table.string('bairro', 40).notNullable()
      table.string('cidade', 40).notNullable()
      table.timestamps()
    })
  }

  down() {
    this.drop('companies')
  }
}

module.exports = CompanySchema
