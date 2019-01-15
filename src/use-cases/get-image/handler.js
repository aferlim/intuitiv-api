const { BlobContainerError } = require('./errors')

module.exports = async ({ getBlobImages, responses }) => async (
    req,
    res,
    next
) => {
    const ok = responses.ok(res),
        badRequestWithMessage = responses.badrequestWithMessage(res)

    let continuationToken = req.query.continuationtoken || null,
        pageSize = req.params.pagesize || 0,
        prefix = req.query.prefix

    await getBlobImages({ continuationToken, pageSize, prefix })
        .then(ok)
        .catch(BlobContainerError, badRequestWithMessage)
        .catch(next)
}
