const config = require('./config/env')

// require('./config/mongoose')(config)

const { server, router } = require('./config/server')(config)

require('./use-cases')(server, router)
