const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const { readdirSync } = require('fs')
const csrf = require('csurf')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')
require('dotenv').config()

const csrfProtection = csrf({ cookie: true })

// create express app
const app = express()

// db
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log('DB connected'))
  .catch((err) => console.log(`DB connection error => ${err}`))

// apply middleware
app.use(cors())
app.use(express.json({ limit: '5mb' }))
app.use(cookieParser())
app.use(morgan('dev'))

// route
readdirSync('./routes').map((r) => app.use('/api', require(`./routes/${r}`)))

// csrf
app.use(csrfProtection)

app.get('/api/csrf-token', (req, res) => {
  res.json({ csrfToken: req.csrfToken() })
})

// port
const port = process.env.PORT || 8000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})
