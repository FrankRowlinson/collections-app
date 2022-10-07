const express = require('express')
const app = express()
const passport = require('passport')
const expressSession = require('express-session')
const prisma = require('./client')
const { PrismaSessionStore } = require('@quixo3/prisma-session-store')
const createError = require('http-errors')
const cors = require('cors')
require('dotenv').config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
  origin: process.env.FRONTENT_HOST,
  credentials: true
}))

const sessionStore = new PrismaSessionStore(prisma, {
  checkPeriod: 2 * 60 * 1000,
  dbRecordIdIsSessionId: true,
  dbRecordIdFunction: undefined,
})

app.use(
  expressSession({
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 30,
    },
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: true,
    store: sessionStore,
  })
)

app.use(passport.authenticate('session'))

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
    message: err.status ? err.message : 'Internal Server Error',
  })
})

app.listen(process.env.PORT || 3001, () => {
  console.log(`server is running on port ${process.env.PORT || 3001}`)
})
