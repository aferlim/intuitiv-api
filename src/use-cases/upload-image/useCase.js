const { BlobContainerError } = require('./errors')

module.exports = async ({ blobService }) =>
    ({ blobName, stream, streamLength }) => {

        uploadToBlob({ blobService, containerName: 'intuitiv-container', blobName, stream, streamLength })
            .then(result => Promise.resolve(result))
            .catch(err => Promise.reject(err))
    }

const uploadToBlob = ({ blobService, containerName, blobName, stream, streamLength }) => new Promise((resolve, reject) => {

    blobService.createBlockBlobFromStream(containerName, blobName, stream, streamLength, err => {
        if (err) {
            reject(BlobContainerError(err))
            return
        }
        resolve({ message: 'File uploaded to Azure Blob storage.' })
    })

})
