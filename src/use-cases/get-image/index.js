const useCase = require('./useCase')
const handler = require('./handler')

const listImages = async ({ blobService, responses }) => {
    const getBlobImages = await useCase({ blobService })

    return handler({ getBlobImages, responses })

}

module.exports = listImages
