
const e = () => new Promise((resolve, reject) => {
    // mongodb.collection('todos').find(find).toArray((err, result) => {
    //     err && reject(err)
    //     result ? resolve(result) : reject(NotFoundTodos())
    // })

    reject(new Error('errr'))
})

const tranport = async () => {
    return e()
}

tranport().then(() => console.log('test'))
    .catch((err) => console.log(err))
