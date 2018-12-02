const mime = require('mime-types')
const getStream = require('into-stream')
const sharp = require('sharp')

const { BlobContainerError, InvalidBlobType, BlobError } = require('./errors')

module.exports = async ({ blobService }) =>
    ({ blobName, buffer, streamLength }) => {

        return validateType(mime.lookup(blobName))
            .then(valid => resize(buffer, blobName, streamLength)(valid))
            .then(({ stream, blobName, streamLength }) => uploadToBlob({ blobService, containerName: 'intuitiv-container', blobName, stream, streamLength }))
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

const validateType = type => {
    let valid = allowedMimeTypes(type)[0]
    return valid ? Promise.resolve(valid) : Promise.reject(InvalidBlobType('Invalid image type'))
}

const allowedMimeTypes = (type) => ([
    { type: 'image/gif', convert: true, maxW: 600, minW: 50, maxH: 600, minH: 50 },
    { type: 'image/jpeg', convert: true, maxW: 600, minW: 50, maxH: 600, minH: 50 },
    { type: 'image/pjpeg', convert: true, maxW: 600, minW: 50, maxH: 600, minH: 50 },
    { type: 'image/x-png', convert: true, maxW: 600, minW: 50, maxH: 600, minH: 50 },
    { type: 'image/png', convert: true, maxW: 600, minW: 50, maxH: 600, minH: 50 },
    { type: 'image/svg+xml', convert: false, maxW: 600, minW: 50, maxH: 600, minH: 50 }]
    .filter((a) => a.type === type))

const resize = (buffer, blobName, streamLength) => async (format) => {

    if (!format.convert) {
        return Promise.resolve({ stream: getStream(buffer), blobName: blobName, streamLength: streamLength })
    }

    let image = sharp(buffer)
    let toBuffer = null, valid = true

    await image
        .metadata()
        .then(function (metadata) {

            if (metadata.width > metadata.height && metadata.width > format.maxW) {
                return image
                    .resize({ width: format.maxW })
                    .webp()
                    .toBuffer()
            }

            if (metadata.height > format.maxH) {
                return image
                    .resize({ height: format.maxH })
                    .webp()
                    .toBuffer()
            }

            return image
                .webp()
                .toBuffer()
        })
        .then(function (data) {
            toBuffer = data
            blobName = `${blobName.split('.')[0]}.webp`
            streamLength = toBuffer.length
        })
        .catch(_ => { valid = false })

    return valid ? Promise.resolve({ stream: toBuffer !== null ? getStream(toBuffer) : getStream(buffer), blobName: blobName, streamLength: streamLength }) : Promise.reject(BlobError('did not possible format blob'))
}
