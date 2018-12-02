
const { BlobContainerError, InvalidBlobType, BlobError } = require('./errors')

module.exports = async ({ uploadFile, responses }) =>
    async (req, res, next) => {

        const ok = responses.ok(res),
            badrequestWithMessage = responses.badrequestWithMessage(res),
            badrequest = responses.badrequest(res)

        const
            blobName = req.file.originalname,
            buffer = req.file.buffer,
            streamLength = req.file.buffer.length

        await uploadFile({ blobName, buffer, streamLength })
            .then(ok)
            .catch(BlobContainerError, badrequestWithMessage)
            .catch(InvalidBlobType, badrequestWithMessage)
            .catch(BlobError, badrequestWithMessage)
            .catch(badrequest)
            .catch(next)
    }
