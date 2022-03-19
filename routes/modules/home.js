const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const session = require('express-session')

router.get('/', (req, res) => {

  if (req.session.user) {
    const firstName = req.session.user
    return res.render('welcome', { firstName })
  }
  res.render('index')
})

router.post('/', (req, res) => {
  const { email, password } = req.body
  email.trim().toLowerCase()

  if (!email || !password) { return res.redirect('/') }
  return User.findOne({ email })
    .lean()
    .then(user => {
      const error = !user ? true : password !== user.password
      const wrongMsg = !user ? 'Email' : 'Password'
      if (error) {
        return res.render('index', { email, password, error, wrongMsg })
      } else {
        req.session.user = user.firstName
        return res.redirect('/')
      }
    })
})

router.post('/signout', (req, res) => {
  req.session.destroy()
  console.log('session destroyed')
  res.redirect('/')
})





module.exports = router