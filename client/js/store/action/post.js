const LIKE = (id) => ({
    type: "LIKE",
    id:id
})

const UNLIKE = (id) => ({
    type: "UNLIKE",
    id:id
})

export {
    LIKE,
    UNLIKE
}