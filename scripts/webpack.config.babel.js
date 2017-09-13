/**
 * Created by liulingli on 2017/9/9.
 * desc webpack配置文件
 */
const path = require("path");
const webpack = require('webpack');

const config = {
  devtool: 'source-map',
  entry: [
    'react-hot-loader/patch',
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
        include:[
          path.join(__dirname, '../src'),
          path.join(__dirname, '../node_modules/antd/dist/antd.less')
        ],
        loader : 'style-loader!css-loader!less-loader'
      },{
        test : /\.css$/,
        include: path.join(__dirname, '../node_modules/antd'),
        loader : 'style-loader!css-loader'
      },{
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