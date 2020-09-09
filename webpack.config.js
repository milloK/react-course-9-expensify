const { SourceMapDevToolPlugin } = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')
const webpack = require("webpack")

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

if (process.env.NODE_ENV === 'test') {
  require('dotenv').config({ path: '.env.test' })
} else if (process.env.NODE_ENV === 'development') {
  require('dotenv').config({ path: '.env.development' })
}

module.exports =  (env = {production: undefined}) => {
  return {
    entry: './src/app.js',
    output: {
      filename: 'bundle.js',
      chunkFilename: 'bundle.js',
      path: path.resolve(__dirname, 'public', 'dist'),
    },
      module: {
      rules: [
        {
          loader: 'babel-loader',
          test: /\.js$/,
          exclude: /node_modules/,
          enforce: 'pre'
        }, {
          test: /\.s?css$/i,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it uses publicPath in webpackOptions.output
                publicPath: './',
                hmr: process.env.NODE_ENV === 'development'
              },
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true,
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true,
              }
            }
          ]
        }
      ]
    },
    mode: env.production ? 'production' : 'development',
    devtool: env.production ? 'source-map' : 'inline-source-map',
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'styles.css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new SourceMapDevToolPlugin({
        filename: "[file].map"
      }),
      new webpack.DefinePlugin({
        'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
        'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
        'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
        'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
        'process.env.FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.FIREBASE_STORAGE_BUCKET),
        'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
        'process.env.FIREBASE_APP_ID': JSON.stringify(process.env.FIREBASE_APP_ID)
      })
    ],
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      publicPath: '/dist/'
    }
  }
}

