const { SourceMapDevToolPlugin } = require("webpack")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports =  (env = {production: undefined}) => {
  return {
    entry: './src/app.js',
    output: {
      path: path.join(__dirname, 'public', 'dist'),
      filename: 'bundle.js'
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
        // Options similar to the same options in webpackOptions.output
        // all options are optional
        filename: 'styles.css',
        chunkFilename: '[id].css',
        ignoreOrder: false, // Enable to remove warnings about conflicting order
      }),
      new SourceMapDevToolPlugin({
        filename: "[file].map"
      })
    ],
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      historyApiFallback: true,
      publicPath: '/dist/'
    },
    optimization: {
      splitChunks: {
        // include all types of chunks
        chunks: 'all'
      }
    }
  }
}

