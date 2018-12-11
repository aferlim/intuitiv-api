const { BlobContainerError } = require('./errors')

const getBlobImages = async ({ blobService }) => ({ continuationToken, pageSize, prefix }) => {

    return new Promise((resolve, reject) => {

        let options = { delimiter: '/image', maxResults: pageSize > 0 ? pageSize > 300 ? 300 : pageSize : 30 },
            continuation = { nextMarker: continuationToken, targetLocation: 0 }

        blobService.listBlobsSegmentedWithPrefix('intuitiv-container', `image/${prefix}`, continuation, options, (err, data) => {
            if (err) {
                reject(BlobContainerError(err))
            } else {
                resolve({
                    entriesCount: data.entries.length,
                    blobs: data.entries.map(it => ({ name: it.name, creationTime: it.creationTime, contentLength: it.contentLength, contentSettings: it.contentSettings })),
                    continuationToken: data.continuationToken
                })
            }
        })
    })

}

module.exports = getBlobImages
