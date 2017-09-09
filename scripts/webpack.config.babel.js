/**
 * Created by liulingli on 2017/9/9.
 * desc webpack配置文件
 */
const path = require("path");
const webpack = require('webpack');

const config = {
  devtool: 'source-map',
  entry: [
    './src/index.js'
  ],
  output : {
    path: path.resolve(__dirname, "./dist"),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module : {
    rules : [
      {
        test: /\.js?$/,
        include: path.join(__dirname, '../src'),
        loader: 'babel-loader'
      },{
        test : /\.less$/,
        include: path.join(__dirname, '../src'),
        loader : 'less-loader'
      }, {
        test: /\.png$/,
        loader: 'file-loader'
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
};

module.exports = config;