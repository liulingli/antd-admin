const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const config  = {
  devtool: 'source-map',
  entry: {
    app :  './src/index',
   // vendors : 'react'
  },
  output : {
    path: path.join(__dirname, "../dist"),
    filename: 'bundle.js',
    library:'dist'
  },
  plugins: [
    //把入口文件vendors数组指定的第三方包打包成verdors.js
   // new webpack.optimize.CommonsChunkPlugin('vendors','vendors.js'),
    //css单独打包
    new ExtractTextPlugin("styles.css"),
    //压缩代码
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],
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
        loader : ExtractTextPlugin.extract({fallback: "style-loader", use: "css-loader"})
      },{
        test: /\.png$/,
        loader: 'file-loader'
      }, {
        test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file-loader'
      }
    ]
  }
};

module.exports = config;