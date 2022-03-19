const express = require('express')
const router = express.Router()
const User = require('../../models/users')
const session = require('express-session')

router.get('/', (req, res) => {
  const id = req.session.userId
  return User.findById(id)
    .lean()
    .then(user => {
      if (id) {
        console.log('authenticated')
        return res.render('welcome', { user })
      } else {
        console.log('not authenticated')
        return res.render('index')
      }
    })
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
        req.session.userId = user._id
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