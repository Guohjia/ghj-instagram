import axios from "axios";
// import md5 from "blueimp-md5";
// import sha1 from "js-sha1";


//登录相关
const signIn = params => {
    return axios.post("/api/signin", params).catch(function (error) {
        console.log(error);
    })
}

const signUp = params => {
    return axios.post("/api/signup", params).catch(function (error) {
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



//发布动态
const postActivity = params => {
    console.log(params)
    return axios.post("/api/post",params).catch(function (error) {
        console.log(error);
    })
}
module.exports = {
    signIn,
    signUp,
    signOut,
    postActivity
};
