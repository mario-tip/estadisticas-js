'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GrupoSchema extends Schema {
    up () {
    this.create('grupos', (table) => {
      table.increments()
      table.string('img',50)
      table.string('nombre',150).notNullable()
      table.string('direccion',254).notNullable()
      table.string('telefono',12).notNullable()
      table.string('correo',254).notNullable()
      table.string('estado',50)
      table.string('pais',50)
      table.timestamp('deleted_at').nullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('grupos')
  }
}

module.exports = GrupoSchema
