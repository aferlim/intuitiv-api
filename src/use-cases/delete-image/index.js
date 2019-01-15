const useCase = require('./useCase'),
    handler = require('./handler')

const deleteImage = async ({ blobService, responses }) => {
    const deleteBlob = useCase({ blobService })
    return handler({ deleteBlob, responses })
}

module.exports = deleteImage
