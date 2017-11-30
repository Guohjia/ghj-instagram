const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin"); //分离css文件 //这个插件再看看用法
// const HtmlWebpackPlugin = require('html-webpack-plugin'); //js/css文件填充 //这个插件再看看用法
const autoprefixer = require('autoprefixer'); //自动添加前缀,再看看用法

module.exports = {
    context: path.resolve(process.cwd(), "client"),    
    entry: ["babel-polyfill", "./modules/xxx.js"],
    output: {
        publicPath: '/dist',
        path: path.resolve(process.cwd(), "dist"),
        filename: "transformRuntime.js",
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                exclude:/node_modules/, //确定需要exclude?
                use:[{
                  loader:'babel-loader'
                }]
                // },{
                //   loader:'eslint-loader',  //规范检查,再看看用法
                //   options:{
                //     fix:true
                //   }
                // }]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [require('autoprefixer')({ browsers: ['ie >= 9', 'last 2 versions', '> 10%'] })]
                        }
                    }, 'sass-loader']
                }),
            },
            {
                test: /\.(png|jpg|jpeg|gif|woff|woff2|tff|eot|svg|swf)$/,
                loader: 'file-loader',
                options: {
                    name: 'assers/[name]_[sha512:hash:base64:7].[ext]'  //base64处理,不用url-loader?这里配置多大图片内转base64?
                }
            }

        ]
    }
}