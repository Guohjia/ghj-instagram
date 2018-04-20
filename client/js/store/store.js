import { createStore } from "redux";
// import { combineReducers } from "redux";
// import Post from "./reducer/post";
import initUser from "./reducer/init"
import { getUser } from "../util/request";
import InitStore from "./action/init";

// const myReducer=combineReducers({
//     Post,initUser
// });

let store=createStore(initUser);

//初始化store中存入当前登录user数据
getUser({_id:sessionStorage.getItem("isUser")}).then((res)=>{
    if(res.data.code === 200){ 
        store.dispatch(InitStore(res.data.user))
    } 
})

export default store;