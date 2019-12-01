'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up() {
    this.create('users', table => {
      table.increments(),
        table
          .integer('company_id')
          .unsigned()
          .references('id')
          .inTable('companies')
          .onUpdate('CASCADE')
          .onDelete('SET NULL')
      table.string('name', 80).notNullable()
      table
        .string('cpf', 11)
        .notNullable()
        .unique()
      table.string('email', 254).unique()
      table.string('password', 60)
      table.boolean('is_admin').notNullable()
      table.string('token')
      table.timestamp('token_created_at')
      table.timestamps()
    })
  }

  down() {
    this.drop('users')
  }
}

module.exports = UserSchema
