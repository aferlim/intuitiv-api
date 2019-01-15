const { DeleteBlobError, NotFoundBlobError } = require('./errors')

const deleteBlobItem = async ({ blobService, blobName }) => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExist(
            'intuitiv-container',
            `image/${blobName}`,
            (err, data) => {
                if (err) {
                    reject(DeleteBlobError(err))
                } else {
                    resolve()
                }
            }
        )
    })
}

const getBlobProperties = async ({ blobService, blobName }) =>
    new Promise((resolve, reject) => {
        blobService.getBlobProperties(
            'intuitiv-container',
            `image/${blobName}`,
            null,
            (error, blob) => {
                if (error) {
                    reject(DeleteBlobError(error))
                    return
                }

                blob !== null
                    ? resolve()
                    : reject(NotFoundBlobError('no blob found'))
            }
        )
    })

const validateBLobName = blobName => {
    if (!blobName) {
        return Promise.reject(DeleteBlobError('no image informed'))
    }
    Promise.resolve()
}

module.exports = async ({ blobService }) => ({ blobName }) => {
    return validateBLobName(blobName)
        .then(_ => getBlobProperties({ blobService, blobName }))
        .then(_ => deleteBlobItem({ blobService, blobName }))
        .then(_ => Promise.resolve())
        .catch(err => Promise.reject(err))
}
