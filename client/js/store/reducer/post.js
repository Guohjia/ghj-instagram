export default (state={}, action) => {
    switch (action.type) {
        case "LIKE":
            return { ...state, like:like(state.like,action.id)}
        case "UNLIKE":
            return { ...state, like:unlike(state.like,action.id)}
    }
    return state
}

const like = (like, id) => {
    like.unshift(id)
    return like
}

const unlike =(like, id) => 
    like.filter(r => r != id)