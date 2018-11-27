
const multer = require('multer'),
    inMemoryStorage = multer.memoryStorage(),
    uploadStrategy = multer({ storage: inMemoryStorage }).single('image')

const upload = async ({ blobService, responses }) => {
    
}

module.exports = { uploadStrategy, upload }
