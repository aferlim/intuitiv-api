const errorFactory = require('error-factory')

module.exports = {
    BlobContainerError: errorFactory('BlobContainerError'),
    InvalidBlobType: errorFactory('InvalidBlobType')
}
