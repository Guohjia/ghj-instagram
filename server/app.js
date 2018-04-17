const Koa = require('koa');
// const pug = require('pug');
const { connect } = require('./database/init');
const views = require('koa-views');
const path = require('path');
const appstatic = require('koa-static');
const bodyParser = require('koa-bodyparser');
const favicon = require('koa-favicon');
const session = require('koa-session');
const app = new Koa();
const router = require('./router');

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
    await connect(); //数据库连接成功之后开启服务器
    router(app)
    app.listen(3000, err => {
        if (err) { console.log(err); }
        console.log('Listening at localhost:3000');
    })
})();
