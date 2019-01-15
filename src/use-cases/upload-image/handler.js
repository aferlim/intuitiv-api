const { BlobContainerError, InvalidBlobType, BlobError } = require('./errors')

module.exports = async ({ uploadFile, responses }) => async (
    req,
    res,
    next
) => {
    const created = responses.created(res),
        badRequestWithMessage = responses.badRequestWithMessage(res),
        badRequest = responses.badRequest(res)

    const blobName = req.file ? req.file.originalname : null,
        buffer = req.file ? req.file.buffer : null,
        streamLength = req.file ? req.file.buffer.length : null

    await uploadFile({ blobName, buffer, streamLength })
        .then(created)
        .catch(BlobContainerError, badRequestWithMessage)
        .catch(InvalidBlobType, badRequestWithMessage)
        .catch(BlobError, badRequestWithMessage)
        .catch(badRequest)
        .catch(next)
}
