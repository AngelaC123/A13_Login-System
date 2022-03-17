const express = require('express')
const exphbs = require('express-handlebars')
const User = require('./models/users.js')
const bodyParser = require('body-parser')

const port = 3000

const app = express()

const routes = require('./routes')
require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(routes)

app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})