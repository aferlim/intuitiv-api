const express = require('express')

const multer = require('multer'),
    inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

const responses = require('./responses')

const todos = require('../use-cases/get-todos'),
    uploadcase = require('../use-cases/upload-image')

module.exports = async ({ data, blobService }) => {
    const router = express.Router()

    router.get('/todos', await todos({ data, responses }))

    router.post('/upload-image', uploadStrategy, await uploadcase({ blobService, responses }))

    return router
}
