
const { NotFoundTodos } = require('./errors')

module.exports = async ({ repository }) => async find => {

    return repository.findTodosAsync(find)
        .then(data => Promise.resolve(data))
        .catch(() => Promise.reject(NotFoundTodos()))
}
