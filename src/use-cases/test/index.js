module.exports = (router) => {

    router.route('/test')
        .get((req, res) => {
            res.status(200).json({
                id: 1, value: '2'
            })
        })

}
