const Koa = require('koa');
// const pug = require('pug');
const { connect } = require('./database/init');
const User = require('./database/model/user');
const views = require('koa-views');
const path = require('path');
const appstatic = require('koa-static');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const session = require('koa-session');
const app = new Koa();
const router = new Router();

/* session */
app.keys = ['ins secret hurr']; 

const CONFIG = {
    key: 'koa:ins-sess', 
    maxAge: 86400000,
    overwrite: true, 
    signed: true, 
    rolling: false, 
    renew: false, 
  };
  
app.use(session(CONFIG, app));

/* 静态文件服务 */
app.use(appstatic(path.resolve(__dirname, '../dist')));

app.use(favicon(
    path.resolve(__dirname, '../dist/images/favicon.png')
))

 /* 模板渲染*/
 app.use(views(path.resolve(__dirname, './view'), {
     extension: 'pug'
 }))

 /* body解析 */
 app.use(bodyParser());
 
(async () => {
    await connect(); //数据库

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

    router.get('/detail/:id', async (ctx, next) => {
        // if(!login){return redirect('/login')}
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

    router.get('/api/actionGetLike', async (ctx, next) => {
        //获取Id操作数据库,操作成功返回状态码
        let ctx_query = ctx.query
        ctx.body = ctx_query
        // if(!login){return redirect('/login')}
    });

    app
        .use(router.routes())
        .use(router.allowedMethods());

    app.listen(3000, err => {
        if (err) { console.log(err); }
        console.log('Listening at localhost:3000');
    })
})();
