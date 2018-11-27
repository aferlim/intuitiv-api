const { NotFoundTodos } = require('./errors')

module.exports = async ({ findTodos, responses }) => async (req, res, next) => {

    const ok = responses.ok(res)
    const notfound = responses.notfound(res)
    const badrequest = responses.badrequest(res)

    await findTodos({ done: true })
        .then(ok)
        .catch(NotFoundTodos, notfound)
        .catch(badrequest)
        .catch(next)
}
