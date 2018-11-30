const getStream = require('into-stream')

const { BlobContainerError, InvalidBlobType } = require('./errors')

module.exports = async ({ uploadFile, responses }) =>
    async (req, res, next) => {

        const ok = responses.ok(res),
            badrequestWithMessage = responses.badrequestWithMessage(res),
            badrequest = responses.badrequest(res)

        const
            blobName = req.file.originalname,
            stream = getStream(req.file.buffer),
            streamLength = req.file.buffer.length

        await uploadFile({ blobName, stream, streamLength })
            .then(ok)
            .catch(BlobContainerError, badrequestWithMessage)
            .catch(InvalidBlobType, badrequestWithMessage)
            .catch(badrequest)
            .catch(next)
    }
