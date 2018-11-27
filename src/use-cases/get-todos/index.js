const useCase = require('./useCase')
const handler = require('./handler')
const repository = require('./repository')

module.exports = async ({ data: { mongodb }, responses }) => {
    const findTodos = await useCase({ repository: await repository({ mongodb }) })

    return handler({ findTodos, responses })
}
