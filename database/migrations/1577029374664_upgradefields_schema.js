'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UpgradefieldsSchema extends Schema {
  async up() {
    await this.table('users', table => {
      table.string('office', 40)
      table.boolean('is_active')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
    await this.table('companies', table => {
      table.string('CNPJ', 20).unique()
      table.boolean('is_active')
      table
        .integer('file_id')
        .unsigned()
        .references('id')
        .inTable('files')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
    })
  }

  async down() {
    await this.table('users', table => {
      table.dropColumns(['office', 'is_active', 'file_id'])
    })

    await this.table('companies', table => {
      table.dropColumns(['CNPJ', 'is_active', 'file_id'])
    })
  }
}

module.exports = UpgradefieldsSchema

/*








  */
