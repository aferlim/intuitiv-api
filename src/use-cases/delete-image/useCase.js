const { DeleteBlobError, NotFoundBlobError } = require('./errors')

const deleteBlobItem = ({ blobService, blobName }) => {
    return new Promise((resolve, reject) => {
        blobService.deleteBlobIfExists(
            'intuitiv-container',
            `image/${blobName}`,
            err => {
                if (err) {
                    reject(DeleteBlobError(err))
                } else {
                    resolve()
                }
            }
        )
    })
}

const getBlobProperties = ({ blobService, blobName }) =>
    new Promise((resolve, reject) => {
        blobService.getBlobProperties(
            'intuitiv-container',
            `image/${blobName}`,
            null,
            (error, blob) => {
                if (error) {
                    reject(NotFoundBlobError(error))
                    return
                }
                blob !== null
                    ? resolve()
                    : reject(NotFoundBlobError('no blob found'))
            }
        )
    })

const validateBLobName = async blobName => {
    if (!blobName) {
        return Promise.reject(DeleteBlobError('no image informed'))
    }
    return Promise.resolve()
}

module.exports = async ({ blobService }) => ({ blobName }) => {
    return validateBLobName(blobName)
        .then(_ => getBlobProperties({ blobService, blobName }))
        .then(_ => deleteBlobItem({ blobService, blobName }))
        .then(_ => Promise.resolve())
        .catch(err => Promise.reject(err))
}
