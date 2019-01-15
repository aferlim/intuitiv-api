const { NotFoundTodos } = require('./errors')

module.exports = async ({ findTodos, responses }) => async (req, res, next) => {
    const ok = responses.ok(res)
    const notFound = responses.notFound(res)
    const badRequest = responses.badRequest(res)

    await findTodos({ done: true })
        .then(ok)
        .catch(NotFoundTodos, notFound)
        .catch(badRequest)
        .catch(next)
}
