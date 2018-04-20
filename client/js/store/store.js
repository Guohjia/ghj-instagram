import { createStore } from "redux";
// import { combineReducers } from "redux";
import comment from "./reducer/comment"
// import { getActivity } from "../util/request"
// const myReducer=combineReducers({
//     play,color
// });
let store;
store=createStore(comment)
// getActivity({from:sessionStorage.getItem("isUser")}).then((res)=>{
//     if(res.code === 200){ let defaultPosts = res.data.posts } //每次都要做状态判断跟烦,需要封装在request里面;
//     store=createStore(comment,{defaultPosts:defaultPosts}) //preloadedState 服务器获取
// })

export default store;