

const Koa = require('koa');
// const pug = require('pug');
const views = require('koa-views');
const path = require('path');
const webpackConfig = require('../webpack/base.config.js');
const webpack = require('webpack');
const { devMiddleware, hotMiddleware } = require('koa-webpack-middleware');
// const webpackMiddleware = require('webpack-dev-middleware');
// const WebpackDevServer = require('webpack-dev-server');  
const compiler = webpack(webpackConfig);
const app = new Koa();


app.use(devMiddleware(compiler, {
    // display no info to console (only warnings and errors)
    noInfo: false,

    // display nothing to the console
    quiet: false,

    // switch into lazy mode
    // that means no watching, but recompilation on every request
    // lazy: true,

    // watch options (only lazy: false)
    watchOptions: {
        aggregateTimeout: 300,
        poll: true
    },

    // public path to bind the middleware to
    // use the same as in webpack
    publicPath: webpackConfig.output.publicPath,

    // custom headers
    headers: { "X-Custom-Header": "yes" },

    // options for formating the statistics
    stats: {
        colors: true
    }
}))
app.use(hotMiddleware(compiler, {
  // log: console.log,
  // path: '/__webpack_hmr',
  // heartbeat: 10 * 1000
}))


app.use(views(path.resolve(__dirname,'../client/src'),{
    extension: 'html'
}))


app.use(async (ctx,next) => {
    await ctx.render('index',{
        pageTitle:'Instagram'
    })
})



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




