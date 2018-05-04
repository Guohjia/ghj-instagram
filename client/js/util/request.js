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
    return myAxios.get("/api/getPosts",params).then(res=>{
        if(res.data.posts.length === 0){
            return myAxios.get("/api/getPosts",params)
        }else{
            return res
        }
    })
}

//抓取动态 => 根据id抓取;
const getPostsById = params => {
    return myAxios.get("/api/postsById",params)
}

//抓取一条动态
const getPost = params => {
    return myAxios.get("/api/getPost",params).then(res=>{
        if(!res.data.user || !res.data.post){
            // console.log("动态详情抓取重试")
            return myAxios.get("/api/getPost",params)
        }else{
            return res
        }
    })
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

//抓取评论 => 每次抓10条;
const getComments = params => {
    return myAxios.get("/api/getComments",params).then(res=>{
        if(res.data.comments.length === 0){
            console.log("评论重试")
            return myAxios.get("/api/getComments",params)
        }else{
            return res
        }
    })
}


module.exports = {
    signIn,
    signUp,
    signOut,
    getPosts,
    getPostsById,
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
    reqComment,
    getComments
};
