const Koa = require('koa');
// const pug = require('pug');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const appstatic = require('koa-static');
const Router = require('koa-router');
const router = new Router();
const bodyParser = require('koa-bodyparser');

/* 静态文件服务 */
app.use(appstatic(path.resolve(__dirname,'../dist')));

/* 模板渲染*/
app.use(views(path.resolve(__dirname,'./view'),{
    extension: 'pug'
}))

/* body解析 */
app.use(bodyParser());

router.get('/login', async (ctx, next) => {
    await ctx.render('login',{
        pageTitle:'Instagram'
    })
    // console.log('I got Test Request')
    // // console.log(ctx.res)
    // ctx.body={a:1};
});

router.get('/detail/:id', async (ctx, next) => {
    // if(!login){return redirect('/login')}
    await ctx.render('index',{
        pageTitle:'Instagram'
    })
  });

router.get('/', async (ctx, next) => {
    // if(!login){return redirect('/login')}
    await ctx.render('index',{
        pageTitle:'Instagram'
    })
});


router.post('/api/actionLike', async (ctx, next) => {
    //获取Id操作数据0库,操作成功返回状态码
    console.log(ctx.request.body)
    ctx.body={
        code:200
    }
    // if(!login){return redirect('/login')}
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
    if (err) {console.log(err);}
    console.log('Listening at localhost:3000');
});






