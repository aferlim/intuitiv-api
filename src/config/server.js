const express = require('express')

const server = express()

const bodyParser = require('body-parser')

const allowcors = require('./cors')

module.exports = (config) => {

    server.use(bodyParser.urlencoded({ extended: true }))
    server.use(bodyParser.json())

    server.use(allowcors)

    server.listen(config.PORT, () => {
        console.log(`BACKEND is running on port ${config.PORT}.`)
    })

    return {
        server: server,
        router: express.Router()
    }
}
