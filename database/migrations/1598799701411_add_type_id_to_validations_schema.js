'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTypeIdToValidationsSchema extends Schema {
  async up () {
    await this.table('validations', (table) => {
      table.integer('type_id')
    })
  }

  async down () {
    await this.table('add_type_id_to_validations', (table) => {
      table.dropColumn('type_id')
    })
  }
}

module.exports = AddTypeIdToValidationsSchema
