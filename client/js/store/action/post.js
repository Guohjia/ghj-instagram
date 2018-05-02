const INIT_NUM  = data => ({
    type: "INIT_NUM",
    init_num:data
})

const LIKE_NUM = {
    type: "LIKE_NUM"
}

const UNLIKE_NUM = {
    type: "UNLIKE_NUM"
}

const COLLECT_NUM  = {
    type: "COLLECT_NUM"
}

const UNCOLLECT_NUM  = {
    type: "UNCOLLECT_NUM"
}


export {
    LIKE_NUM,
    UNLIKE_NUM,
    COLLECT_NUM,
    UNCOLLECT_NUM,
    INIT_NUM
}