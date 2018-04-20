export default (state = {}, action) => {
    switch (action.type) {
        case "INIT":
            return Object.assign(state,action.payload);
        case "LIKE":
            return { ...state, like:action.id}
    }
    return state
}