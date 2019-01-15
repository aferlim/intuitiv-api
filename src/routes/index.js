const express = require('express')

const multer = require('multer'),
    inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({
        storage: inMemoryStorage,
        limits: { fieldSize: 8 * 1024 * 1024 }
    }).single('image')

const responses = require('./responses')

const todos = require('../use-cases/get-todos'),
    uploadcase = require('../use-cases/upload-image'),
    listImages = require('../use-cases/get-image'),
    deleteImage = require('../use-cases/delete-image')

module.exports = async ({ data, blobService }) => {
    const router = express.Router()

    router.get('/todos', await todos({ data, responses }))

    router.post(
        '/upload-image',
        uploadStrategy,
        await uploadcase({ blobService, responses })
    )

    router.get(
        '/images/:pagesize',
        await listImages({ blobService, responses })
    )

    router.delete(
        '/images/:blobName',
        await deleteImage({ blobService, responses })
    )

    return router
}
