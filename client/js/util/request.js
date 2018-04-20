import axios from "axios";
// import md5 from "blueimp-md5";
// import sha1 from "js-sha1";


//登录相关
const signIn = params => {
    let options ={
        method: "POST",
        // headers:{ "content-type": "application/x-www-form-urlencoded" },
        data:params,
        url:"/api/signin"
    }
    return axios(options).catch(function (error) {
        console.log(error);
    })
}

const signUp = params => {
    let options ={
        method: "POST",
        // headers:{ "content-type": "application/x-www-form-urlencoded" },
        data:params,
        url:"/api/signup"
    }
    return axios(options).catch(function (error) {
        console.log(error);
    })
}

const signOut = () => {
    return axios.get("/api/signout").catch(function (error) {
        console.log(error);
    })
}

// const getCaptcha = params => {
//     let Nonce = md5(Math.random()),CurTime = Date.parse(new Date())/1000,
//             CheckSum=sha1("15ba107247f0"+Nonce+CurTime);
//     fetch("https://api.netease.im/sms/sendcode.action", {
//         body: JSON.stringify(params), 
//         method: "POST", 
//         headers: {
//             "content-type": "application/x-www-form-urlencoded;charset=utf-8",
//             "AppKey": "2a8cc1af1e661cc5c078e1f8b3819108",
//             "CurTime": CurTime,
//             "CheckSum": CheckSum,
//             "Nonce":Nonce
//         },
//         mode: "no-cors" // no-cors, cors, *same-origin
//     })

// axios(options).catch(function (error) {
//     console.log(error);
// }).then((code)=>{
//     console.log(code)
// })
// return axios(options).catch(function (error) {
//     console.log(error);
// }).then((code)=>{
//     console.log(code)
// })
// }


//抓取动态 => 每次抓6条;
const getPosts = params => {
    return axios.get("/api/getPosts",{params:params}).catch(function (error) {
        console.log(error);
    })
}

//抓取一条动态
const getPost = params => {
    return axios.get("/api/getPost",{params:params}).catch(function (error) {
        console.log(error);
    })
}

//发布动态
const sendPost = params => {
    return axios.post("/api/post",params).catch(function (error) {
        console.log(error);
    })
}

//点赞
const Like = params => {
    params.userId=sessionStorage.getItem("isUser");
    return axios.post("/api/like",params).catch(function (error) {
        console.log(error);
    })
}

//取消赞
const unLike = params => {
    params.userId=sessionStorage.getItem("isUser");
    return axios.post("/api/unLike",params).catch(function (error) {
        console.log(error);
    })
}

//获取登录用户详情
const getUser = params => {
    return axios.get("/api/getUser",{params:params}).catch(function (error) {
        console.log(error);
    })
}

module.exports = {
    signIn,
    signUp,
    signOut,
    getPosts,
    getPost,
    sendPost,
    getUser,
    Like,
    unLike
};
