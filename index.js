const express = require('express')
const cors = require('cors')
const createError = require('http-errors')
const app = express()
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())

app.get('/', async (req, res, next) => {
  res.send({ message: 'Hello, World' })
})

app.use('/users', require('./routes/users.route'))
app.use('/collections', require('./routes/collections.route'))
app.use('/items', require('./routes/items.route'))

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.message,
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running on port ${process.env.PORT || 3001}`)
})
