
const ok = res => async data => {
    res.status(200).json(data)
}

const noContent = res => async () => {
    res.status(204).end()
}

const notfound = res => async _ => {
    res.sendStatus(404).end()
}

const badrequest = res => async _ => {
    res.status(400).end()
}

const badrequestWithMessage = res => async message => {
    res.status(400).json(message)
}

const created = res => async _ => {
    res.status(201).end()
}

const conflict = res => async _ => {
    res.status(409).end()
}

module.exports = {
    ok,
    noContent,
    notfound,
    badrequest,
    badrequestWithMessage,
    created,
    conflict
}
