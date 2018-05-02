export default (state=window.login_user||{}, action) => {
    switch (action.type) {
        case "LIKE":
            return { ...state, like:like(state.like,action.id)}
        case "UNLIKE":
            return { ...state, like:unlike(state.like,action.id)}
        case "COLLECT":
            return { ...state, collect:collect(state.collect,action.id)}
        case "UNCOLLECT":
            return { ...state, collect:uncollect(state.collect,action.id)}
        case "FOLLOW":
            return { ...state, following:follow(state.following,action.id)}
        case "UNFOLLOW":
            return { ...state, following:unfollow(state.following,action.id)}
        case "POST":
            return { ...state, post:post(state.post,action.id)}  //用户所发布的帖子
    }
    return state
}

const like = (like, id) => {
    like.unshift(id)
    return like
}

const unlike =(like, id) => 
    like.filter(r => r != id)

const collect = (collect, id) => {
    collect.unshift(id)
    return collect
}

const uncollect =(collect, id) => 
    collect.filter(r => r != id)

const follow = (following, id) => {
    following.unshift(id)
    return following
}
    
const unfollow =(following, id) => 
    following.filter(r => r != id)

const post = (post, id) => {
    post.unshift(id)
    return post
}
