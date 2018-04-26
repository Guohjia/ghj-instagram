import { createStore } from "redux";
// import { combineReducers } from "redux";

import post from "./reducer/post"

// const myReducer=combineReducers({
//     Post,initUser
// });

let store=createStore(post,window.login_user);


export default store;