
global.Promise = require('bluebird')

const connectData = require('./config/dataconnect')

const configureServer = (data) => {
    const { server } = require('./config/server')
    return { data, server }
}

const configRoute = async ({ data, server }) => {
    server.use(await require('./routes')(data))
}

const startupError = err => { console.error('🚨 Error bootstrapping app!', err) }

// const datac = connectData()
connectData()
    .then(configureServer)
    .then(configRoute)
    .catch(startupError)
