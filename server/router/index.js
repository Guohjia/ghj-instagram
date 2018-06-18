const Router = require('koa-router');
const router = new Router();
const User = require('../database/model/user');
const Post = require('../database/model/Post');
const Comment = require('../database/model/comment');
/**
 * 
 * @param {code} 数据库存储失败 503 
 */
const AppRouter = (app)=>{
    app
    .use(router.routes())
    .use(router.allowedMethods());

    router.get('/', async (ctx, next) => {
        let params={};
        if(ctx.session.user){  //刷新页面更新session
            let matchUser = await User.findOne({userName: ctx.session.user.userName}).catch(err => {console.log(err);});
            if(matchUser){ctx.session.user = matchUser;}
            params=JSON.parse(JSON.stringify(ctx.session.user));
        }
        params.pageTitle='Instagram';
        // ctx.set('expires',new Date().getTime() + 86400000);
        await ctx.render('index', params)
    });
    

    router.get('/login', async (ctx, next) => {
        //已经登陆的情况下访问该页面?
        // console.log(ctx.session)
        await ctx.render('login', {
            pageTitle: 'Instagram'
        })
    });
    
    router.get('/profile', async (ctx, next) => {
        if(ctx.session.user){
            let matchUser = await User.findOne({userName: ctx.session.user.userName}).catch(err => {console.log(err);});
            if(matchUser){ctx.session.user = matchUser;}
            params=JSON.parse(JSON.stringify(ctx.session.user));
        }else{
            return ctx.redirect('/login')
        }
        params.pageTitle='Instagram';
        await ctx.render('profile', params)
    });

    router.get('/profile/detail/:id', async (ctx, next) => {
        if(ctx.session.user){
            let matchUser = await User.findOne({userName: ctx.session.user.userName}).catch(err => {console.log(err);});
            if(matchUser){ctx.session.user = matchUser;}
            params=JSON.parse(JSON.stringify(ctx.session.user));
        }else{
            return ctx.redirect('/login')
        }
        params.pageTitle='Instagram';
        await ctx.render('profile', params)
    });
    
    //spa => 依然返回主页
    router.get('/detail/:id', async (ctx, next) => {
        let params={};
        if(ctx.session.user){
            let matchUser = await User.findOne({userName: ctx.session.user.userName}).catch(err => {console.log(err);});
            if(matchUser){ctx.session.user = matchUser;}
            params=JSON.parse(JSON.stringify(ctx.session.user));
        }
        params.pageTitle='Instagram';
        await ctx.render('index', params)
    });
    
    //注册
    router.post('/api/signup', async (ctx, next) => {
        let { userName,password,phone} = ctx.request.body;
        let _user = {
            userName:userName,
            password:password,
            phone:phone
        },signed,resErr;
        await User.findOne({userName: userName},(err,user)=>{
            if(user) {
                signed = true;
                return;
            }else{
                let user = new User(_user);
                user.save((err,user)=>{
                    if(err) resErr=err;
                })
            }
        })
        
        if(!signed){
            if(resErr){
                ctx.body = {
                    code: 503,
                    message:'数据库异常'
                }
            }else{
                ctx.body = {
                    code: 200
                }
            }
        }else{
            ctx.body = {
                code: 401,
                message:'注册用户已经存在'
            }
        }
    });
    
    
    //登录
    router.post('/api/signin', async (ctx, next) => {
        let { userName,password } = ctx.request.body; //,remember ?
        let ifMatch;
        let matchUser = await User.findOne({userName: userName}).catch(err => {console.log(err);});
        if(matchUser) {
            await matchUser.comparePassword(password,(err,isMatch)=>{
                if(err){console.log(err)};
                if(isMatch){
                    ifMatch=true;
                }else{
                    ifMatch=false;
                }
            })
            if(ifMatch){
                ctx.session.user = matchUser;
                ctx.body = {
                    code: 200,
                    message:'Match'
                }
            }else{
                ctx.body = {
                    code: 403,
                    message:'输入密码有误'
                }
            }
        }else{
            ctx.body = {
                code: 401,
                message:'用户不存在，请先注册'
            }
        }
    });
    
    
    
    //登出
    router.get('/api/signout', async (ctx, next) => {
        delete ctx.session.user;
    })

    //用户相关
    //更新头像
    router.post('/api/protrait', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let { userImg } = ctx.request.body
        let { _id } = ctx.session.user,resErr;
        await User.update({_id:_id},{$set:{userImg:userImg}}).catch(err => {
            resErr = err;
        });

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,发布失败' 
            }
        }else{
            ctx.body = {
                code:200 
            } 
        }
    });

    //随机获得三个用户数据
    router.get('/api/getUsers', async (ctx, next) => {
        let users;
        if(ctx.session.user){
            let { userName } = ctx.session.user;
            users=await User.aggregate([
                {$match:{"userName":{$ne:userName}}},
                {$sample:{size:3}}
            ])
        }else{
            users=await User.aggregate([{$sample:{size:3}}])
        }

        if(!users){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200,
                users:users || []
            } 
        }
    });


    //发布动态 
    router.post('/api/post', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let _PostParams = JSON.parse(JSON.stringify(ctx.request.body));
        let _Post = new Post(_PostParams);
        let resErr;
        await _Post.save(function(err,_Post){
            if(err){resErr=err;}
        })
        await User.update({_id:ctx.session.user._id},{$addToSet:{post:_Post._id}}).catch(err => {
            resErr = err;
        });
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,发布失败' 
            }
        }else{
            ctx.body = {
                code:200,
                id:_Post._id 
            } 
        }
    });
    
    //获取所有动态
    router.get('/api/getPosts', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let { fromIndex } = ctx.query;
        let resPosts=[],resErr,done=false;
        await Post.find({},(err,posts)=>{
            if(err){resErr=err;return;}
            if(posts){resPosts = posts}
        }).skip(+fromIndex).limit(6)

        if(resPosts.length<6){
            //数据已经全部读完
            done=true
        }
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200,
                posts:resPosts || [],
                done:done
            } 
        }
    });

    //根据id获取动态
    router.get('/api/postsById', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let { fromIndex,postIds }= ctx.query;
        let resPosts=[],resErr,done=false;

        await Post.find({_id:{$in:JSON.parse(postIds)}},(err,post)=>{
            if(err){resErr=err;return;}
            if(post&&post.length>0){resPosts = post;}
        }).skip(+fromIndex).limit(6)
        
        if(resPosts.length<6){
            //数据已经全部读完
            done=true
        }
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取个人动态失败' 
            }
        }else{
            ctx.body = {
                code:200,
                posts:resPosts,
                done:done
            } 
        }
    });

    //获取一条动态
    router.get('/api/getPost', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let id= ctx.query.postId;
        let resPost,resErr,user,userId;
        await Post.findOne({_id:id},(err,post)=>{
            if(err){resErr=err;return;}
            if(post){resPost = post;userId=post.from;}
        })

        await User.findOne({_id:userId},(err,_user)=>{
            if(err){resErr=err;return;}
            if(_user){user=_user}
        })

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200,
                post:resPost,
                user:user
            } 
        }
    });

    //点赞
    router.post('/api/like', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$addToSet:{like:id}}).catch(err => {
            resErr = err;
        });

        await Post.update({_id:id},{$inc:{likeNum:1}}).catch(err => {
            resErr = err;
        });
        
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });


    //取消点赞
    router.post('/api/unLike', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$pull:{like:id}}).catch(err => {
            resErr = err;
        });

        await Post.update({_id:id},{$inc:{likeNum:-1}}).catch(err => {
            resErr = err;
        });

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });


     //收藏
     router.post('/api/collect', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$addToSet:{collect:id}}).catch(err => {
            resErr = err;
        });

        await Post.update({_id:id},{$inc:{collectNum:1}}).catch(err => {
            resErr = err;
        });

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });


    //取消收藏
    router.post('/api/unCollect', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$pull:{collect:id}}).catch(err => {
            resErr = err;
        });

        await Post.update({_id:id},{$inc:{collectNum:-1}}).catch(err => {
            resErr = err;
        });

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });


     //关注
     router.post('/api/follow', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$addToSet:{following:id}}).catch(err => {
            resErr = err;
        });
        await User.update({_id:id},{$addToSet:{follower:userId}}).catch(err => {
            resErr = err;
        });

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });


    //取消关注
    router.post('/api/unFollow', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$pull:{following:id}}).catch(err => {
            resErr = err;
        });
        await User.update({_id:id},{$addToSet:{follower:userId}}).catch(err => {
            resErr = err;
        });
        
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200
            } 
        }
    });

    //评论 
    router.post('/api/comment', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let _CommentParams = JSON.parse(JSON.stringify(ctx.request.body));
        let _Comment = new Comment(_CommentParams);
        let resErr;
        await _Comment.save(function(err,_Post){
            if(err){resErr=err;}
        })
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,评论失败' 
            }
        }else{
            ctx.body = {
                code:200,
                id:_Comment._id
            } 
        }
    });

    //获取评论
    router.get('/api/getComments', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let { fromIndex,post } = ctx.query;
        let resComments = [],resErr,done=false;
        await Comment.find({post:post},(err,comments)=>{
            if(err){resErr=err;return;}
            if(comments){resComments = comments}
        }).sort({_id: -1}).skip(+fromIndex).limit(10)
        if(resComments.length<10){
            //数据已经全部读完
            done=true;
        }
        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取评论失败' 
            }
        }else{
            ctx.body = {
                code:200,
                comments:resComments,
                done:done
            } 
        }
    });

}

module.exports = AppRouter;