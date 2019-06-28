'use strict'
const User = use('App/Models/User');

class AuthController {

  async login({request, auth, response}) {
        const email = request.input("email")
        const password = request.input("password");
        try {
          if (await auth.attempt(email, password)) {
            let user = await User.findBy('email', email)
            let accessToken = await auth.generate(user)
            // "user":user, 
            return response.json({"access_token": accessToken})
          }

        }
        catch (e) {
          return response.status(401).json({message: 'Credenciales invalidass'})
        }

      }
// IDEA: retur user
  async GetUser({auth, response}){

    try {
      let user = await auth.getUser()
      return response.send(user);
    } catch (e) {
      response.send('Token invalido')
    }
  }
}

module.exports = AuthController
