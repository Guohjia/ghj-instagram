const defaultNums = {
    likeNum:0,
    collectNum:0
}
export default (state=defaultNums, action) => {
    switch (action.type) {
        case "INIT_NUM":
            return action.init_num
        case "LIKE_NUM":
            return { ...state, likeNum:++state.likeNum}
        case "UNLIKE_NUM":
            return { ...state, likeNum:--state.likeNum}
        case "COLLECT_NUM":
            return { ...state, collectNum:++state.collectNum }
        case "UNCOLLECT_NUM":
            return { ...state, collectNum:--state.collectNum }
        case "COMMENT_NUM":
            return { ...state, commentNum:++state.commentNum }
    }
    return state
}

