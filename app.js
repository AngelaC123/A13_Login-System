const express = require('express')

const port = 3000

const app = express()

app.get('/', (req, res) => {
  res.send(`This is a login system`)
})

app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})