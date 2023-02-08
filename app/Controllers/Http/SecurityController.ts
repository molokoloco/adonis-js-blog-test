import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class SecurityController {

  async login({view}: HttpContextContract) {
    return view.render('auth/login')
  }

  async doLogin({request, response, auth, session}: HttpContextContract) {
    
    const email = request.input('email')
    const password = request.input('password')
    
    try {
      await auth.use('web').attempt(email, password)
      session.flash({success : 'Connexion réussie'})
      response.redirect().toRoute('home')
    }
    catch(e) {
      session.flash({error : 'Identifiant incorrect'})
      response.redirect().toRoute('login')
    }
  }

}