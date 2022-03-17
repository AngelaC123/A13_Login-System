const express = require('express')
const exphbs = require('express-handlebars')
const User = require('./models/users.js')
const bodyParser = require('body-parser')

const port = 3000

const app = express()

require('./config/mongoose')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const { email, password } = req.body
  return User.findOne({ email })
    .lean()
    .then(user => {
      const error = !user ? true : password !== user.password
      const wrongMsg = !user ? 'Email' : 'Password'
      if (error === true) {
        return res.render('index', { email, password, error, wrongMsg })
      } else {
        return res.render('welcome', { firstName: user.firstName })
      }
    })
})



app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})