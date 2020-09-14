const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const wishesRouter = require('./controllers/wishes')
require('express-async-errors')

const app = express()
app.use(express.static('build'))
app.use(cors())
app.use(express.json())

mongoose
	.connect(config.MONGODB_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => logger.info('connected to MongoDB'))
	.catch(error => logger.error('failed to connect to MongoDB', error.message))

app.use('/api/wishes', wishesRouter)

app.use(middleware.unknownEnpoint)
app.use(middleware.errorHandler)

module.exports = app
