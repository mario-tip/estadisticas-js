'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BookSchema extends Schema {
  up () {
    this.create('books', (table) => {
      table.increments()
      table.integer('user_id').notNullable().unsigned()
      table.string('title').notNullable()
      table.string('autor').notNullable()
      table.timestamps()
      table.timestamp('deleted_at').nullable()
      table.foreign('user_id').references('id').on('users')
    })
  }

  down () {
    this.drop('books')
  }
}

module.exports = BookSchema
