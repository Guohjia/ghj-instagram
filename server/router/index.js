const Router = require('koa-router');
const router = new Router();
const User = require('../database/model/user');

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
        console.log(ctx.session)
        await ctx.render('index', {
            pageTitle: 'Instagram'
        })
    });
    
    //注册
    router.post('/api/signup', async (ctx, next) => {
        let { userName,password,remember } = ctx.request.body;
        let _user = {
            userName:userName,
            password:password
        };
        User.findOne({userName: userName},(err,user)=>{
            if(err) console.log(err);
            if(user) {
                console.log(user);
                console.log('已经注册了直接登陆即可')
                return;
            }else{
                let user = new User(_user);
                user.save((err,user)=>{
                    if(err) console.log(err);
                    // console.log(user)
                })
            }
        })
    
        ctx.body = {
            code: 200
        }
    });
    
    
    //登录
    router.post('/api/signin', async (ctx, next) => {
        let { userName,password,remember } = ctx.request.body;
        let ifMatch,_id;
        let matchUser = await User.findOne({userName: userName}).catch(err => {console.log(err);});
        if(matchUser) {
            await matchUser.comparePassword(password,(err,isMatch)=>{
                if(err){console.log(err)};
                if(isMatch){
                    ifMatch=true;
                    _id=matchUser._id;
                    console.log('登录成功')
                }else{
                    ifMatch=false;
                    console.log('密码输入有误');
                }
            })
            if(ifMatch){
                ctx.session.user = {
                    id:_id,
                    userName:userName
                }
                console.log('Match')
                ctx.body = {
                    code: 200,
                    message:'Match'
                }
            }else{
                console.log('NoMatch')
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
    
    //点赞
    router.get('/api/actionGetLike', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let ctx_query = ctx.query
        ctx.body = ctx_query
        // if(!login){return redirect('/login')}
    });

    //收藏
    //评论
}

module.exports = AppRouter;