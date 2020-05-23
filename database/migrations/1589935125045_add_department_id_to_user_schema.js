'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDepartmentIdToUserSchema extends Schema {
  async up() {
    await this.table('users', table => {
      table
        .integer('department_id')
        .unsigned()
        .references('id')
        .inTable('departments')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
    })
  }

  async down() {
    await this.table('users', table => {
      table.dropColumns(['department_id'])
    })
  }
}

module.exports = AddDepartmentIdToUserSchema
