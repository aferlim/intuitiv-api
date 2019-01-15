const { DeleteBlobError, NotFoundBlobError } = require('./errors')

module.exports = async ({ deleteBlob, responses }) => async (
    req,
    res,
    next
) => {
    const success = responses.ok(res),
        notFound = responses.notFound(res),
        badRequest = responses.badRequest(res),
        badRequestWithMessage = responses.badRequestWithMessage(res)

    let blobName = req.params.blobName

    await deleteBlob({ blobName })
        .then(success)
        .catch(NotFoundBlobError, notFound)
        .catch(DeleteBlobError, badRequestWithMessage)
        .catch(badRequest)
        .catch(next)
}
