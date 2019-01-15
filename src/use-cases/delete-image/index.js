const useCase = require('./useCase'),
    handler = require('./handler')

const deleteImage = async ({ blobService, responses }) => {
    const deleteBlob = await useCase({ blobService })
    return handler({ deleteBlob, responses })
}

module.exports = deleteImage
