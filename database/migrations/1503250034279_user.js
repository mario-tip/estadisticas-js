'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserSchema extends Schema {
  up () {
    this.create('users', (table) => {
      table.increments()
      // table.string('username', 80).notNullable().unique()
      table.string('email', 254).unique()
      table.string('password', 60)
      table.string('tel_celular',20)
      table.string('tel_casa',10)
      table.string('img_url',20)
      table.string('nombre',50).notNullable()
      table.string('apellidos',150).notNullable()
      table.date('fecha_nac').notNullable()
      table.string('lugar_nac',200).notNullable()

      table.string('direccion',254).notNullable()
      table.string('latitud',10).notNullable()
      table.string('longitud',10).notNullable()
      table.string('calle',100).notNullable()
      table.string('numero',10).notNullable()
      table.string('colonia',200).notNullable()
      table.integer('cp',5).notNullable()

      table.enu('estado_civil',['CASADO CHICO','CASADO GRANDE','SOLO','JOVEN']).notNullable()
      table.enu('genero',['HOMBRE','MUJER']).notNullable()
      table.enu('tipo_usuario',['ADMINISTRADOR','MIEMBRO']).notNullable()

      table.integer('grupo_id').unsigned().references('id').inTable('grupos').notNullable()
      table.timestamp('deleted_at').nullable()
      table.timestamps()
      })
  }

  down () {
    this.drop('users')
  }
}

module.exports = UserSchema
