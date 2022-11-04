const express = require('express')
const cors = require('cors')
const passport = require('passport')
const createError = require('http-errors')
const cookieParser = require('cookie-parser')
require('dotenv').config()

const app = express()
app.set('trust proxy', 1)
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: process.env.FRONTEND_HOST,
    credentials: true,
  })
)

require('./config/passport.config')
app.use(passport.initialize())

app.use(require('./middlewares/authentication').checkJwt)

app.use('/users', require('./routes/users.route'))
app.use('/collections', require('./routes/collections.route'))
app.use('/items', require('./routes/items.route'))
app.use('/search', require('./routes/search.route'))
app.use('/likes', require('./routes/likes.route'))
app.use('/comments', require('./routes/comments.route'))
app.use('/tags', require('./routes/tags.route'))

app.use((req, res, next) => {
  next(createError.NotFound())
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.send({
    status: err.status || 500,
    message: err.status ? err.message : 'Internal Server Error',
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running on port ${process.env.PORT || 3001}`)
})
