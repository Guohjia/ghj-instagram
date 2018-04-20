const Router = require('koa-router');
const router = new Router();
const User = require('../database/model/user');
const Post = require('../database/model/Post');

/**
 * 
 * @param {code} 数据库存储失败 503 
 */
const AppRouter = (app)=>{
    app
    .use(router.routes())
    .use(router.allowedMethods());

    router.get('/login', async (ctx, next) => {
        //已经登陆的情况下访问该页面?
        // console.log(ctx.session)
        await ctx.render('login', {
            pageTitle: 'Instagram'
        })
    });
    
    router.get('/profile', async (ctx, next) => {
        if(!ctx.session.user){return ctx.redirect('/login')}
        //根据_id去数据库中查询帖子、关注着、正在关注等相关数据
        // console.log(ctx.session)
        await ctx.render('profile', {
            pageTitle: 'Instagram',
            userName:ctx.session.user.userName,
            post:5,
            follower:6,
            following:10
        })
    });
    
    //spa => 依然返回主页
    router.get('/detail/:id', async (ctx, next) => {
        await ctx.render('index', {
            pageTitle: 'Instagram'
        })
    });
    
    router.get('/', async (ctx, next) => {
        let params={pageTitle:'Instagram'};
        if(ctx.session.user){params.userId = ctx.session.user.id}
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
                    code: 200,
                    message:'NoMatch'
                }
            }
        }else{
            ctx.body = {
                code: 401,
                message:'UNEXIT'
            }
        }
    });
    
    
    
    //登出
    router.get('/api/signout', async (ctx, next) => {
        delete ctx.session.user;
        // return ctx.redirect('/'); =>为什么不行？只负责重定向,不负责刷新页面？
    })

    //发布动态 
    router.post('/api/post', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let _PostParams = JSON.parse(JSON.stringify(ctx.request.body));
        let _Post = new Post(_PostParams);
        let resErr;
        await _Post.save((err,_Post)=>{
            if(err){resErr=err;}
        })
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
    
    //获取所有动态
    router.get('/api/getPosts', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let { number,fromIndex } = ctx.query;
        let resPosts,resErr;
        await Post.find({},(err,posts)=>{
            if(err){resErr=err;return;}
            if(posts){resPosts = posts}
        }).skip(+fromIndex).limit(+number)

        if(resErr){
            ctx.body = {
                code:503,
                message:'数据库错误,获取数据失败' 
            }
        }else{
            ctx.body = {
                code:200,
                posts:resPosts || []
            } 
        }
    });
    
    //获取一条动态
    router.get('/api/getPost', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码ctx.query
        let id= ctx.query.postId;
        let resPosts,resErr,user;
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

    //获取登录用户详情;
    router.get('/api/getUser',async (ctx,next ) => {
        let id = ctx.query._id,_user,resErr;
        await User.findOne({_id: id},(err,user) => {
            if(err){
                resErr=err;
            }else{
                _user=user
            }
        })
        if(!resErr){
            ctx.body = {
                user:_user,
                code:200
            }
        }else{
            ctx.body = {
                user:'数据库异常',
                code:503
            }
        }
    })


    //点赞
    router.post('/api/like', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码 =>取消赞把push改成pull即可
        let { userId,id } = ctx.request.body,resErr;
        await User.update({_id:userId},{$addToSet:{like:id}}).catch(err => {
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
}

module.exports = AppRouter;