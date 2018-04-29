import myAxios from "./axios"


//登录相关
const signIn = params => {
    return myAxios.post("/api/signin",params)
}

const signUp = params => {
    return myAxios.post("/api/signup",params)
}

const signOut = () => {
    return myAxios.get("/api/signout")
}


//随机获取三个用户/api/getUsers
const getUsers = params => {
    return myAxios.get("/api/getUsers",params)
}

//更新头像
const updateProtrait= params => {
    return myAxios.post("/api/protrait",params)
}

//关注
const reqFollow = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/follow",params)
}

//取消关注
const reqUnFollow = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/unfollow",params)
}

//抓取动态 => 每次抓6条;
const getPosts = params => {
    return myAxios.get("/api/getPosts",params)
}

//抓取一条动态
const getPost = params => {
    return myAxios.get("/api/getPost",params)
}

//发布动态
const sendPost = params => {
    return myAxios.post("/api/post",params)
}

//点赞
const reqLike = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/like",params)
}

//取消赞
const reqUnLike = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/unlike",params)
}

//收藏
const reqCollect = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/collect",params)
}

//取消收藏
const reqUnCollect = params => {
    params.userId=window.login_user._id;
    return myAxios.post("/api/unCollect",params)
}

//评论
const reqComment = params => {
    params.from=window.login_user._id;
    return myAxios.post("/api/comment",params)
}

module.exports = {
    signIn,
    signUp,
    signOut,
    getPosts,
    getPost,
    sendPost,
    reqLike,
    reqUnLike,
    reqCollect,
    reqUnCollect,
    reqFollow,
    reqUnFollow,
    updateProtrait,
    getUsers,
    reqComment
};
