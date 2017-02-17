const webpack = require('webpack')
const path = require("path");
const themePath = path.resolve(__dirname, "theme");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function (env) {

  const nodeEnv = env && env.prod ? 'production' : 'development';
  const isProd = nodeEnv === 'production';

  const plugins = [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.bundle.js'
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html")
    })
  ]

  if (isProd) {
    plugins.push(
      new webpack.LoaderOptionsPlugin({
        minimize: true,
        debug: false
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
          screw_ie8: true,
          conditionals: true,
          unused: true,
          comparisons: true,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          comments: false,
        },
      })
    );
  } else {
    plugins.push(
      new webpack.HotModuleReplacementPlugin()
    );
  }

  return {
    context: path.resolve(__dirname, "src"),
    entry: path.resolve(__dirname, "src/entry"),
    output: {
      path: path.resolve(__dirname, "../docs"),
      filename: 'bundle.js',
      publicPath: ""
    },
    resolve: {
      extensions: ['.js', '.vue'],
      alias: {
        assets: path.resolve(__dirname, '../../docs/src/assets'),
        vue: 'vue/dist/vue.js'
      }
    },
    resolveLoader: {
      alias: {
        "theme": path.join(__dirname, "../src/index.js")
      }
    },
    module: {
      loaders: [
        { test: /\.js$/,
          use: ['babel-loader', 'eslint-loader'],
          exclude: /node_modules/
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader'
          ]
        },
        {
          test: /\.vue$/,
          use: [{
            loader: 'vue-loader',
            options: {
              loaders: {
                sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax' // <style lang="sass">
              }
            }
          }, {
            loader: 'eslint-loader',
            options: {
              formatter: require('eslint-friendly-formatter')
            }
          }]
        }
      ]
    },
    devtool: 'source-map',
    plugins: plugins,
    devServer: {
      compress: true,
      port: 8080
    }
  };
}