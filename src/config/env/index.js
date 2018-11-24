const env = process.env.NODE_ENV

module.exports = env ? require(`./env.${env}`) : require('./env.dev')
