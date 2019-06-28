'use strict'
const Book = use('App/Models/Book');
const { validate } = use('Validator')

class BookController {

  async index ({ request, response, auth }) {
    // IDEA: get user from jwt
    let user = await auth.getUser()
    let resp = await user.books().fetch()
    let data = await Book.all()
    user.libros = resp

    return user;
  }

  async store ({ request, response }) {
    const bookInfo = request.only(['title', 'autor','user_id'])

    const rules = {
      title : 'required',
      autor : 'required',
      user_id: 'required'
    }

    const validation = await validate(request.all(), rules)

    if (validation.fails()) {
      return response.status(404).send({respuesta:'Falta de datos'})
    }
    const libro = new Book()
    libro.title = bookInfo.title
    libro.autor = bookInfo.autor
    libro.user_id = bookInfo.user_id
    await libro.save()
      return response.status(201).send(libro)
  }

  async show ({ params, request, response }) {

    const book = await Book.find(params.id);
    if (!book) {
      return response.status(404).send({respuesta:'😍 no hay registro con el id '+ params.id})
    }
    const idUser = await book.user().fetch()
    book.user = idUser
    return book
  }

  async update ({ params, request, response }) {

    const bookInfo = request.only(['title', 'autor','user_id'])

    const libro = await Book.find(params.id)

    if (!libro) {
      return response.status(404).send({respuesta:'No hay registro con el id '+ params.id})
    }

    libro.title = bookInfo.title
    libro.autor = bookInfo.autor
    libro.user_id = bookInfo.user_id
    await libro.save()
    return libro
  }

  async destroy ({ params, request, response }) {

    const book = await Book.find(params.id)
    if (!book) {
      return response.status(404).send({respuesta:'no hay registro con el id '+ params.id})
    }
    await book.delete()

    return response.status(204).send({respuesta:'Se elimino el registro correctamente'})

  }
}
// IDEA: vamos subiendo
module.exports = BookController
