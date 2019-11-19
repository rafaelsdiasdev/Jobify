const express = require('express')
const app = express()
const bodyParser = require('body-parser')

const path = require('path')

const sqlite = require('sqlite')
const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), { Promise })

const port = process.env.PORT || 3000

app.use('/admin', (req, res, next) => {
  req.hostname === 'localhost' ? next() : res.send('<h1>Not allowed</h1>')
})

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname,'public')))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', async(request, response) => {
  const db = await dbConnection
  const categoriasDB = await db.all('select * from categorias;')
  const vagas = await db.all('select * from vagas;')
  const categorias = categoriasDB.map(cat => {
    return {
      ...cat,
      vagas: vagas.filter(vaga => vaga.categoria === cat.id)
    }
  })
  response.render('home', {
    categorias
  })
})

app.get('/vaga/:id', async(request, response) => {
  const db = await dbConnection  
  const vaga = await db.get(`select * from vagas where id = '${request.params.id}'`)
  response.render('vaga', {
    vaga
  })
})

app.get('/admin', (request, response) => {
  response.render('admin/home')
})

app.get('/admin/vagas', async(request, response) => {
  const db = await dbConnection
  const vagas = await db.all('select * from vagas;')
  response.render( 'admin/vagas', {
    vagas
  })
})

app.get('/admin/vagas/delete/:id', async(request, response) => {
  const db = await dbConnection
  await db.run(`delete from vagas where id = '${request.params.id}'`)
  response.redirect('/admin/vagas')
})

app.get('/admin/vagas/nova', async(request, response) => {
  const db = await dbConnection
  const categorias = await db.all('select * from categorias')
  response.render('admin/nova-vaga', {
    categorias
  })
})

app.get('/admin/vagas/editar/:id', async(request, response) => {
  const db = await dbConnection
  const categorias = await db.all('select * from categorias')
  const vaga =  await db.get(`select * from vagas where id = '${request.params.id}'`)
  response.render('admin/editar-vaga', {
    categorias, vaga
  })
})

app.post('/admin/vagas/editar/:id', async(request, response) => {
  const { titulo, descricao, categoria } = request.body
  const { id } = request.params
  const db = await dbConnection
  await db.run(`update vagas set categoria = ${categoria}, titulo = '${titulo}', descricao = '${descricao}, 'where id = ${id}`)
  response.redirect('/admin/vagas')
  
})


app.post('/admin/vagas/nova', async(request, response) => {
  const { titulo, descricao, categoria } = request.body
  const db = await dbConnection
  await db.run(`insert into vagas(categoria, titulo, descricao) values('${categoria}', '${titulo}', '${descricao}')`)
  response.redirect('/admin/vagas')
  
})

const init = async() => {
  const db = await dbConnection
  await db.run('create table if not exists categorias (id INTEGER PRIMARY KEY, categoria TEXT);')
  await db.run('create table if not exists vagas (id INTEGER PRIMARY KEY, categoria INTEGER, titulo TEXT, descricao TEXT);')

  // const vaga = 'Social Media (San Francisco)'
  // const descricao = 'Um cara do das redes sociais'
  // await db.run(`insert into vagas(categoria, titulo, descricao) values(2, '${vaga}', '${descricao}')`)
}

init()

app.listen(port, (err) => {
  if(err){
    console.log('Não foi possivel iniciar o servidor do Jobify')
  } else {
    console.log('Servidor do Jobify rodando...')
  }
})