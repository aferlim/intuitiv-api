const ok = res => async data => {
    res.status(200).json(data)
}

const noContent = res => async () => {
    res.status(204).end()
}

const notFound = res => async _ => {
    res.sendStatus(404).end()
}

const badRequest = res => async _ => {
    res.status(400).end()
}

const badRequestWithMessage = res => async message => {
    res.status(400).json(message)
}

const created = res => async _ => {
    res.status(201).end()
}

const conflict = res => async _ => {
    res.status(409).end()
}

const success = res => async _ => res.status(200)

module.exports = {
    ok,
    noContent,
    notFound,
    badRequest,
    badRequestWithMessage,
    created,
    conflict,
    success
}
