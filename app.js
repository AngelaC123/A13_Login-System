const express = require('express')
const exphbs = require('express-handlebars')
const User = require('./models/users.js')

const port = 3000

const app = express()
const bodyParser = require('body-parser')

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  return User.findOne({ email, password })
    .lean()
    .then((user) => {
      res.render('welcome', { firstName: user.firstName })
    })
})



app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})