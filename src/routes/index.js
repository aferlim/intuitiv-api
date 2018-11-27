const express = require('express')
const responses = require('./responses')

const todos = require('../use-cases/get-todos')

module.exports = async (data) => {
    const router = express.Router()

    router.get('/todos', await todos({ data, responses }))

    return router
}
