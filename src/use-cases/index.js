
module.exports = (app, router) => {

    require('./test')(router)

    app.use('/api', router)

}
