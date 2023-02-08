# adonis-js-blog-test

## How to run
- Run `npm install` to install all dependencies
- Make a copy of `.env.example` rename it to `.env`
- Run `adonis key:generate` to generate the secret key
- Run `adonis migration:run` to setup the database
- Run `npm run build` to build static assets
- Run `adonis serve --dev` or `pnpm run dev` to run the application  

Visit http://127.0.0.1:3333/

## Sources 

 + https://grafikart.fr/tutoriels/adonis-decouverte-1998  
   (https://www.youtube.com/watch?v=i51olb4HBgU)

```
  06:30 Moteur de template Edge
  08:30 Découverte de Lucid
  25:33 Validation des données
  43:15 Pagination
  46:15 Les relations
  56:00 Authentification
  01:10:20 Upload des images
```

+ https://github.com/adonisjs-community/adonis-blog-demo
+ https://dev.to/ericlecodeur/creer-un-restful-api-avec-adonisjs-5-0-incluant-l-authentification-par-token-8pe
+ ...