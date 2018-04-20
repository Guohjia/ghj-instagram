let defaultState={
    LIKE:false
}
export default (state=defaultState, action) => {
    switch (action.type) {
        case "LIKE":
            return { ...state, like:action.id}
    }
    return state
}