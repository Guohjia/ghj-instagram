import { createStore,applyMiddleware  } from "redux";
import { combineReducers } from "redux";
import thunk from "redux-thunk";

import user from "./reducer/user";
import post from "./reducer/post"

const instagram=combineReducers({
    post,user
});

let store=createStore(instagram,applyMiddleware(thunk));


export default store;