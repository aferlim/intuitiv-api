const errorFactory = require('error-factory')

module.exports = {
    DeleteBlobError: errorFactory('DeleteBlobError'),
    NotFoundBlobError: errorFactory('NotFoundBlobError')
}
