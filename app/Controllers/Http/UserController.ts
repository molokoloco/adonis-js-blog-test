import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UserValidator from 'App/Validators/UserValidator'
import User from '../../Models/User'
import authConfig from '../../../config/auth'
//import User from 'App/Models/User'


export default class UsersController {

  async register({view}: HttpContextContract) {
    return view.render('auth/register')
  }



  async doRegister({request, response, auth, session}: HttpContextContract) {
    try {
      const data = await request.validate(UserValidator)
      const user = await User.create(data)  
      await auth.login(user)
      session.flash({success : 'Inscription réussie'})
      response.redirect().toRoute('home')
    }
    catch(e) {
      session.flash({error : 'Identifiant incorrect'})
      response.redirect().toRoute('register')
    }

    return response.redirect().toRoute('home')
  }

}