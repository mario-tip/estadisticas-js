'use strict'

const Grupo = use('App/Models/Grupo');
const { validate } = use('Validator')

class GrupoController {

  async index ({ request, response }) {
    let data = await Grupo.all()
    return data
  }


  async store ({ request, response }) {
    const grupo_i = request.only(['img','nombre','direccion','telefono','correo','estado','pais'])

    const rules = {
      nombre : 'required',
      direccion : 'required',
      telefono : 'required',
      correo : 'required|email'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return validation.messages()
    }

    const grupo = new Grupo()
    grupo.fill(grupo_i)
    await grupo.save()
    return response.status(201).send(grupo)
  }

  async show ({ params, request, response }) {
    const grupo = await Grupo.find(params.id)
    if (!grupo) {
      return response.status(400).send({respuesta:'No hay registro con el id: '+ params.id})
    }
    return grupo
  }

  async update ({ params, request, response }) {
    const rule = {
      correo:'email'
    }
    const validation = await validate(request.only('correo'), rule)
    if (validation.fails()) {
      return validation.messages()
    }

    const dataGrupo = request.only(['img','nombre','direccion','telefono','correo','estado','pais'])
    const grupo = await Grupo.find(params.id)
    if (!grupo) {
      return response.status(404).send({respuesta:'No existe registro con el id:'+params.id})
    }
    grupo.img = dataGrupo.img
    grupo.nombre = dataGrupo.nombre
    grupo.direccion = dataGrupo.direccion
    grupo.telefono = dataGrupo.telefono
    grupo.correo = dataGrupo.correo
    grupo.estado = dataGrupo.estado
    grupo.pais = dataGrupo.pais

    await grupo.save()

    return grupo
  }

  async destroy ({ params, request, response }) {
    const grupo = await Grupo.find(params.id)
    if (!grupo) {
      return response.status(404).send({respuesta:'No hay registro con el id: '+ params.id})
    }
    await grupo.delete()
    return response.send({respuesta:'Se elimino el registro'})
  }
}

module.exports = GrupoController
