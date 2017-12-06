const path = require('path');
const baseWebpackConfig = require('./base.config.js');
const devWebpackPartialConfig = {
    watch: true,
    devServer: {
        contentBase: path.join(process.cwd(), "client"),
        compress: true,
        port: 3000
    },
};
module.exports = Object.assign({},
    baseWebpackConfig,
    devWebpackPartialConfig);
