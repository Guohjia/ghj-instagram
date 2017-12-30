import { createStore } from "redux";
// import { combineReducers } from "redux";
import { play } from "./reducer"

// const myReducer=combineReducers({
//     play,color
// });

let store=createStore(play)

module.exports={store};