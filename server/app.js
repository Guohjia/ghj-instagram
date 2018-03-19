const Koa = require('koa');
const pug = require('pug');
const views = require('koa-views')

const port = process.env.ENV_PORT || 3000;
// const argv = require('yargs').argv; //???
// port = argv.ENV_PORT || 3000;

const webpack = require('webpack');
const KoaWebpackMiddleware = require('koa-webpack-middleware');
const webpackConfig = require('../webpack/base.config.js');
const compile = webpack(webpackConfig);
const path = require('path');


/* 实例化应用 */
const app = new Koa();
app.proxy = true;


app.use(views(path.resolve(__dirname,'./view'),{
    extension: 'pug'
}))

app.use(async (ctx,next) => {
    await ctx.render('index',{
        pageTitle:'Instagram App',
        name:'ghj'
    })
})

app.use(KoaWebpackMiddleware.devMiddleware(compile,{
    noInfo: false,
    inline: true,
    quiet: false,
    watchOptions: {
      aggregateTimeout: 300,
      poll: false,
      ignored: /node_modules/
    },
    publicPath: '/public',
    historyApiFallback: false,
    headers: { 'X-Custom-Header': 'yes' },

    stats: {
      colors: true
    }
}));

app.use(KoaWebpackMiddleware.hotMiddleware(compile, {
    // log: console.log,
    // path: '/__webpack_hmr',
    // heartbeat: 10 * 1000
}));



app.listen(port,()=>{console.log('Server listening on', port)});