import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database'
import UpdatePostValidator from 'App/Validators/UpdatePostValidator'
import Post from 'App/Models/Post'
import Category from 'App/Models/Category'
//import User from 'App/Models/User'
import { string } from '@ioc:Adonis/Core/Helpers'
import Drive from '@ioc:Adonis/Core/Drive'

export default class BlogsController {

  async index({view, request, auth}: HttpContextContract) {

    // const user = await User.create({
    //   email: 'john@doe.fr',
    //   password: '0000'
    // })

    const page = request.input('page', 1)
    //const posts = await Post.all()
    const posts = await Database.from(Post.table).paginate(page, 2)
    
    //const user = await auth.getUser()
    //console.log('user', user)

    return view.render('blog/index', { posts })
  }

  async show({view, params, bouncer}: HttpContextContract) {
    //const post = await Post.query().preload('category').where('id', params.id).firstOrFail()
    const post = await Post.findOrFail(params.id)
    const categories = await Category.all()
    await bouncer.authorize('editPost', post)
    return view.render('blog/show', { post, categories })
  }

  async create({view}: HttpContextContract) {
    const post = new Post()
    const categories = await Category.all()
    return view.render('blog/create', { post, categories })
  }

  async update({params, request, response, session, bouncer}: HttpContextContract) {
    await this.handleRequest(params, request, bouncer)
    session.flash({success:'L\'article a bien été sauvegardé'})
    return response.redirect().toRoute('home')
  }

  async store({params, request, response, session}: HttpContextContract) {
    await this.handleRequest(params, request)
    session.flash({success:'L\'article a bien été créé'})
    return response.redirect().toRoute('home')
  }

  async destroy({params, session, response}: HttpContextContract) {
    const post = await Post.findOrFail(params.id)
    await post.delete()
    session.flash({success:'L\'article a bien été supprimé'})
    return response.redirect().toRoute('home')
  }

  private async handleRequest(params: HttpContextContract['params'], request: HttpContextContract['request'], bouncer?: HttpContextContract['bouncer']) {
    const post = params.id ? await Post.findOrFail(params.id) : new Post()
    if (bouncer) {
      await bouncer.authorize('editPost', post)
    }
    const data = await request.validate(UpdatePostValidator)
    const thumbnail = request.file('thumbnailFile')
    if (thumbnail) {
      if (post.thumbnail) {
        await Drive.delete(post.thumbnail)
      }
      const newName = string.generateRandom(32) + '.' + thumbnail.extname
      await thumbnail.moveToDisk('./', {name: newName})
      post.thumbnail = newName
    }
    post
      .merge({
        title: data.title,
        categoryId: data.categoryId,
        content: data.content,
        online: data.online || false
      })
      .save()
  }

}