const path = require('path');
// const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css文件 //这个插件再看看用法
const HtmlWebpackPlugin = require('html-webpack-plugin'); //js/css文件填充 //这个插件再看看用法
const autoprefixer = require('autoprefixer'); //自动添加前缀,再看看用法
const webpack = require('webpack');

console.log('webpack  compiling...')
module.exports = {
    context: path.resolve(process.cwd(), "client"),
    devtool: 'cheap-module-source-map',    
    entry:{
        main:"./js",
        login:"./js/instagram/signInsignUp",
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: '/',  //公共路径, 用来配置所有资源前面增加的路径,Maybe can be a cdn path
        path: path.resolve(process.cwd(), "dist"),
        filename: 'js/[name].js'
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
                use: ['style-loader','css-loader', {
                    loader: 'postcss-loader',
                    options: {
                        plugins: () => [require('autoprefixer')({ browsers: ['ie >= 9', 'last 2 versions', '> 10%'] })]
                    }
                }, {
                    loader:'less-loader'
                }]
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
    //   new ExtractTextPlugin({
    //       filename:'css/[name].css',
    //       allChunks:true
    //   }),
      new webpack.optimize.CommonsChunkPlugin({
        names:'vendor',
        filename: 'js/[name].js'
      })
    ]
}