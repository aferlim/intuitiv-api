
const useCase = require('./useCase')
const handler = require('./handler')

const upload = async ({ blobService, responses }) => {

    const uploadFile = await useCase({ blobService })

    return handler({ uploadFile, responses })
}

module.exports = upload
