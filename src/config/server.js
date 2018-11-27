const express = require('express')

const server = express()

const bodyParser = require('body-parser')

const allowcors = require('./cors')

server.set('port', process.env.PORT || 3001)

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.use(allowcors)

server.listen(server.get('port'), () => {
    console.log(`BACKEND is running on port ${server.get('port')}.`)
})

module.exports = { server }
