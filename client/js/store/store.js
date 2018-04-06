import { createStore } from "redux";
// import { combineReducers } from "redux";
import comment from "./reducer/comment"

// const myReducer=combineReducers({
//     play,color
// });

let store=createStore(comment)

export default store;