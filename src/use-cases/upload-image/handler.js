
const { BlobContainerError, InvalidBlobType, BlobError } = require('./errors')

module.exports = async ({ uploadFile, responses }) =>
    async (req, res, next) => {

        const created = responses.created(res),
            badrequestWithMessage = responses.badrequestWithMessage(res),
            badrequest = responses.badrequest(res)

        const
            blobName = req.file ? req.file.originalname : null,
            buffer = req.file ? req.file.buffer : null,
            streamLength = req.file ? req.file.buffer.length : null

        await uploadFile({ blobName, buffer, streamLength })
            .then(created)
            .catch(BlobContainerError, badrequestWithMessage)
            .catch(InvalidBlobType, badrequestWithMessage)
            .catch(BlobError, badrequestWithMessage)
            .catch(badrequest)
            .catch(next)
    }
