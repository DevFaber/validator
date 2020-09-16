'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddTerminalIdToUserSchema extends Schema {
  async up () {
    await this.table('users', (table) => {
      table.integer('terminal_id')
    })
  }

  async down () {
    await this.table('users', (table) => {
      table.dropColumn('terminal_id')
    })
  }
}

module.exports = AddTerminalIdToUserSchema
