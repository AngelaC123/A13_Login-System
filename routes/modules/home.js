const express = require('express')
const router = express.Router()
const User = require('../../models/users')

router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', (req, res) => {
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

module.exports = router