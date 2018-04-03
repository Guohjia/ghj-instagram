const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css文件 //这个插件再看看用法
const HtmlWebpackPlugin = require('html-webpack-plugin'); //js/css文件填充 //这个插件再看看用法
const autoprefixer = require('autoprefixer'); //自动添加前缀,再看看用法
const webpack = require('webpack');

console.log('webpack  compiling...')
module.exports = {
    context: path.resolve(process.cwd(), "client"),    
    entry:{
        main:"./src",
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: '/',  //公共路径, 用来配置所有资源前面增加的路径,Maybe can be a cdn path
        path: path.resolve(process.cwd(), "dist"),
        filename: "js/index.js",
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/, //确定需要exclude?
                use:[{
                  loader:'babel-loader'
                },{
                  loader:'eslint-loader',  //规范检查,再看看用法
                  options:{
                    fix:true,
                  }
                }]
            },
            {
                test: /\.(css|less)$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({ browsers: ['ie >= 9', 'last 2 versions', '> 10%'] })]
                        }
                    }, {
                        loader:'less-loader'
                        // options:{
                        //     includePaths: [
                        //         path.resolve("dist/styles")
                        //     ]
                        // }
                    }]
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg|swf)$/,
                loader: 'url-loader',
                options: {
                  limit: 8192, //小于8kb base64处理否则返回路径图片走请求
                  name: '[name]_[sha512:hash:base64:7].[ext]',
                  outputPath:'images/'
                }
            }

        ]
    },
    plugins: [
      new ExtractTextPlugin({
          filename:'css/index.css'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        filename: 'js/[name].js'
      })
    //   new webpack.HotModuleReplacementPlugin(),
    //   new webpack.NoEmitOnErrorsPlugin() ,
    //   new webpack.optimize.UglifyJsPlugin(), //生产环境
    //   new HtmlWebpackPlugin({
    //     template: '../server/view/index.html',
    //     //页面模板的地址, 支持一些特殊的模板, 比如jade, ejs, handlebar等
    //     inject: true,
    //     //文件插入的位置, 可以选择在 body 还是 head 中
    //     hash: true,
    //     //是否给页面的资源文件后面增加hash,防止读取缓存
    //     minify: {
    //         removeComments: true,
    //         collapseWhitespace: false
    //     },
    //     //精简优化功能 去掉换行之类的
    //     // chunks: ['vendor'],
    //     //文件中插入的 entry 名称，注意必须在 entry 中有对应的申明，或者是使用 CommonsChunkPlugin 提取出来的 chunk. 简单理解即页面需要读取的js文件模块
    //     filename: 'index.html'
    //     //最终生成的 html 文件名称，其中可以带上路径名
    // })
    ]
}