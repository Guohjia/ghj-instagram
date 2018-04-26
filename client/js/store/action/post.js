const LIKE = (id) => ({
    type: "LIKE",
    id:id
})

const UNLIKE = (id) => ({
    type: "UNLIKE",
    id:id
})

const COLLECT = (id) => ({
    type: "COLLECT",
    id:id
})

const UNCOLLECT = (id) => ({
    type: "UNCOLLECT",
    id:id
})

export {
    LIKE,
    UNLIKE,
    COLLECT,
    UNCOLLECT
}