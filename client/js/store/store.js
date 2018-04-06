import { createStore } from "redux";
// import { combineReducers } from "redux";
import comment from "./reducer/comment"

// const myReducer=combineReducers({
//     play,color
// });

let store=createStore(comment,{LIKE:false}) //preloadedState 服务器获取

export default store;