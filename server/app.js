const Koa = require('koa');
// const pug = require('pug');
const views = require('koa-views');
const path = require('path');
const app = new Koa();
const appstatic = require('koa-static');
/* 静态文件服务 */

app.use(appstatic(path.resolve(__dirname,'../dist')));

/* 模板渲染*/
app.use(views(path.resolve(__dirname,'./view'),{
    extension: 'pug'
}))



const Router = require('koa-router');
const router = new Router();

router.get('/', async (ctx, next) => {
    await ctx.render('index',{
        pageTitle:'Instagram'
    })
  });

// router.get('/test', (ctx, next) => {
//    console.log('test')
//   ctx.response.data = {test:'i am pack'}
// });


app
  .use(router.routes())
  .use(router.allowedMethods());


app.listen(3000, err => {
    if (err) {console.log(err);}
    console.log('Listening at localhost:3000');
});




















//加载webpack模块

//调用webpack热加载模块及对应参数
// new WebpackDevServer(webpack(webpackConfig), {
//     contentBase: path.join(process.cwd(), "../client"),
//     // publicPath:webpackConfig.output.publicPath, //文件的输出路径,由于是都是在内存中执行的, 所以是看不到具体的文件的
//     hot: true, //是否开启热加载功能
//     compress: true, //开启Gzip压缩
//     historyApiFallback: true, //是否记录浏览器历史,配合react-router使用
//     stats: {
//         colors: true //用颜色标识
//     }
// });


/* 实例化应用 */

// const views = require('koa-views')
// const port = process.env.ENV_PORT || 3000;
// const argv = require('yargs').argv; //???
// port = argv.ENV_PORT || 3000;
// const KoaWebpackMiddleware = require('koa-webpack-middleware');


// app.use(views(path.resolve(__dirname,'./view'),{
//     extension: 'pug'
// }))


// app.use(async (ctx,next) => {
//     await ctx.render('index',{
//         pageTitle:'Instagram'
//     })
// })
// app.proxy = true;








// app.use((ctx,next) => {
//     let compiler = webpack(webpackConfig);
//     console.log(1)
//         //调用webpack热加载模块及对应参数
//     new WebpackDevServer(webpack(webpackConfig), {
//         publicPath: webpackConfig.output.publicPath, //文件的输出路径,由于是都是在内存中执行的, 所以是看不到具体的文件的
//         hot: true, //是否开启热加载功能
//         // compress: true,
//         historyApiFallback: true,//是否记录浏览器历史,配合react-router使用
//         stats: {
//             colors: true // 用颜色标识
//         }
//     });

//     //调用开启5000端口用来测试和开发
// })

// app.get('/',(ctx,next)=>{  //难道要根据router响应？返回index.html???
//     ctx.body = '哈哈哈';
//     console.log(next)
// })

// app.use((ctx,next)=>{
//     // var index = require('../index.html'); 
//     console.log(ctx)
//     ctx.body =  '哈哈哈'
//     // console.log(index);

// });  //我的便签







// app.use(views(path.resolve(__dirname,'./view'),{
//     extension: 'pug'
// }))

// app.use(async (ctx,next) => {
//     await ctx.render('index',{
//         pageTitle:'Instagram App',
//         name:'ghj'
//     })
// })

// app.use(KoaWebpackMiddleware.devMiddleware(compile,{
//     noInfo: false,
//     inline: true,
//     quiet: false,
//     watchOptions: {
//       aggregateTimeout: 300,
//       poll: false,
//       ignored: /node_modules/
//     },
//     publicPath: '/',
//     historyApiFallback: false,
//     headers: { 'X-Custom-Header': 'yes' },

//     stats: {
//       colors: true
//     }
// }));

// app.use(KoaWebpackMiddleware.hotMiddleware(compile, {
//     // log: console.log,
//     // path: '/__webpack_hmr',
//     // heartbeat: 10 * 1000
// }));



// app.listen(port,()=>{console.log('Server listening on', port)});




