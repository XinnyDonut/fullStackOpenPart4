const config = require('./utils/config')
const express=require('express')
const middleware=require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter=require('./controllers/blogs.js')
const cors=require('cors')
const mongoose = require('mongoose')

mongoose.set('strictQuery',false)
logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI)
  .then(()=>logger.info('connected to mongoDB'))
  .catch(error => logger.error(`error conencting to db`,error.message))

const app=express()

app.use(cors())
// app.use(express.static('dist'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports=app