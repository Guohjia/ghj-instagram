export default (state, action) => {
    switch (action.type) {
        case "LIKE":
            return { ...state, LIKE: !state.LIKE}
    }
  
    return state
}