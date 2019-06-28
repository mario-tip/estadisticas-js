'use strict'

const User = use('App/Models/User');
const { validate } = use('Validator')

class UserController {

  async index ({ request,response }) {
    let datos = await User.all()
    return datos
  }

  async store ({request, response}){
    const infoUser = request.only(['username','email','password'])
    const rules = {
      email : 'email|unique:users',
      nombre : 'required',
      paellidos : 'required',
      fecha_nac : 'required',
      // nombre : 'required',
      // nombre : 'required',
      // nombre : 'required',
      // nombre : 'required',
    }
    const validation = await validate(request.all(), rules)
    if(validation.fails()){
      return validation.messages()
    }

    const user = new User()
    user.fill(infoUser)
    await user.save()
    return response.status(201).send(user)
  }

  async show ({ params, request, response }) {

    const ususario = await User.find(params.id);
    if (!ususario) {
      return response.status(404).send({respuesta:'no hay registro con el id '+ params.id})
    }
    const idLibro = await ususario.books().fetch()
    ususario.libros = idLibro
    return ususario
  }

  async update ({params, request, response}){
    const rule = {
      email : 'email|unique:users',
    }
    const validation = await validate(request.only(['email']), rule)
    if(validation.fails()){
      return response.status(404).send({respuesta:'El campo email debe ser unico y tipo correo'})
    }

    const infoUser = request.only(['username','email','password'])

    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({respuesta:'No hay registros con el id '+params.id})
    }
    user.username = infoUser.username
    user.email = infoUser.email
    user.password = infoUser.password
    await user.save()
    return user
  }

  async destroy ({ params, request, response }) {

    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).send({respuesta:'no hay registro con el id '+ params.id})
    }
    await user.delete()

    return response.send({respuesta:'se elimino el registro'})

  }
}

module.exports = UserController
