const mime = require('mime-types')

const { BlobContainerError } = require('./errors')

module.exports = async ({ blobService }) =>
    ({ blobName, stream, streamLength }) => {

        return uploadToBlob({ blobService, containerName: 'intuitiv-container', blobName, stream, streamLength })
            .then(result => Promise.resolve(result))
            .catch(err => Promise.reject(err))
    }

const uploadToBlob = ({ blobService, containerName, blobName, stream, streamLength }) => new Promise((resolve, reject) => {

    var options = { contentSettings: { contentType: mime.lookup(blobName) } }

    blobService.createBlockBlobFromStream(containerName, `image/${blobName}`, stream, streamLength, options, err => {
        if (err) {
            reject(BlobContainerError(err))
            return
        }
        resolve({ message: 'File uploaded to Azure Blob storage.' })
    })

})

const allowedMimeTypes = () => ([
    { type: 'image/gif', convert: true },
    { type: 'image/jpeg', convert: true },
    { type: 'image/pjpeg', convert: true },
    { type: 'image/x-png', convert: true },
    { type: 'image/png', convert: true },
    { type: 'image/svg+xml', convert: false } ])
