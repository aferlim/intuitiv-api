const { NotFoundTodos } = require('./errors')

module.exports = async ({ mongodb }) => {

    const findTodos = (find) => new Promise((resolve, reject) => {
        mongodb.collection('todos').find(find).toArray((err, result) => {
            err && reject(err)
            !result ? resolve(result) : reject(NotFoundTodos())
        })
    })

    const findTodosAsync = async (find) => {
        return mongodb.collection('todos').find(find).toArray()
    }

    return { findTodos, findTodosAsync }
}
