function play(state = { count: 0 },action){
    const count=state.count
    console.log(action.type)
    switch(action.type) {
        case "INCREASE":
            return {count:count+1};
        case "DECREMENT":
            return {count:count-1}
        default:
            return state
    }
}

module.exports={
    play
}