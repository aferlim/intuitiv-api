const azureStorage = require('azure-storage'),
    blobService = azureStorage.createBlobService(process.env.AZURE_STORAGE_CONNECTION_STRING)

global.Promise = require('bluebird')

const connectData = require('./config/dataconnect')

const configureServer = (data) => {
    const { server } = require('./config/server')
    return { data, server }
}

const configRoute = async ({ data, server }) => {
    server.use(await require('./routes')({ data, blobService }))
}

const startupError = err => { console.error('🚨 Error bootstrapping app!', err) }

connectData()
    .then(configureServer)
    .then(configRoute)
    .catch(startupError)
