
// const e = () => new Promise((resolve, reject) => {
//     // mongodb.collection('todos').find(find).toArray((err, result) => {
//     //     err && reject(err)
//     //     result ? resolve(result) : reject(NotFoundTodos())
//     // })

//     reject(new Error('errr'))
// })

// const tranport = async () => {
//     return e()
// }

// tranport().then(() => console.log('test'))
//     .catch((err) => console.log(err))

const allowedMimeTypes = (type) => ([
    { type: 'image/gif', convert: true },
    { type: 'image/jpeg', convert: true },
    { type: 'image/pjpeg', convert: true },
    { type: 'image/x-png', convert: true },
    { type: 'image/png', convert: true },
    { type: 'image/svg+xml', convert: false }]
    .filter((a) => a.type === type)[0])

console.log(allowedMimeTypes('image2/gif'))
