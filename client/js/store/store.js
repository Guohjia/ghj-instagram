import { createStore } from "redux";
import { combineReducers } from "redux";

import user from "./reducer/user";
import post from "./reducer/post"

const instagram=combineReducers({
    post,user
});

let store=createStore(instagram);


export default store;