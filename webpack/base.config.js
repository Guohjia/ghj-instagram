const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css文件 //这个插件再看看用法
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //js/css文件填充 //这个插件再看看用法
const autoprefixer = require('autoprefixer'); //自动添加前缀,再看看用法
const webpack = require('webpack');

module.exports = {
    context: path.resolve(process.cwd(), "client"),    
    entry:{
        main:"./modules",
        vendor: ['react', 'react-dom']
    },
    output: {
        publicPath: '/dist/',
        path: path.resolve(process.cwd(), "dist"),
        filename: "index.js",
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
                    fix:true
                  }
                }]
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({ browsers: ['ie >= 9', 'last 2 versions', '> 10%'] })]
                        }
                    }, {
                        loader:'less-loader',
                        options:{
                            includePaths: [
                                path.resolve("../styles")
                            ]
                        }
                    }]
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg|swf)$/,
                loader: 'url-loader',
                options: {
                  limit: 8192, //小于8kb base64处理否则返回路径图片走请求
                  name: '[name]_[sha512:hash:base64:7].[ext]'
                }
            }

        ]
    },
    plugins: [
      new ExtractTextPlugin({
          filename:'index.css'
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name:'vendor',
        filename: '[name].js'
      })
    ]
}