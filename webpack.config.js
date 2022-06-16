const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const env = process.env.NODE_ENV || 'development';
// set to 'production' or 'development' in your env

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' };
const autoprefixer = require('autoprefixer');

const postcssPresets = require('postcss-preset-env');

const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

require('dotenv-safe').config({ silent: true });
const DotenvPlugin = require('dotenv-webpack');

module.exports = {
  mode: env,
  output: { publicPath: '/' },
  entry: ['./src'], // this is where our app lives
  devtool: env === 'development' ? 'eval-source-map' : undefined, // this enables debugging with source in chrome devtools
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: [env === 'development' && 'react-refresh/babel'].filter(Boolean),
            },
          },
        ],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            ident: 'postcss',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                  postcssPresets({ browsers: 'last 2 versions' }),
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|ttf|woff|woff2|mp3)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new ESLintPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
      // favicon: './src/favicon.png',
    }),
    new DotenvPlugin({
      path: '.env',
      safe: true,
      systemvars: true,
    }),
    env === 'development' && new ReactRefreshWebpackPlugin(),
  ].filter(Boolean),
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
};
