'use strict'
const Route = use('Route')
// IDEA: libros
Route.resource('books', 'BookController').apiOnly().middleware('auth')
// IDEA: ususarios
Route.resource('users','UserController').apiOnly().middleware('auth')
// IDEA: GrupoSchema
Route.resource('groups','GrupoController').apiOnly().middleware('auth')
// IDEA: autenticacion
Route.post('login','AuthController.login')
Route.get('user','AuthController.GetUser').middleware('auth')
