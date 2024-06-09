const express = require('express')
const postRoute = require('./routes/post.route')
const userRoute = require('./routes/user.route')
const imageRoute = require('./routes/image.route')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.json())
app.use('/uploads', express.static('uploads'))

app.use('/posts', postRoute)
app.use('/user', userRoute)
app.use('/image', imageRoute)

module.exports = app
