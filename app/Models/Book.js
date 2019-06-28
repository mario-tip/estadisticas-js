'use strict'
const Model = use('Model')

class Book extends Model {

  static get table(){
    return 'books'
  }

  static get hidden (){
    return['created_at','updated_at','deleted_at']
  }

  user(){
    return this.belongsTo('App/Models/User')
  }

}

module.exports = Book
