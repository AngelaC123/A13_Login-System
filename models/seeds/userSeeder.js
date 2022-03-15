const db = require('../../config/mongoose')
const User = require('../users')
const userList = require('../../users')

db.once('open', () => {
  User.create(userList)
  console.log('Seeder done!')
})