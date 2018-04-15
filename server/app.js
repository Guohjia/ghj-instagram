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


(async () => {
    await connect(); //数据库

    const app = new Koa();
    const router = new Router();

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

    router.get('/login', async (ctx, next) => {
        await ctx.render('login', {
            pageTitle: 'Instagram'
        })
        // console.log('I got Test Request')
        // // console.log(ctx.res)
        // ctx.body={a:1};
    });


    // router.get('/profile', async (ctx, next) => {
    //     // if(!login){return redirect('/login')}
    //     await ctx.render('index', {
    //         pageTitle: 'Instagram'
    //     })
    // });

    router.get('/profile', async (ctx, next) => {
        // if(!login){return redirect('/login')}
        await ctx.render('index', {
            pageTitle: 'Instagram'
        })
    });

    router.get('/detail/:id', async (ctx, next) => {
        // if(!login){return redirect('/login')}
        await ctx.render('index', {
            pageTitle: 'Instagram'
        })
    });

    router.get('/', async (ctx, next) => {
        // if(!login){return redirect('/login')}
        await ctx.render('index', {
            pageTitle: 'Instagram'
        })
    });

    //注册
    router.post('/api/signup', async (ctx, next) => {
        // console.log(ctx.request.body);
        let { userName,password,remember } = ctx.request.body;
        let _user = {
            userName:userName,
            password:password
        };
        User.find({userName: userName},(err,user)=>{
            if(err) console.log(err);
            if(user.length>0) {
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
        // console.log('重定向')
        // ctx.redirect('/');
        // ctx.status = 301;
        //重定向没实现啊，表单输入记录是怎么实现的,如何清除,如何配合密码记住,如何记住最近一次输入
    });

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
